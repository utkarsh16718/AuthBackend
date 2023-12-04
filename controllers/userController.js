const User = require('../models/user')


const getUser = async (req, res) => {

    const  id  = req.id

    try {
        const user = await User.findById(id,'-password')

        if (!user) {
            return res.status(404).json({ message: "User not found" });

        }

        return res.status(200).json(user);
    } catch (error) {
        return res.status(404).json(error.message);
    }


}

module.exports = { getUser }