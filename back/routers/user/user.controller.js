require('dotenv').config();
const {Users, Lastwords, Messages} = require('../../models');
const {createPW, email_verify_key} = require('../../JWT');
const nodemailer = require('nodemailer');

let join = (req,res)=>{
    console.log('asdf')
    res.send('eee')
    // let user_nickname = '닉네임'; 
    // let user_email = 'saeee210@gmail.com'; 
    // let user_password = 'asdf';
    
    // let email_key = email_verify_key();
    
    // let transporter = nodemailer.createTransport({
    //     service:'Gmail',
    //     host:'smtp.gmail.com',
    //     auth:{
    //         user:process.env.GoogleID,
    //         pass:process.env.GooglePW
    //     }
    // })
    // let url = `http://` + req.get('host') + `/user/confirmEmail?key=${email_key}`;
    // let options = {
    //     from:'<BYD>',
    //     to:user_email,
    //     subject:'이메일 인증을 진행해주세요! :) ',
    //     html:`username 님 안녕하십니까 이메일인증을 위해 url을 클릭해주세요 ${url}`
    // }

    // transporter.sendMail(options,function(err,res){
    //     if(err){
    //         console.log(err)
    //     }else{
    //         console.log('email has been successfully sent.')
    //     }
    //     transporter.close();
    // })

}

let login = async (req, res)=>{
    let {user_email, user_password} = req.body
    console.log(user_password)
    let pwJWT = createPW(user_password)

    let getUser = await Users.findOne({
        where:{
            user_email, 
            user_password: user_password} // 나중에 pwJWT로 바꾸기
    })
    let result = {proceed: false, type: 'nouser'}
    if(getUser !== null && getUser.email_verify == 1){
        // 진행
        result.proceed=true;
        result.type='verifieduser'

    } else if(getUser !== null && getUser.email_verify == 0) {
        // 인증안됨
        result.type = 'noverified'
    } 
    // nouser
    res.json(result)
}


module.exports = {
    join, login, 
}
