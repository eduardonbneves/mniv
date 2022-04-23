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

// Retrieve all Clientes from the database where nome = req.query.nome
exports.findAll = (req, res) => {
  const nome = req.query.nome;
  var condition = nome ? { nome: { [Op.like]: `%${nome}%` } } : null;

  Cliente.findAll({ where: condition })
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

exports.update = (req, res) => {
  const cpf = req.params.cpf;
  Cliente.update(req.body, {
    where: { cpf: cpf }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente was updated successfully."
        });
      } else {
        res.send({
          message: `Cannot update Cliente with cpf=${cpf}. Maybe Cliente was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Error updating Cliente with cpf=" + cpf
      });
    });
};

exports.delete = (req, res) => {
  const cpf = req.params.cpf;
  Cliente.destroy({
    where: { cpf: cpf }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Cliente was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete Cliente with cpf=${cpf}. Maybe Cliente was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete Cliente with cpf=" + cpf
      });
    });
};
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
// // Delete all Tutorials from the database.
// exports.deleteAll = (req, res) => {
  
// };