const API_URL = "http://localhost:3000/alunos"

const form_cadastrar = document.getElementById("form-cadastrar")
const inputNome = document.getElementById("nome")
const inputCpf = document.getElementById("cpf")
const inputCep = document.getElementById("cep")
const inputUf = document.getElementById("uf")
const inputRua = document.getElementById("rua")
const inputNumero = document.getElementById("numero")
const inputComplemento = document.getElementById("complemento")

async function salvar(evento) {
    const nome = inputNome.value.trim()
    const cpf = inputCpf.value.trim()
    const cep = inputCep.value.trim()
    const uf = inputUf.value.trim()
    const rua = inputRua.value.trim()
    const numero = inputNumero.value.trim()
    const complemento = inputComplemento.value.trim()
    const novoAluno = {
        nome, cpf, cep, uf, rua, numero, complemento
    }
    console.log(novoAluno)
    try {
        const requisicao = await fetch(API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(novoAluno)    
        })
        if (requisicao.ok) {
            const dados = await requisicao.json();
            console.log("Aluno cadastrado com sucesso:", dados);
            alert("Aluno cadastrado com sucesso!");
            window.location.href = "index.html"; 
        } else {
            console.error("Erro ao cadastrar aluno:", requisicao.statusText); 
            alert("Erro ao cadastrar aluno. Tente novamente.");
        }
    } catch (erro) {
        console.error("Erro na requisição:", erro);
        alert("Erro na requisição. Tente novamente.");
    }
}

form_cadastrar.addEventListener("submit", (evento) => {
    evento.preventDefault();
    salvar();
})

