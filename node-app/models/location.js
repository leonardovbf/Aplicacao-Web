const { Model, DataTypes } = require('sequelize')



module.exports = (sequelize) => {

    class Location extends Model {}

    Location.init({
        nome: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        endereco: {
            type: DataTypes.STRING,
            allowNull: false
        },
        num_employees: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        data_de_compra: {
            type: DataTypes.DATE,
            allowNull: false
        },
        },
        {
            sequelize,
            modelName: 'Location',
            tableName: 'locations',
            underscored: true
        }
    )

    return Location;


}
