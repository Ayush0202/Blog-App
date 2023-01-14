const User = require('./../models/User')
const Token = require('./../models/Token')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()

// basic home route
const home = (req, res) => {
    res.send('HELLO FROM SERVER 8000')
}

const signupUser = async (req, res) => {
    try {
        const salt = await bcrypt.genSalt()
        const hashedPassword = await bcrypt.hash(req.body.password, salt)
        const user = {
            username: req.body.username,
            name: req.body.name,
            password: hashedPassword
        }
        const newUser = new User(user) // validating user
        await newUser.save() // saving user to DB
        return res.status(200).json({msg: 'Signup Successful'})

    } catch (error) {
        res.status(500).json({message: 'Error while signing up user'})
    }
}

const loginUser = async (req, res) => {
    let user = await User.findOne({username: req.body.username})
    if(!user) {
        return res.status(400).json({message: 'Username does not match'})
    }

    try {
        let match = await bcrypt.compare(req.body.password, user.password)
        if(match) {
            // generate access tokens using JWT authentication
            const accessToken = jwt.sign(user.toJSON(), process.env.ACCESS_SECRET_KEY, {expiresIn: '15m'})
            const refreshToken = jwt.sign(user.toJSON(), process.env.REFRESH_SECRET_KEY)

            const newToken = new Token({token: refreshToken}) // refresh token stored in DB
            await newToken.save() // newToken saved in DB

            return res.status(200).json({
                accessToken: accessToken, 
                refreshToken: refreshToken, 
                name: user.name, 
                username: user.username
            })
        }
        else {
            return res.status(400).json({message: 'Password does not match'})
        }

    } catch (error) {
        res.status(500).json({message: 'Error while login in user'})
    }
}

module.exports = {home, signupUser, loginUser}
