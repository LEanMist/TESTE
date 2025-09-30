console.log("app.js funcionando")
let alunos = [
    {id: 1, nome: "João Silva", cpf: "123.456.789-00", cep: "12345-678", uf: "SP", rua: "Rua A", numero: "100", complemento: "Apto 101"},
    {id: 2, nome: "Maria Souza", cpf: "987.654.321-00", cep: "87654-321", uf: "RJ", rua: "Avenida B", numero: "200", complemento: "Casa" },
    {id: 3, nome: "Pedro Oliveira", cpf: "456.789.123-00", cep: "54321-876", uf: "MG", rua: "Travessa C", numero: "300", complemento: "" }
]


function CarregaTabela() {
    const tbody = document.getElementById("tbody")
    tbody.innerHTML = "<tr><td colspan='10'>carregando...</td></tr>"
    
    setTimeout(() => {
        tbody.innerHTML = "";
        tbody.innerHTML = alunos.map(aluno => 
           `<tr>
                <td>${aluno.id}</td>
                <td>${aluno.nome}</td>
                <td>${aluno.cpf}</td>
                <td>${aluno.cep}</td>
                <td>${aluno.uf}</td>
                <td>${aluno.rua}</td>
                <td>${aluno.numero}</td>
                <td>${aluno.complemento}</td>
            </tr>`
        ).join("");
    
    }, 3000); // Simula um atraso de 3 segundos
}

const inputNome = document.getElementById("nome")
const inputCpf = document.getElementById("cpf")
const inputCep = document.getElementById("cep")
const inputUf = document.getElementById("uf")
const inputRua = document.getElementById("rua")
const inputNumero = document.getElementById("numero")
const inputComplemento = document.getElementById("complemento")
const formAluno = document.getElementById("form-aluno")

function salvar(evento) {
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
    alunos.push(novoAluno)
    CarregaTabela()
}

formAluno.onsubmit = (evento) => {
    evento.preventDefault()
    salvar(evento)
}


CarregaTabela();
