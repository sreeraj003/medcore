const multer = require ('multer')

const storage = multer.diskStorage({
    destination:function(req,file,cb){
        console.log(req.body);
        cb(null,'./images');
    },
    
    filename:function(req,file,cb){
        const name = Date.now()+'-'+file.originalname;
        cb(null,name)
    }
})

const upload = multer({storage:storage})
module.exports = upload