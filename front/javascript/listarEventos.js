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

function deletarLigante(id) {
  fetch(`http://localhost:8080/ligante/deletar/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => {
      console.log(response);
      listarLigantes();
    })
    .catch((error) => {
      console.error("Erro:", error);
    });
}

function listarLigantes() {
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
                Não há ligantes cadastrados!
            </div>
            `;
        return;
      }

      var tablePlaceholder = document.getElementById("tablePlaceholder");
      tablePlaceholder.innerHTML = `
        <table id="tabelaLigantes" class="table" style="text-align:center">
                    <thead id="theadLigantes">
                      <tr>
                        <th scope="col">Nome</th>
                        <th scope="col">Matrícula</th>
                        <th scope="col">Data de Admissão</th>
                        <th scope="col">Ações</th>
                      </tr>
                    </thead>
                    <tbody id="tbodyLigantes">
                        
                    </tbody>
                </table> 
    `;

      console.log("thead criado com sucesso!");

      // criar as linhas da tabela

      var tbodyLigantes = document.getElementById("tbodyLigantes");

      data.forEach((ligante) => {
        console.log(ligante);
        var tr = document.createElement("tr");
        tr.id = ligante.id;
        tr.innerHTML = `
            <td>${ligante.nome}</td>
            <td>${ligante.matricula}</td>
            <td>${formatarData(ligante.dataCadastro)}</td>
            <td>
                <button id="editar${tr.id}"type="button" class="btn btn-primary ml-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
                    <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
                  </svg>
                </button>
                <button id="deletar${tr.id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                  </svg>
                </button>
            </td>
        `;

        console.log(tr.id);
        tbodyLigantes.appendChild(tr);




        // var edicaoModal = new bootstrap.Modal(
        //   document.getElementById("modalEdicao")
        // );

        // //definindo placeholders
        // inputPlaceholder = document.getElementById("inputNome");

        // inputPlaceholder.value = ligante.nome;

        // edicaoModal.show();

        // console.log("Modal de edição criado");

        
        document
          .getElementById(`deletar${tr.id}`)
          .addEventListener("click", function () {
            // Abre o modal de confirmação
            var confirmacaoModal = new bootstrap.Modal(
              document.getElementById("modalConfirmarDelecao")
            );
            console.log("Modal de confirmação criado com");
            confirmacaoModal.show();

            // Adiciona evento de clique ao botão de confirmação dentro do modal
            document
              .getElementById("deletarModal")
              .addEventListener("click", function () {
                deletarLigante(tr.id);
                console.log("Item com ID", tr.id, "deletado!");

                // Fecha o modal após a confirmação
                confirmacaoModal.hide();

                // Fecha o backdrop
                document.querySelector(".modal-backdrop").remove();
              });

              // Adiciona evento de clique ao botão de confirmação dentro do modal
            document
            .getElementById("cancelarModal")
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

listarLigantes();
