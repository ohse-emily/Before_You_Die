require('dotenv').config();
const {Sequelize} = require('../../models')
const { Users, Lastwords, Messages } = require('../../models');

// mylast words 나의 마지막 말 Lastwords DB에 insert  by 세연 
const mywords = async (req, res) => {
    let { lastword_subject, lastword_content, lastword_sender, user_email } = req.body;
    console.log(user_email,lastword_subject, lastword_content, lastword_sender)
    try {
        await Lastwords.create({
            user_email, lastword_subject, lastword_content, lastword_sender
        })
        console.log("users' Lastwords inserted into DB successfully")
    } catch (e) {
        console.log("Inserting Users' Lastwords failed. ERROR = ", e)
    }
    res.json({result:true})
}

// Your last words 너의 마지막 말을 db에서 랜덤 하나 추출  by세연
const yourwords = async(req,res)=>{
    try{
        let RandomLastword = await Lastwords.findAll({order:Sequelize.literal('rand()'), limit:1})
        
        console.log('Getting yourwords List from db - success !! ', RandomLastword)
        res.json(RandomLastword)
    }catch(e){
        console.log('Getting yourwords List from db Failed,ERROR=', e)
    }
}







module.exports = {
    mywords, yourwords, 
}