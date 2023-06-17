var graficoModel = require("../models/graficoModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    graficoModel.listar()
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!")
            }
        }).catch(
            function (erro) {
                console.log(erro);
                console.log("Houve um erro ao realizar a consulta! Erro: ", erro.sqlMessage);
                res.status(500).json(erro.sqlMessage);
            }
        );
}

function entrar(req, res) {
 
    graficoModel.entrar()
            .then(
                function (resultado) {
                    if (resultado.length > 0) {
                        console.log(resultado);
                        res.status(200).json(resultado);
                    } else {
                        res.status(204).send("Nenhum valor");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar a avaliação! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }



function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var fkUsuario = req.body.idUsuarioServer;
    var valorAvalicaoGosto = req.body.valorGostoServer;
    var valorAvalicaoNaoGosto = req.body.valorNaoGostoServer;
    

    // Faça as validações dos valores
    if (fkUsuario == undefined) {
        res.status(400).send("Seu fkUsuario está undefined!");
    } else if (valorAvalicaoGosto == undefined) {
        res.status(400).send("Sua valorAvalicao está undefined!");
    } else if (valorAvalicaoNaoGosto == undefined) {
        res.status(400).send("Sua valorAvalicao está undefined!");
    }else {
        
        // Passe os valores como parâmetro e vá para o arquivo graficoModel.js
        graficoModel.cadastrar(fkUsuario, valorAvalicaoGosto, valorAvalicaoNaoGosto)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar a avaliacao! Erro: ",
                        erro.sqlMessage
                    );
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

module.exports = {
    entrar,
    cadastrar,
    listar,
    testar
}