module.exports = app => {
    const clientes = require("../controllers/cliente.controller.js");
    
    var router = require("express").Router();

    // Create a new Cliente
    router.post("/", clientes.create);
    // Retrieve all Clientes
    router.get("/", clientes.findAll);
    // Update a Cliente with cpf
    router.put("/:cpf", clientes.update);
    // Delete a Cliente with cpf
    router.delete("/:cpf", clientes.delete);

    app.use('/api/clientes', router);
  };