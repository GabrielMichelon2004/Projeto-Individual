var express = require("express");
var router = express.Router();

var graficoController = require("../controllers/graficoController");

router.get("/", function (req, res) {
    graficoController.testar(req, res);
});

router.get("/listar", function (req, res) {
    graficoController.listar(req, res);
});

//Recebendo os dados do html e direcionando para a função cadastrar de graficoController.js
router.post("/cadastrar", function (req, res) {
    graficoController.cadastrar(req, res);
})

router.get("/autenticar", function (req, res) {
    graficoController.entrar(req, res);
});

module.exports = router;