const urlparametro = new URLSearchParams(window.location.search)
const id = urlparametro.get("id")
console.log("ID do aluno para editar ", id)

const inputID = document.getElementById("id");
inputID.value = id;

const API = "http://localhost:3000/alunos"


async function carregarAluno()
{
    if(!id){
        alert("Nenhum aluno selecionado para edição");
        return 
    }

    const resposta = await fetch(`${API}/${id}`);
    const ALUNOS = await resposta.json();
    console.log(ALUNOS);

    document.getElementById("nome").value = ALUNOS[0].nome;
    document.getElementById("cpf").value = ALUNOS[0].cpf;
    document.getElementById("cep").value = ALUNOS[0].cep;
    document.getElementById("uf").value = ALUNOS[0].uf;
    document.getElementById("rua").value = ALUNOS[0].rua;
    document.getElementById("numero").value = ALUNOS[0].numero;
    document.getElementById("complemento").value = ALUNOS[0].complemento;
}

carregarAluno();

const form_edicao = document.getElementById("form-edicao")

form_edicao.addEventListener("submit", async (evento) => {
    evento.preventDefault();
    const nome = document.getElementById("nome").value.trim()
    const cpf = document.getElementById("cpf").value.trim()
    const cep = document.getElementById("cep").value.trim()
    const uf = document.getElementById("uf").value.trim()   
    const rua = document.getElementById("rua").value.trim()
    const numero = document.getElementById("numero").value.trim()
    const complemento = document.getElementById("complemento").value.trim()
    const alunoAtualizado = { nome, cpf, cep, uf, rua, numero, complemento }

    try {
        const resposta = await fetch(`${API}/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(alunoAtualizado)
        })
        if (resposta.ok) {
            const dados = await resposta.json();
            console.log("Aluno atualizado com sucesso:", dados);
            alert("Aluno atualizado com sucesso!");
            window.location.href = "index.html"; // Redireciona para a página inicial
        } else {
            console.error("Erro ao atualizar aluno:", resposta.statusText);
            alert("Erro ao atualizar aluno. Tente novamente.");
        } 
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro na requisição. Tente novamente.");
    }
})
    




