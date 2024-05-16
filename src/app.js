import express from "express";
import mongoose from "mongoose";
import main from './config/dbConnect.js'
import routes from "./routes/index.js"

main().then(() => {
   
    const conexao = mongoose.connection;

    conexao.on("error", (erro) => {
        console.error("deu erro de conexão!", erro)
    })

    conexao.once("open", () => {
        console.log("conexão sucedida!")
    })

    
}).catch((erro) => {
    console.error("Erro ao conectar ao banco de dados:", erro);
    process.exit(1); 
});

const app = express();
routes(app);

const livros = [{
    id: 1,
    titulo: "Máquina de aquisição de clientes"
},
{
    id: 2,
    titulo: "Venda ou seja vendido"
}]

function buscaLivros(id) {
    return livros.findIndex(livro => {
        return livro.id === Number(id);
    })
}


app.delete("/livros/:id", (req, res) => {
    const index = buscaLivros(req.params.id)
    livros.splice(index, 1)
    res.status(200).send("livros removido com sucesso")
})

export default app;


// mongodb+srv://admin:admin123@cluster0.jpseeac.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0