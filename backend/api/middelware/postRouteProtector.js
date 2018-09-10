const jwt = require('jsonwebtoken')
const config = require('./../config/config')

const Authenticate = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        if(token){
            jwt.verify(token, config.secretKey, (err, decode) => {
                if(err){
                    console.log(err)
                    res.status(401).json({
                        error: 'invalid access token token'
                    })
                }else{ 
                    req.user = decode; 
                    next();
                }
            })
        }else{
            res.status(401).json({
                error: 'invalid access token token'
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            error: 'error occurred'
        })
    }
}

module.exports = Authenticate