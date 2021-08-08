require('dotenv').config();
const crypto = require('crypto');

// user password 암호화해서 저장하기 
function createPW(userpw){
    const cryptoPW = crypto.createHmac('sha256', Buffer.from(process.env.salt))
                    .update(userpw)
                    .digest('base64')
                    .replace('==','').replace('=','');
    return cryptoPW; 
}

// user email 인증 키 암호화
function email_verify_key(){
    let key1 = crypto.randomBytes(256).toString('hex').substr(100,5);
    let key2 = crypto.randomBytes(256).toString('base64').substr(50,5);
    let final_key = key1 + key2;
    console.log('final_key=',final_key)
    return final_key;
}

module.exports={
    email_verify_key, createPW, 
}