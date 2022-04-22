module.exports = (sequelize, Sequelize) => {
    const Cliente = sequelize.define("cliente", {
        cpf: {
            type: Sequelize.CHAR(11),
            primaryKey: true,
            validate: {
                customValidator(value) {
                    if(value.length < 11) {
                        throw new error("cpf < 11 chars");
                    }
                }
            }
        },
        nome: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        endereco: {
            type: Sequelize.TEXT,
            allowNull: false
        },
        telefone: { 
            type: Sequelize.STRING,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true        
            }
        }
    }, {
        tableName: 'cliente'
    });
    
    return Cliente;
  };