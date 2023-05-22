const {sign,verify} = require('jsonwebtoken')

const createTokens = (user) => {
    const accessToken = sign(
        {id:user},
        process.env.JWT_SECRET
    )
    return accessToken
}

const validateToken = (req,res,next)=>{
    const authHeader = req.headers.authorization
    if(authHeader){
        const token = authHeader.split(' ')[1]
        verify( token , process.env.JWT_SECRET , (err , decoded)=>{
            if(err){
                res.json("unauthorized")
            }
            req._id = decoded
            next()
        })
    }else{
        res.json('unauthorized')
    }
}

module.exports = {
    createTokens,
    validateToken
}