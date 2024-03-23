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

//deixa botao desabilitado enquanto campos nao estiverem preenchidos
function atualizarSubmit() {
    var nomePreenchido = nomeInput.value.trim() !== "";
    var matriculaPreenchida = matricula.value.trim() !== "";

    submitBut.disabled = !(nomePreenchido && matriculaPreenchida);
}

document.getElementById("submitLig").addEventListener("click", function () {
    var nome = document.getElementById("nome").value;
    var matricula = document.getElementById("matricula").value;

    var dados = {
        nome: nome,
        matricula: matricula
    };

    console.log("Dados submetidos:", dados);

    fetch('http://localhost:8080/ligantes/cadastrar', {
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
        alert("Ligante cadastrado com sucesso!");
        window.location.href = "admin.html";

    }).catch(function (error) {
        console.log("Erro ao receber JSON:", error);
        alert("Erro ao cadastrar ligante!");
    })
});
