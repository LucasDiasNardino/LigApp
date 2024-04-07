// Função para obter o valor de uma variável na URL por nome
function obterParametroURL(nome) {
    // Cria uma expressão regular para encontrar o parâmetro na URL
    var regex = new RegExp("[?&]" + nome + "(=([^&#]*)|&|#|$)");
    // Tenta fazer match na URL
    var resultados = regex.exec(window.location.href);
    // Se o parâmetro foi encontrado na URL, retorna o seu valor
    if (resultados && resultados[2]) {
      return decodeURIComponent(resultados[2].replace(/\+/g, " "));
    }
    // Caso contrário, retorna null
    return null;
  }
  
  // Obtém o ID do evento da URL e armazena na variável idEvento
  var idEvento = obterParametroURL("id");
  console.log("ID do evento:", idEvento);

  var formBlock = document.getElementById("formBlock");
  
  // Obtém referências para os elementos HTML
  var loginInput = document.getElementById("loginInput");
  var matriculaInput = document.getElementById("matriculaInput");
  var submitBut = document.getElementById("submitBut");
  
  // Adiciona event listeners aos campos de entrada
  loginInput.addEventListener("input", atualizarEstadoBotao);
  matriculaInput.addEventListener("input", atualizarEstadoBotao);

  
  // Função para atualizar o estado do botão com base nos campos de entrada
  function atualizarEstadoBotao() {
      // Verifica se ambos os campos estão preenchidos
      var loginPreenchido = loginInput.value.trim() !== "";
      var matriculaPreenchido = matriculaInput.value.trim() !== "";
  
      // Habilita o botão se ambos os campos estiverem preenchidos, caso contrário, desabilita
      submitBut.disabled = !(loginPreenchido && matriculaPreenchido);
  }
  
  document.getElementById("submitBut").addEventListener("click", function () {
      var login = document.getElementById("loginInput").value;
      var matriculaInput = document.getElementById("matriculaInput").value;
  
      var dados = {
          login: login,
          matricula: matriculaInput
      };
  
      console.log("Dados submetidos:", dados);
  
      fetch('http://localhost:8080/ligante/confirmarPresenca/' + idEvento, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
  
          body: JSON.stringify(dados)
  
      }).then(function (response) {
          if (response.ok) {
              console.log("Resposta ok");
              //alterar html div formBlock

                formBlock.innerHTML = "<h1>Presença confirmada!</h1>";


              return response.text();
          } else {
              console.log("Resposta de erro do servidor");
              return Promise.reject(response);
          }
      }).then(function (data) {
          console.log("Resposta:", data);
          localStorage.setItem("token", data.token);
          localStorage.setItem("user", data.user);
      }).catch(function (error) {
          console.log("Erro ao receber JSON:", error);
          alert("Erro no login!");
      })
  });
  