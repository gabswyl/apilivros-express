import { autor } from '../models/autor.js';
import livro from '../models/livro.js'

class LivroController {

    static async listarLivros(req, res) {
        try {
            const listaLivros = await livro.find({})
            res.status(200).json(listaLivros);
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - falha na requisição!`
            })
        }
    }

    static async listarLivrosPorId(req, res) {
        try {
            const id = req.params.id;
            const livroEncontrado = await livro.findById(id)
            res.status(200).json(livroEncontrado);
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - falha na requisição do livro`
            })
        }
    }

    static async cadastrarlivros(req, res) {
        const novoLivro = req.body;
        try {
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = {
                ...novoLivro, autor: {
                    ...autorEncontrado
                }
            }

            const livroCriado = await livro.create(livroCompleto)
            res.status(201).json({
                message: "Criado com sucesso",
                livro: livroCriado
            })
        } catch(erro) {
            res.status(500).json({
                message: `${erro.message} - falha ao cadastrar livro`
            })
        }
    }

    static async atualizarLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndUpdate(id, req.body);
            res.status(200).json({
                message: "Livro atualizado"
            });
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - falha na atualização`
            })
        }
    }

    static async excluirLivro(req, res) {
        try {
            const id = req.params.id;
            await livro.findByIdAndDelete(id);
            res.status(200).json({
                message: "Livro excluido com sucesso!"
            });
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - falha em excluir o livro`
            })
        }
    }

    static async listarLivrosPorEditora(req, res) {
        const editora = req.query.editora;

        try {
            const livrosPorEditora = await livro.find({
                editora: editora
            })
            res.status(200).json(livrosPorEditora)
        } catch (erro) {
            res.status(500).json({
                message: `${erro.message} - falha na busca`
            })
        }
    }
};

export default LivroController;