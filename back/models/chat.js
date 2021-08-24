const Sequelize = require('sequelize');

// by 세연 
module.exports = class Chat extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_email:{           // 채팅방을 open한 유저 
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            chat_name:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            chat_date:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:"Chat",
            tableName:"chat",
            charset:"utf8mb4",
            collate:"utf8mb4_general_ci",
        })
    }
    static associate(db){}
}