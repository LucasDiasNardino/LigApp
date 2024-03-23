// Obtém referências para os elementos HTML
var loginInput = document.getElementById("login");
var passwordInput = document.getElementById("password");
var loginButton = document.getElementById("loginBut");

// Adiciona event listeners aos campos de entrada
loginInput.addEventListener("input", atualizarEstadoBotao);
passwordInput.addEventListener("input", atualizarEstadoBotao);

// Função para atualizar o estado do botão com base nos campos de entrada
function atualizarEstadoBotao() {
    // Verifica se ambos os campos estão preenchidos
    var loginPreenchido = loginInput.value.trim() !== "";
    var passwordPreenchido = passwordInput.value.trim() !== "";

    // Habilita o botão se ambos os campos estiverem preenchidos, caso contrário, desabilita
    loginButton.disabled = !(loginPreenchido && passwordPreenchido);
}

document.getElementById("loginBut").addEventListener("click", function () {
    var login = document.getElementById("login").value;
    var password = document.getElementById("password").value;

    var dados = {
        login: login,
        senha: password
    };

    console.log("Dados submetidos:", dados);

    fetch('http://localhost:8080/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },

        body: JSON.stringify(dados)

    }).then(function (response) {
        if (response.ok) {
            console.log("Resposta ok");
            return response.text();
        } else {
            console.log("Resposta de erro do servidor");
            return Promise.reject(response);
        }
    }).then(function (data) {
        console.log("Resposta:", data);
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", data.user);
        
        window.location.href = "admin.html";



    }).catch(function (error) {
        console.log("Erro ao receber JSON:", error);
        alert("Erro no login!");
    })
});