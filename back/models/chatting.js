const Sequelize = require('sequelize');

// by 세연
module.exports = class Chatting extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            chatroom_no:{   //chat.js 의 id 
                type:Sequelize.STRING(50), 
                allowNull:false, 
            }, 
            chat_name:{     // 채팅방 이름 
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            user_email:{     // 채팅방 이름 
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            user_nickname:{  // 채팅 메세지를 보낸 user nickname (굳이 email은 가져오지 않음)
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            user_profile:{
                type:Sequelize.STRING(300),
                allowNull:true,
            },
            chatting_msg:{
                type:Sequelize.STRING(10000),
                allowNull:false,
            },
            chatting_time:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:"Chatting",
            tableName:"chatting",
            charset:"utf8mb4",
            collate:"utf8mb4_general_ci",
        })
    }
    static associate(db){}
}