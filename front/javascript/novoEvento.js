var voltar = document.getElementById("voltar");

document.getElementById("voltar").addEventListener("click", function () {
  window.location.href = "admin.html";
});

/////////////////

var tituloInput = document.getElementById("tituloEvento");
var descricaoInput = document.getElementById("descricaoEvento");
var submitBut = document.getElementById("submitEvento");

tituloInput.addEventListener("input", atualizarSubmit);
descricaoInput.addEventListener("input", atualizarSubmit);

// Função para atualizar o botão de submit
function atualizarSubmit() {
  // Verifica se ambos os campos estão preenchidos
  var nomePreenchido = tituloInput.value.trim() !== "";
  var matriculaPreenchido = descricaoInput.value.trim() !== "";

  // Habilita o botão se ambos os campos estiverem preenchidos, caso contrário, desabilita
  submitBut.disabled = !(nomePreenchido && matriculaPreenchido);
}

function generateQRCode(titulo) {
  var GoogleChartAPI =
    "https://chart.googleapis.com/chart?cht=qr&chs=400x500&chl=";

  var contentQRCode = GoogleChartAPI + titulo;

  document.querySelector("#qrCode").src = contentQRCode;
}

console.log("Modal de edição criado");

document.getElementById("submitEvento").addEventListener("click", function () {
  var titulo = document.getElementById("tituloEvento").value;
  var descricao = document.getElementById("descricaoEvento").value;

  var dados = {
    titulo: titulo,
    descricao: descricao,
  };

  fetch("http://localhost:8080/evento/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(dados),
  })
    .then(function (response) {
      if (response.ok) {
        console.log("Resposta ok");
        // Parse a resposta JSON
        return response.json();
      } else {
        throw new Error("Erro ao cadastrar evento");
      }
    })
    .then(function (data) {
      // 'data' contém os dados retornados pelo servidor, incluindo o ID do evento
      var eventoId = data.id; // Atribui o ID do evento retornado pelo servidor à variável eventoId

      var edicaoModal = new bootstrap.Modal(document.getElementById("modalQrCode"));
      edicaoModal.show();
      generateQRCode(titulo);
      return eventoId;
    })
    .then(function (eventoId) {
      // Aqui você pode fazer algo com o ID do evento se necessário
      console.log("ID do evento cadastrado:", eventoId);
      // Redireciona para user.html com o ID do evento como path variable
      window.location.href = "user.html?id=" + eventoId;
    })
    .catch(function (error) {
      console.error(error);
    });

});
