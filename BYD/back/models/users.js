const Sequelize = require('sequelize');

module.exports = class Users extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_nickname:{
                type:Sequelize.STRING(50),
                allowNull:false,
                unique:true,
            },
            user_email:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            user_password:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            user_image:{
                type:Sequelize.STRING(100),
                allowNull:true,
            },
            user_score:{
                type:Sequelize.STRING(50),
                allowNull:false,
                defaultValue:0,
            },
            email_verify:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:0,   // 0 은 아직 인증 전 , 1은 인증 후  (by 세연) 
            },
            user_info_agree:{
                type:Sequelize.BOOLEAN,
                allowNull:false,
                defaultValue:1, // 처음 가입 시 고객정보 수신 동의 필요 -> 디폴트값 1  (by세연) 
            },
            join_date:{
                type:Sequelize.DATE,
                allowNull:false,
                defaultValue:Sequelize.NOW,
            },
            login_date:{
                type:Sequelize.DATE,
                allowNull:true,
            }
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:"Users",
            tableName:"users",
            charset:"utf8mb4",
            collate:"utf8mb4_general_ci",
        })
    }
    static associate(db){}
}