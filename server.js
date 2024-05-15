import http from "http";

const PORT = 3000; // porta para acessar o servidor

const routes = { // cria rotas 
    "/": "Curso de node.js!",
    "/livros": "rota livro online",
    "/autores": "rota livro autores online"
};

const server = http.createServer((req, res) => {
    res.writeHead(200, {
        'Content-Type': 'text/plain'
    });
    res.end(routes[req.url])
});

server.listen(PORT, () => {
    console.log("servidor escutando!")
});