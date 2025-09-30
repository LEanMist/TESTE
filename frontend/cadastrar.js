const API_URL = "http://localhost:3000/alunos"

const inputNome = document.getElementById("nome")
const inputCpf = document.getElementById("cpf")
const inputCep = document.getElementById("cep")
const inputUf = document.getElementById("uf")
const inputRua = document.getElementById("rua")
const inputNumero = document.getElementById("numero")
const inputComplemento = document.getElementById("complemento")
const formAluno = document.getElementById("form-aluno")

async function salvar(evento) {
    console.log("salvando aluno...")

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
        const requisicao = await fetch(API, {
            method: "POST",
            headers: { "constent-type": "application/json" },
            body: novoAluno ? JSON.stringify(novoAluno) : undefined    
        })
        requisicao.status === 201 ? console.log(requisicao.json()) : console.log("erro na resquisicao")
    } catch(erro) {
        console.log(erro.message)            
    }

    CarregaTabela()
}

const botaoenviar = document.getElementById("Enviar")

botaoenviar.addEventListener("click", salvar)
