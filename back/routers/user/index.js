const express = require('express');
const router = express.Router();
const controller = require('./user.controller');

const multer = require('multer');
const path = require('path');

const upload=multer({
    storage:multer.diskStorage({
        destination:function(req,file,callback){
            callback(null,'uploads/')
        },
        filename:function(req,file,callback){
            callback(null,new Date().valueOf()+path.extname(file.originalname))
        }
    }),
});


router.post('/join', controller.join)
// router.get('/join_', controller.join_)
router.post('/login', controller.login)
router.get('/confirmEmail', controller.confirmEmail)
router.post('/userinfo', controller.getUserInfo)
router.post('/deletepost', controller.deletePost)
router.post('/deleteword', controller.deleteWord)
router.post('/email_check', controller.email_check)
router.post('/deleteacc', controller.deleteAcc)
router.post('/transformPw', controller.transformPw)
router.post('/pic_upload', upload.single('file'), controller.picUpload)

module.exports = router;

