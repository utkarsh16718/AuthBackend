const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


const signUp = async (req, res) => {
    const { email, name, password } = req.body
    try {
        const findUser = await User.findOne({ email  })
        if (findUser) {
            return res.status(404).json("User Already Available")
        }
        const hashpassword = await bcrypt.hash(password, 10)
        const user = await User.create({ email, name, password: hashpassword })
        if (user)
            return res.status(200).json(user)
    }
    catch (error) {
        return res.status(404).json(error)
    }

}


const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const findUser = await User.findOne({ email })
        if (!findUser) {
            return res.status(404).json("Invalid EmailID")
        }
        const validpass = await bcrypt.compare(password, findUser.password)
        if (!validpass) {
            return res.status(404).json("Invalid Password")
        }
      
        
        const token = jwt.sign({ id: findUser._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
        res.cookie(findUser.id, token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 3000),
            httpOnly: true,
            sameSite: "lax"

        })


        return res.status(200).json({ Message: "Success", token })
    } catch (error) {
        return res.status(404).json(error)
    }


}

module.exports = { signUp, login }