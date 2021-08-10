const Sequelize = require('sequelize');

module.exports = class Lastwords extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_id:{
                type:Sequelize.STRING(10000),
                allowNull:false,
            },
            lastword_subject:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            lastword_content:{   
                type:Sequelize.TEXT,
                allowNull:false,
            },
            lastword_sender:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            lastword_date:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:"Lastwords",
            tableName:"lastwords",
            charset:"utf8mb4",
            collate:"utf8mb4_general_ci",
        })
    }
    static associate(db){}
}