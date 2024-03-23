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

function listarLigantes() {
  fetch("http://localhost:8080/ligante/listar", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .then((data) => {
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
                <button id="editar${tr.id}"type="button" class="btn btn-primary ml-auto">Editar</button>
                <button id="remover${tr.id}"type="button" class="btn btn-danger ml-auto">Remover</button>
            </td>
        `;


        console.log(tr.id)
        tbodyLigantes.appendChild(tr);
      });
    });

  console.log("tbody criado com sucesso!");
}

listarLigantes();
