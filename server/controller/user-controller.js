const User = require('./../models/User')
const bcrypt = require('bcrypt')

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

module.exports = {home, signupUser}