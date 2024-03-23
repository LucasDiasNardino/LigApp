document.addEventListener('DOMContentLoaded', function() {
    // Obter o nome de usuário da URL
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');

    welcome = document.getElementById("welcome");

    welcome.textContent = "Bem vindo, " + username + "!";
});


var sairBut = document.getElementById("sair");

document.getElementById("sair").addEventListener("click", function () {
    window.location.href = "login.html";
});

var valorInput = document.getElementById("valor");
var descricaoInput = document.getElementById("descricao");
var enviarBut = document.getElementById("enviar");

valorInput.addEventListener("input", atualizarEstadoBotao);
descricaoInput.addEventListener("input", atualizarEstadoBotao);

function atualizarEstadoBotao() {
    var valorPreenchido = valorInput.value.trim() !== "";
    var descricaoPreenchido = descricaoInput.value.trim() !== "";

    enviarBut.disabled = !(valorPreenchido && descricaoPreenchido);
}

/**
 * Função para enviar os dados do formulário para o servidor
 */

document.getElementById("enviar").addEventListener("click", function () {
    var valor = document.getElementById("valor").value;
    var descricao = document.getElementById("descricao").value;

    var urlParams = new URLSearchParams(window.location.search);
    var user = urlParams.get('username');

    var dados = {
        user: user,
        valor: valor,
        descricao: descricao
    };

    console.log("Dados submetidos:", dados);

    fetch('http://localhost:8080/reembolso/cadastrar', {
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
        window.location.href = "user.html?username="+encodeURIComponent(user);
    }).catch(function (error) {
        console.log("Erro ao receber JSON:", error);
    });
});




/*
*  Busca os reembolsos no banco e adiciona na lista
*/

function formatarData(dataString) {
    // Verificar se a data já está no formato esperado (DD/MM/YYYY)
    const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

    if (regexData.test(dataString)) {
        return dataString;
    }

    // Se a dataString for uma instância de Date, formatar diretamente
    const data = new Date(dataString);
    if (!isNaN(data.getTime())) {
        const dia = String(data.getDate()).padStart(2, '0');
        const mes = String(data.getMonth() + 1).padStart(2, '0');
        const ano = String(data.getFullYear());

        return `${dia}/${mes}/${ano}`;
    }

    // Se não for possível formatar, retornar 'Data Inválida'
    return 'Data Inválida';
}


function atualizarLista() {
    fetch('http://localhost:8080/reembolso/listar', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
            // Adicione outros cabeçalhos conforme necessário
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Erro ao obter reembolsos');
        }
        return response.json();
    })
    .then(data => {
        data.sort((a, b) => new Date(b.data) - new Date(a.data));
        // Limpar a lista existente
        var tbodyReembolsos = document.getElementById('tbodyReembolsos');
        tbodyReembolsos.innerHTML = '';

        var urlParams = new URLSearchParams(window.location.search);
        var user = urlParams.get('username');

        console.log(user);

        

        data.forEach((reembolso, index) => {
            console.log(reembolso.user);
            if(reembolso.user == user){
                var linha = document.createElement('tr');

                var classeEstado = '';

                if (reembolso.estado === 'Aprovado') {
                    classeEstado = 'table-success';
                }
                else if (reembolso.estado === 'Reprovado') {
                    classeEstado = 'text-danger';
                }

                console.log(reembolso.usuario);


                linha.innerHTML = `
                    <td>R$${reembolso.valor}</td>
                    <td>${reembolso.descricao}</td>
                    <td>${formatarData(reembolso.data)}</td>
                    <td class="${classeEstado}">${reembolso.estado}</td>
                `;
                tbodyReembolsos.appendChild(linha);
            }
            
        });
    })
    .catch(error => {
        console.error(error);
    });
}

document.addEventListener('DOMContentLoaded', function() {
    // Chamar a função inicialmente 
    atualizarLista();
    //setInterval(atualizarLista, 5000);


    // Adicionar um evento de clique ao botão
    var btnAtualizar = document.getElementById('atualizarBtn');
    btnAtualizar.addEventListener('click', function() {
        // Chamar a função ao clicar no botão
        atualizarLista();
    });
});