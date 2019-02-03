var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var multer = require('multer');
var path = require('path');
router.use(bodyParser.json());
var storage = multer.diskStorage({
  description: function(req, file, cb){
    cd(null, '/uploads')
  },
  filename: function(req, file, cd){
    var dateimestamp = Data.now();
    cd(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').lenght-1])
  }
});

var upload = multer({
  storage: storage,
  fileFilter : function(req, file, callback){
    if(['xls','xlsx'].indexOf(file.originalname.split('.')[file.originalname.split('.').length-1]) === -1){
      return callback(new Error('Wrong extnsion type'));
    }
    callback(null, true);
  }
}).single('file');
//업로드 파일 처리
router.post('/upload', function(req, res){
  upload(req,res,function(err){
    if(err){
      res.json({error_code:1, err_desc:err});
      return;
    }
    res.json({error_code:0,err_desc:null});
  });
});

router.get('/',function(req, res){
  res.sendFile(path.join(__dirname, '../public/form.html'))
});







module.exports = router;
