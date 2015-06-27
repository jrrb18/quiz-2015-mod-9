//  Definición del modelo de Quiz

module.exports = function(sequelize, DataTypes) {
	return sequelize.define('Quiz',
				{id: DataTypes.INTEGER,
				 pregunta:  DataTypes.STRING,
				 respuesta: DataTypes.STRING,				  	
				});
}
