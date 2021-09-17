const express = require('express');
const router = express.Router();
const controller = require('./user.controller');
const axios = require('axios')

const multer = require('multer');
const path = require('path');
// const qs = require('qs');
// const FormData = require('form-data');

// const firstLoad = (req, res, next) => {
//     console.log(req.body)
//     let data = qs.parse(req.body)
//     console.log(data)
//     let formData = new FormData();
//     console.log('1 formData=', formData)
//     formData['file'] = data;
//     formData['key'] = "file";
//     console.log('2 formData=', formData)
//     req.body = formData;
//     console.log('req.body=', req.body)
//     next();
// }


const upload = multer({
    storage: multer.diskStorage({
        destination: function (req, file, callback) {
            console.log('multer : ', req)
            callback(null, './uploads/')
        },
        filename: function (req, file, callback) {
            callback(null, new Date().valueOf() + path.extname(file.originalname))
        },
        onError: function (err, next) {
            console.log('error', err)
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
router.post('/nickname_check', controller.nickNameCheckFn)

module.exports = router;

