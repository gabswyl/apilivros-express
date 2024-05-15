import app from './src/app.js'

const PORT = 3000; // porta para acessar o servidor

app.listen(PORT, () => {
    console.log("servidor escutando!");
});