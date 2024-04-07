var voltar = document.getElementById("voltar");

document.getElementById("voltar").addEventListener("click", function () {
  window.location.href = "admin.html";
});

function formatarData(dataString) {
  // Verificar se a data já está no formato esperado (DD/MM/YYYY)
  const regexData = /^\d{2}\/\d{2}\/\d{4}$/;

  if (regexData.test(dataString)) {
    return dataString;
  }

  // Se a dataString for uma instância de Date, formatar diretamente
  const data = new Date(dataString);
  if (!isNaN(data.getTime())) {
    const dia = String(data.getDate()).padStart(2, "0");
    const mes = String(data.getMonth() + 1).padStart(2, "0");
    const ano = String(data.getFullYear());

    return `${dia}/${mes}/${ano}`;
  }

  // Se não for possível formatar, retornar 'Data Inválida'
  return "Data Inválida";
}

function getParticipantesEvento(idEvento) {
  fetch("http://localhost:8080/evento/listarParticipantes/"+idEvento, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
  //retorna lista de participantes
  .then((response) => response.json())

  .then((data) => {
    console.log(data);
    return data;
  });
}

function listarEventos() {
  fetch("http://localhost:8080/evento/listar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())

    .then((data) => {
      //verificar se a lista de ligantes está vazia
      if (data.length == 0) {
        var tablePlaceholder = document.getElementById("tablePlaceholder");
        tablePlaceholder.innerHTML = `
            <div class="alert alert-danger" role="alert">
                Não há eventos cadastrados!
            </div>
            `;
        return;
      }

      var tablePlaceholder = document.getElementById("tablePlaceholder");
      tablePlaceholder.innerHTML = `
        <table id="tabelaEventos" class="table" style="text-align:center">
                    <thead id="theadEventos">
                      <tr>
                        <th scope="col">Data</th>
                        <th scope="col">Título</th>
                        <th scope="col">Descrição</th>
                        <th scope="col">Participantes</th>
                      </tr>
                    </thead>
                    <tbody id="tbodyEventos">
                    </tbody>
                </table> 
    `;

      console.log("thead criado com sucesso!");

      // criar as linhas da tabela

      var tbodyEventos = document.getElementById("tbodyEventos");

      data.forEach((evento) => {
        console.log(evento);
        var tr = document.createElement("tr");
        tr.id = evento.id;
        tr.innerHTML = `
            <td>${formatarData(evento.data)}</td>
            <td>${evento.titulo}</td>
            <td>${evento.descricao}</td>
            <td>
              <button id="participantes${evento.id}" type="button" class="btn" style="background-color:transparent">
                ${evento.participantes.length}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people" viewBox="0 0 16 16">
                  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
                </svg>
              </button>
            </td>
        `;

        console.log(tr.id);
        tbodyEventos.appendChild(tr);
        
        document
          .getElementById(`participantes${tr.id}`)
          .addEventListener("click", function () {
            // Abre o modal de confirmação
            var confirmacaoModal = new bootstrap.Modal(
              document.getElementById("modalParticipantes")
            );
            console.log("Modal de confirmação criado com");
            confirmacaoModal.show();
            
            participantes = getParticipantesEvento(tr.id);

            console.log(participantes);

            listaParticipantes = document.getElementById("listParticipantes");

            participantes.forEach((participante) => {
              var li = document.createElement("li");
              li.innerHTML = `
                <li>${participante.nome}</li>
              `;
              listaParticipantes.appendChild(li);
            });


            // Adiciona evento de clique ao botão de confirmação dentro do modal
            document
            .getElementById("modalParticipantes")
            .addEventListener("click", function () {
              // Fecha o modal após a confirmação
              confirmacaoModal.hide();

              // Fecha o backdrop
              document.querySelector(".modal-backdrop").remove();
            });

            // Adiciona evento de clique ao botão de confirmação dentro do modal
            document
              .getElementById("fecharModal")
              .addEventListener("click", function () {
                // Fecha o modal após a confirmação
                confirmacaoModal.hide();

                // Fecha o backdrop
                document.querySelector(".modal-backdrop").remove();
              });
          });
      });
    });

  console.log("tbody criado com sucesso!");
}

listarEventos();
