var express = require("express");
var router = express.Router();

var escalacaoController = require("../controllers/escalacaoController");

router.get("/", function (req, res) {
    escalacaoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    escalacaoController.listar(req, res);
});

router.get("/listarEscalacao", function (req, res) {
    escalacaoController.listarEscalacao(req, res);
});

router.get("/listarUmaEscalacao/:fkUsuario", function (req, res) {
    escalacaoController.listarUmaEscalacao(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de escalacaoController.js
router.post("/cadastrar", function (req, res) {
    escalacaoController.cadastrar(req, res);
})

router.post("/autenticar", function (req, res) {
    escalacaoController.entrar(req, res);
});

module.exports = router;