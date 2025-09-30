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

app.post("/alunos", async(req, res) => {
    try {
        const {nome, cpf, cep, uf, rua, numero, complemento} = req.body;
        if (!nome || !cpf || !cep || !uf || !rua || !numero) {
            return res.status(400).json({msg : "Campos obrigatórios não foram preenchidos" })
        }
        const [insercao] = await conection.query(`
            INSERT INTO alunos 
            (nome,cpf,cep,uf,rua,numero,complemento)
            VALUES (?, ?, ?, ?, ?, ?, ?)`,[nome, cpf, cep, uf, rua, numero, complemento])
        console.log(insercao)
        res.status(201).json({ id: insercao.insertId, ...req.body })
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao adicionar aluno" })
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

app.delete("/alunos/:id", async(req, res) => {
    const id = req.params.id
    try {
        const [retorno] = await conection.query("SELECT * FROM alunos WHERE id = ?", [id])
        res.status(200).json(retorno);
    }catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao buscar aluno" })
    }
})

app.listen(porta, () => console.log(`Servidor rodando http://localhost:${porta}/`));