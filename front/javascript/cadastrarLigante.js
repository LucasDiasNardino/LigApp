var voltar = document.getElementById("voltar");

document.getElementById("voltar").addEventListener("click", function () {
  window.location.href = "admin.html";
});

/////////////////

var nomeInput = document.getElementById("nome");
var matricula = document.getElementById("matricula");
var submitBut = document.getElementById("submitLig");

nomeInput.addEventListener("input", atualizarSubmit);
matricula.addEventListener("input", atualizarSubmit);

// Função para atualizar o botão de submit
function atualizarSubmit() {
  // Verifica se ambos os campos estão preenchidos
  var nomePreenchido = nomeInput.value.trim() !== "";
  var matriculaPreenchido = matricula.value.trim() !== "";

  // Habilita o botão se ambos os campos estiverem preenchidos, caso contrário, desabilita
  submitBut.disabled = !(nomePreenchido && matriculaPreenchido);
}
document.getElementById("submitLig").addEventListener("click", function () {
  var nome = document.getElementById("nome").value;
  var matricula = document.getElementById("matricula").value;

  var dados = {
    nome: nome,
    matricula: matricula,
  };

  //alert("Dados submetidos:", dados);

  fetch("http://localhost:8080/ligante/cadastrar", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(dados),
  })
    .then(function (response) {
      if (response.ok) {
        //alert("Resposta ok");
        console.log("Resposta ok");
        return response.text();
      }

      //se servidor retornar bad request, exibir mensagem de erro
      else if (response.status === 400) {
        var placeholder = document.getElementById("placeholder");

        placeholder.innerHTML = `
          <div class="alert alert-danger" role="alert">
              Ligante já cadastrado no sistema!
          </div>
        `;

        //exibe div de

        return response.json();
      } else {
        console.log("Resposta de erro do servidor");
        return Promise.reject(response);
      }
    })
    .then(function (data) {
      console.log("Resposta:", data);
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", data.user);

      var placeholder = document.getElementById("placeholder");

      placeholder.innerHTML = `
        <div class="alert alert-success" role="alert">
            Ligante ${dados.nome} cadastrado com sucesso!
        </div>
      `;
    });
});
