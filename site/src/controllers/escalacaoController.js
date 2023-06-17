var escalacaoModel = require("../models/escalacaoModel");

var sessoes = [];

function testar(req, res) {
    console.log("ENTRAMOS NA usuarioController");
    res.json("ESTAMOS FUNCIONANDO!");
}

function listar(req, res) {
    escalacaoModel.listar()
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

function listarEscalacao(req, res) {
    escalacaoModel.listarEscalacao()
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

function listarUmaEscalacao(req, res) {
    var fkUsuario = req.params.fkUsuario;

    if (fkUsuario == undefined) {
        res.status(400).send("Seu fkUsuario está undefined!");
    } else {
        escalacaoModel.listarUmaEscalacao(fkUsuario)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length > 0) {
                        console.log(resultado);
                        res.json(resultado);
                    } else {
                        res.status(204).send("Nenhum resultado obtido");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }
}

function entrar(req, res) {
    var email = req.body.emailServer;
    var senha = req.body.senhaServer;

    if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    } else if (senha == undefined) {
        res.status(400).send("Sua senha está indefinida!");
    } else {

        escalacaoModel.entrar(email, senha)
            .then(
                function (resultado) {
                    console.log(`\nResultados encontrados: ${resultado.length}`);
                    console.log(`Resultados: ${JSON.stringify(resultado)}`); // transforma JSON em String

                    if (resultado.length == 1) {
                        console.log(resultado);
                        res.json(resultado[0]);
                    } else if (resultado.length == 0) {
                        res.status(403).send("Email e/ou senha inválido(s)");
                    } else {
                        res.status(403).send("Mais de um usuário com o mesmo login e senha!");
                    }
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o login! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
    }

}

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    var ata = req.body.ATAServer;
    var PE = req.body.PEServer;
    var PD = req.body.PDServer;
    var MEIe = req.body.MEIeServer;
    var MEId = req.body.MEIdServer;
    var VOL = req.body.VOLServer;
    var latEsquerda = req.body.LTeServer;
    var latDireita = req.body.LTdServer;
    var zagEsquerda = req.body.ZAGeServer;
    var zagDireita = req.body.ZAGdServer;
    var gol = req.body.GOLServer;
    var idUsuario = req.body.idUsuarioServer;


    console.log("BODY.REQ: ", req.body);

    // Faça as validações dos valores
    if (ata == undefined) {
        res.status(400).send("Seu ata está undefined!");
    } else if (PE == undefined) {
        res.status(400).send("Seu PE está undefined!");
    } else if (PD == undefined) {
        res.status(400).send("Seu PD está undefined!");
    } else if (MEIe == undefined) {
        res.status(400).send("Seu MEIe está undefined!");
    } else if (MEId == undefined) {
        res.status(400).send("Sua MEId está undefined!");
    } else if (VOL == undefined) {
        res.status(400).send("Sua VOL está undefined!");
    } else if (latEsquerda == undefined) {
        res.status(400).send("Sua latEsquerda está undefined!");
    } else if (latDireita == undefined) {
        res.status(400).send("Sua latDireita está undefined!");
    } else if (zagEsquerda == undefined) {
        res.status(400).send("Sua zagEsquerda está undefined!");
    } else if (zagDireita == undefined) {
        res.status(400).send("Sua zagDireita está undefined!");
    } else if (gol == undefined) {
        res.status(400).send("Sua gol está undefined!");
    } else {

        // Passe os valores como parâmetro e vá para o arquivo escalacaoModel.js
        escalacaoModel.cadastrar(idUsuario, ata, PE, PD, MEIe, MEId, VOL, latEsquerda, latDireita, zagEsquerda, zagDireita, gol)
            .then(
                function (resultado) {
                    res.json(resultado);
                }
            ).catch(
                function (erro) {
                    console.log(erro);
                    console.log(
                        "\nHouve um erro ao realizar o cadastro da sua escação! Erro: ",
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
    listarEscalacao,
    listarUmaEscalacao,
    testar
}