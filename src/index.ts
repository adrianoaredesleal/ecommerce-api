import express from "express";

const app = express();

//Criando a rota para o /
app.get("/", (req, resp) => {
    resp.send("Seja bem vindo ao curso de NodeJS");
});

app.listen(3000, () => {
    console.log("Servidor ativo na porta 3000");
});