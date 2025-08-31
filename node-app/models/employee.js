const {Sequelize, Model, DataTypes} = require('sequelize');


module.exports = (sequelize) => {

    class Employee extends Model {}

    Employee.init(
        {
            nome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            sobrenome: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            idade: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            cargo: {
                type: DataTypes.STRING,
                allowNull: false
            },
            endereco: {
                type: DataTypes.STRING,
                allowNull: false
            }
        },
        {
            sequelize,
            modelName: 'Employee',
            tableName: 'employees',
            underscored: true
        }
    )

    return Employee;

}

