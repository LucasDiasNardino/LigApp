var sairBut = document.getElementById("sair");

document.getElementById("sair").addEventListener("click", function () {
    window.location.href = "login.html";
});



var cadastrarLigBut = document.getElementById("butCadastroLig");

document.getElementById("butCadastroLig").addEventListener("click", function () {
    window.location.href = "cadastroLigante.html";
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

            data.forEach((reembolso, index) => {
                if ((reembolso.user != null) && (reembolso.estado === "Pendente")) {
                    var linha = document.createElement('tr');

                    linha.id = 'linha' + reembolso.id;

                    var classeEstado = '';

                    if (reembolso.estado === 'Aprovado') {
                        classeEstado = 'table-success';
                    }
                    else if (reembolso.estado === 'Reprovado') {
                        classeEstado = 'text-danger';
                    }

                    var id = reembolso.id;


                    linha.innerHTML = `
                    <td>${index + 1}</td>
                    <td>${reembolso.user.toUpperCase()}</td>
                    <td>R$${reembolso.valor}</td>
                    <td>${reembolso.descricao}</td>
                    <td>${formatarData(reembolso.data)}</td>
                    <td class="${classeEstado}">
                        <button id="aprovar${id}" type="button" class="btn btn-success ml-auto">Aprovar</button>
                        <button id="reprovar${id}" type="button" class="btn btn-danger ml-auto">Reprovar</button>
                    </td>
                `;
                    tbodyReembolsos.appendChild(linha);

                    console.log("Reembolso", id, "criado com sucesso:")

                    aprovarBotao(id);
                    reprovarBotao(id);
                }

            });
        })
        .catch(error => {
            console.error(error);
        });
}

document.addEventListener('DOMContentLoaded', function () {
    // Chamar a função inicialmente 
    atualizarLista();
    //setInterval(atualizarLista, 5000);
});


var idReembolso;

function aprovarBotao(id) {
    var reprovar = document.getElementById("aprovar" + id);
    reprovar.addEventListener("click", function () {
        console.log("Aprovar Acionado -ID: " + id);
        idReembolso = id;
        aprovar();

    });
}

function aprovar() {
    var url = 'http://localhost:8080/admin/aprovar/' + idReembolso;

    fetch(url, {
        method: 'PUT',
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao aprovar reembolso');
            }
            // Verifique se a resposta não está vazia antes de fazer o parsing como JSON
            if (response.status !== 204) {
                return response.json();
            }

            // Se a resposta for vazia (status 204), retorne algo apropriado
            return null;
        })
        .then(data => {
            // Faça algo com os dados (pode ser null se a resposta foi vazia)
            console.log(data);
        })
        .catch(error => {
            console.error(error);
        });
}

var motivoRep;
var botaoSubmeter;


function reprovarBotao(id) {
    var reprovar = document.getElementById("reprovar" + id);
    reprovar.addEventListener("click", function () {
        console.log("Reprovar Acionado -ID: " + id);

        //deixa botao desabilitado
        reprovar.disabled = true;



        console.log("Cria entrada");
        var divEntrada = document.getElementById("motivo");

        divEntrada.innerHTML = '';

        entrada = document.createElement('div');

        entrada.innerHTML =
            `
            <div class="input-group">
                <span class="input-group-text">Descreva brevemente o motivo:</span>
                <textarea id="entradaMotivo" class="form-control" aria-label="With textarea"></textarea>
                <button disabled id="botaoSubmeter" class="btn btn-outline-primary" type="button">Submeter</button>
            </div>
            `


        divEntrada.appendChild(entrada);


        var botao = document.getElementById("botaoSubmeter");
        botaoSubmeter = botao;

        var motivo = document.getElementById("entradaMotivo");
        motivoRep = motivo.value;



        document.getElementById("botaoSubmeter").addEventListener("click", () => putFunc(id));


        motivo.addEventListener("input",  () =>{
            var text = motivo.value

            if(text != ""){
                botao.disabled = false;
            }
            else{
                botao.disables = true;
            }

        });



    });
}

function putFunc(id) {
    console.log("Entrou no put")


    console.log("Put -ID: " + id);

    var motivo = document.getElementById("entradaMotivo").value;

    console.log("Motivo: " + motivo);

    var url = 'http://localhost:8080/admin/reprovar/' + id;

    fetch(url, {
        method: 'PUT',
        headers: {
            'Content-Type': 'text/plain'
            // Adicione outros cabeçalhos conforme necessário
        },

        body : motivo

    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao reprovar reembolso');
            }
            return response.json();
        })
        .then(data => {
            console.log("Reembolso", id, "reprovado com sucesso:")
            console.log(data);

            var linha = document.getElementById("linha" + id);

            linha.remove();

            var divEntrada = document.getElementById("motivo");

            divEntrada.innerHTML = '';

        })
        .catch(error => {
            console.error(error);
        });
}



