module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");
    
    var router = require("express").Router();

    // Create a new Cliente
    router.post("/", clientes.create);
    // Retrieve all Tutorials
    router.get("/", clientes.findAll);
    // router.get("/:cpf", clientes.findOne);

    app.use('/api/clientes', router);
  };