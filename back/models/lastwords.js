const Sequelize = require('sequelize');

module.exports = class Lastwords extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_email:{
                type:Sequelize.STRING(50),
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
                allowNull:true,
            },
            lastword_date:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },
            lastword_likes:{ //추가됨
                type:Sequelize.TEXT,
                allowNull: true,
                defaultValue:null,
            },
            report_list:{
                type: Sequelize.STRING(1000),
                allowNull: true,
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