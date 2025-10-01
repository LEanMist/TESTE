console.log("app.js funcionando")
const API = 'http://localhost:3000/alunos'

async function carregarTabela() {
    try {
        const resposta = await fetch(API);
        const ALUNOS = await resposta.json();
        console.log(ALUNOS);

        const tbody = document.getElementById("tbody")

        tbody.innerHTML = "<tr><td colspan='10'>Carregando...</td></tr>"

        // setTimeout(() => {
        tbody.innerHTML = "";
        tbody.innerHTML = ALUNOS.map(a =>
            `<tr>
                <td>${a.id}</td>
                <td>${a.nome}</td>
                <td>${a.cpf}</td>
                <td>${a.cep}</td>
                <td>${a.uf}</td>
                <td>${a.rua} senai</td>
                <td>${a.numero}</td>
                <td>${a.complemento}</td>
                <td> 
                    <button>
                        <a href="editar.html?id=${a.id}">Editar</a>
                    </button>
                    <button onclick="deletarAluno(${a.id})">Deletar</button>
                </td>
            </tr>`
        ).join("");
    } catch (erro) {
        console.log(erro.message)
    }
}
carregarTabela()

async function deletarAluno(id) {
    if (!confirm("Tem certeza que deseja deletar este aluno?")) {
        return;
    }
    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "DELETE"
        });
        if (resposta.ok) {
            alert("Aluno deletado com sucesso!");
            carregarTabela();
        }
    } catch (erro) {
        console.log(erro.message);
        alert("Erro ao deletar aluno. Tente novamente.");
    }
}