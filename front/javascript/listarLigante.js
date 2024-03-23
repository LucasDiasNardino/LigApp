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
  fetch("http://localhost:8080/ligante/listar", {
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
                <button id="editar${tr.id}"type="button" class="btn btn-primary ml-auto" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Editar</button>
                <button id="deletar${tr.id}" type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#staticBackdrop">Deletar</button>
            </td>
        `;

        console.log(tr.id);
        tbodyLigantes.appendChild(tr);

        document
          .getElementById(`deletar${tr.id}`)
          .addEventListener("click", function () {
            // Abre o modal de confirmação
            var confirmacaoModal = new bootstrap.Modal(
              document.getElementById("staticBackdrop")
            );
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
          });
      });
    });

  console.log("tbody criado com sucesso!");
}

listarLigantes();
