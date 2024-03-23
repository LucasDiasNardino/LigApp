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
