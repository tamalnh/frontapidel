const User = require('./../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('./../config/config');

const getAllUser = (req, res, next) => {
    User.find()
        .then(result => {
            if(result){
                res.status(200).json({
                    message: `${result.length} user found`,
                    users: result
                })
            }else{
                res.status(404).json({
                    error: "user not found"
                })
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({
                error: "error occurred"
            })
        })
}

const signupUser = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(result => {
            if(result){
                res.status(400).json({
                    error: 'user already exists'
                })
            }else{
                bcrypt.hash(req.body.password, 13, (err, hash) => {
                    if(err){
                        console.log(err)
                        res.status(500).json({
                            error: 'error occured'
                        })
                    }else{
                        const user = new User({
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        })

                        user.save()
                            .then(result => {
                                if(result){
                                    res.status(200).json({
                                        message: "user signup successfully",
                                        user: result
                                    })
                                }else{
                                    res.status(500).json({
                                        error: "signup faild"
                                    })
                                }
                            })
                            .catch(err => {
                                console.log(err)
                                res.status(500).json({
                                    error: 'error occurred' 
                                })
                            })
                    }
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: 'error occurred'
            })
        })
}

const signinUser = (req, res, next) => {
    User.findOne({email: req.body.email})
        .then(result => {
            if(result){
                bcrypt.compare(req.body.password, result.password, (err, user) => {
                    if(err){
                        console.log(err)
                        res.status(500).json({
                            error: 'invalid email or password'
                        })
                    }else{
                        jwt.sign({
                            id: result._id, 
                            email: req.body.email
                        }, config.secretKey, {  expiresIn: '1h' }, (err, token) => {
                            if(err){
                                console.log(err)
                                res.status(500).json({
                                    error: 'error occured'
                                })
                            }else{
                                res.status(200).json({
                                    message: 'login successful',
                                    token: token
                                })
                            }
                        })
                    }
                })
            }else{
                res.status(404).json({
                    error: "invalid email or password"
                })
            }
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({
                error: 'error occurred'
            })
        })
}

module.exports = {
    getAllUser,
    signupUser,
    signinUser
}