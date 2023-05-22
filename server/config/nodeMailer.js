const nodemailer = require('nodemailer')

async function mailSender(mail,otp){
    try {
        const mailTransporter =  nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:process.env.MAIL_ID,
                pass:process.env.MAIL_PASSWORD
            }
        })
        
        let details = {
            from:process.env.MAIL_ID,
            to:mail,
            subject:'Mail verification',
            text:`Your otp for verifying your medcore account is - ${otp}`
        }
        
            const mails = mailTransporter.sendMail(details,(err)=>{
            if(err){
                res.json(err)
            }else{
                console.log('mail sent');
            }
            
        })
        
    } catch (error) {
        console.log(error);
    }
}

module.exports = mailSender