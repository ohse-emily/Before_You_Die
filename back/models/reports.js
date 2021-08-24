const Sequelize = require('sequelize');

module.exports = class Reports extends Sequelize.Model{
    static init(sequelize){
        return super.init({
            user_email:{
                type:Sequelize.STRING(50),
                allowNull:false,
            },
            post_id:{ 
                type:Sequelize.INTEGER(50),
                allowNull:false,
            },
            type:{ // 신고 좋아요
                type:Sequelize.INTEGER(2),
                allowNull:false, 
            },
        },{
            sequelize,
            timestamps:false,
            underscored:false,
            paranoid:false,
            modelName:"Reports",
            tableName:"reports",
            charset:"utf8mb4",
            collate:"utf8mb4_general_ci",
        })
    }
    static associate(db){}
}