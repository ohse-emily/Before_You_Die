const Sequelize = require('sequelize');

module.exports = class Messages extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            msg_user_email:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            msg_content:{
                type:Sequelize.TEXT,
                allowNull:false,
            },
            msg_method:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0, // 0 은 email /  문자 sns는 1 
            },
            msg_email:{
                type:Sequelize.STRING(50),
                allowNull:true,
            },
            msg_mobile:{
                type:Sequelize.STRING(50),
                allowNull:true,
            },
            msg_sender:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            msg_write_date:{  
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },
            msg_send_date:{  
                type:Sequelize.DATE,
                allowNull:true,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:"Messages",
            tableName:"messages",
            charset:"utf8mb4",
            collate:"utf8mb4_general_ci",
        })
    }
    static associate(db){}
}