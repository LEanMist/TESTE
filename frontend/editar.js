const urlparametro = new URLSearchParams(window.location.search)
const id = urlparametro.get("id")
console.log("ID do aluno para editar ", id)

const inputID = document.getElementById("id");
inputID.value = id;

const botaoenviar = document.getElementById("btn-enviar");

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

botaoenviar.onclick = async (evento) => {
}


