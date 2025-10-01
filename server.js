// importando express
const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
// cria aplicação
const app = express();
app.use(express.json());
app.use(cors());
const porta = 3000;

const conection = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "casagrande",
    database: "escola_db",
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
})



app.get("/alunos", async(req, res) => {
    try {
        const [retorno] = await conection.query("SELECT * FROM alunos")
        console.log(retorno)
        res.status(200).json(retorno)
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao buscar alunos" })
    }
})

app.get("/alunos/:id", async(req, res) => {
    const id = req.params.id
    try {
        const [retorno] = await conection.query("SELECT * FROM alunos WHERE id = ?", [id])
        res.status(200).json(retorno);
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao buscar aluno" })
    }
})

app.post("/alunos", async(req, res) => {
    try {
        const id = req.params.id
        const {nome, cpf, cep, uf, rua, numero, complemento} = req.body;
        if (!nome || !cpf || !cep || !uf || !rua || !numero) {
            return res.status(400).json({msg : "Campos obrigatórios não foram preenchidos" })
        }
        const [insercao] = await conection.query(`
            INSERT INTO alunos (nome, cpf, cep, uf, rua, numero, complemento) 
            VALUES (?, ?, ?, ?, ?, ?, ?)`,[nome, cpf, cep, uf, rua, numero, complemento])
        console.log(insercao)
        res.status(201).json({ id: insercao.insertId, ...req.body })
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao cadastrar aluno" })  
    }
})

app.put("/alunos/:id", async(req, res) => {
    try {
        const id = req.params.id
        const {nome, cpf, cep, uf, rua, numero, complemento} = req.body;
        if (!nome || !cpf || !cep || !uf || !rua || !numero) {
            return res.status(400).json({msg : "Campos obrigatórios não foram preenchidos" })
        }
        const [atualizacao] = await conection.query(`
            UPDATE alunos SET 
            nome = ?, cpf = ?, cep = ?, uf = ?, rua = ?, numero = ?, complemento = ?
            WHERE id = ?`,[nome, cpf, cep, uf, rua, numero, complemento, id])
        console.log(atualizacao)
        res.status(200).json({ id: id, ...req.body })
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao atualizar aluno" })  
    }
})

app.delete("/alunos/:id", async(req, res) => {
    try {
        const id = req.params.id
        const [remocao] = await conection.query("DELETE FROM alunos WHERE id = ?", [id])
        console.log(remocao)
        res.status(200).json({ msg: "Aluno removido com sucesso" })
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao remover aluno" })  
    }   
})



app.listen(porta, () => console.log(`Servidor rodando http://localhost:${porta}/`));