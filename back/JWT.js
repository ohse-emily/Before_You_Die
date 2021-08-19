require('dotenv').config();
const crypto = require('crypto');

// user password 암호화해서 저장하기 by 세연
function createPW(userpw){
    const cryptoPW = crypto.createHmac('sha256', Buffer.from(process.env.salt))
                    .update(userpw)
                    .digest('base64')
                    .replace('==','').replace('=','');
    return cryptoPW;
}

// user email 인증 키 암호화 by 세연 
function email_verify_key(){
    let key1 = crypto.randomBytes(256).toString('hex').substr(100,5);
    let key2 = crypto.randomBytes(256).toString('hex').substr(50,5);
    let final_key = key1 + key2;
    console.log('final_key=',final_key)
    return final_key;
}

// 로그인 기록을 device에 저장하기 위하여 토큰 생성
function createToken(userid){
    let header = {
        "tpy":"JWT",
        "alg":"HS256",
    }
    let exp = new Date().getTime()+(50*60*1000) 
    let payload = {userid,exp}
    const encodingHeader = Buffer.from(JSON.stringify(header))
                                                            .toString('base64')
                                                            .replace('==','')
                                                            .replace('=','')
    const encodingPayload = Buffer.from(JSON.stringify(payload))
                                                            .toString('base64')
                                                            .replace('==','')
                                                            .replace('=','')
    const signature = crypto.createHmac('sha256',Buffer.from(process.env.salt))
                                                            .update(encodingHeader+"."+encodingPayload)
                                                            .digest('base64')
                                                            .replace('==','')
                                                            .replace('=','')
    let jwt = `${encodingHeader}.${encodingPayload}.${signature}`
    return jwt;
}

// 회원정보 받아올 때 토큰에서 useremail 추출
function getUserid(token) {
    if (token == undefined || token == null || token == '') {
        return 0;
    } else {
        let payLoad = token.split('.')[1]
        let userIdString = Buffer.from(payLoad, 'base64').toString()
        let userId = JSON.parse(userIdString)
        return userId.userid
    }
}

module.exports={
    email_verify_key, createPW, createToken, getUserid
}