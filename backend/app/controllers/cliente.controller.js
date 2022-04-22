const db = require("../models");
const Cliente = db.clientes;
const Op = db.Sequelize.Op;

// Create and Save a new Tutorial
exports.create = (req, res) => {
  // Validate request
  if (!req.body.cpf) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Cliente
  const cliente = {
    cpf: req.body.cpf,
    nome: req.body.nome,
    endereco: req.body.endereco,
    telefone: req.body.telefone,
    email: req.body.email
  };
  
  // Save Cliente in the database
  Cliente.create(cliente)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Cliente."
      });
    });
};

// Retrieve all Clientes from the database.
exports.findAll = (req, res) => {
  Cliente.findAll()
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving clientes."
      });
    });
};

// // Retrieve all Tutorials from the database.
// exports.findAll = (req, res) => {
//   const cpf = req.query.cpf;
//   var condition = cpf ? { cpf: { [Op.like]: `%${cpf}%` } } : null;

//   Cliente.findAll({ where: condition })
//     .then(data => {
//       res.send(data);
//     })
//     .catch(err => {
//       res.status(500).send({
//         message:
//           err.message || "Some error occurred while retrieving clientes."
//       });
//     });
// };
// 
// // Find a single Cliente with an cpf
// exports.findOne = (req, res) => {
//   const cpf = req.params.cpf;

//   Cliente.findByPk(cpf)
//     .then(data => {
//       if (data) {
//         res.send(data);
//       } else {
//         res.status(404).send({
//           message: `Cannot find Cliente with cpf=${cpf}.`
//         });
//       }
//     })
//     .catch(err => {
//       res.status(500).send({
//         message: "Error retrieving Cliente with cpf=" + cpf
//       });
//     });
// };
// // Update a Tutorial by the id in the request
// exports.update = (req, res) => {
  
// };
// // Delete a Tutorial with the specified id in the request
// exports.delete = (req, res) => {
  
// };
// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
  
// };