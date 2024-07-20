const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const asyncHandler = require('express-async-handler')

//get all users
const getAllUsers = asyncHandler(async(req, res) =>
    {
        const user = await User.find()
        if(user.length === 0)
            {
                return res.status(400).json({ Message : "No users found"})
            }
        res.json(user)
    })


const createNewUser = asyncHandler(async(req, res) =>
    {
        const { username, password, email} = req.body
        if(!username || !password || !email)
            {
                return res.status(400).json({ Message : "All fields are required"})
            }

        const duplicateEmail = await User.findOne({ email })
        if(duplicateEmail)
            {
                return res.status(409).json({ Message : "This email is not available" })
            }
        
        const hashedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync(10))
        
        const userObject = { username, "password" : hashedPassword, email }

        const user = await User.create(userObject)

        if(user)
            {
                res.status(201).json({ Message : `New user with email ${email} created`})
            }
        else
            {
                res.status(400).json({ Message : "Invalid user data"})
            }
    })

const updateUser = asyncHandler(async(req, res) =>
    {
        const { id, username, password, email } = req.body
        if(!id || !email)
            {
                return res.status(400).json({ Message : "Id is required"})
            }
        
        const user = await User.findById(id)
        if(!user)
            {
                return res.status(400).json({ Message : "User not found"})
            }
        
        const duplicateEmail = await User.findOne({email})
        if(duplicateEmail && duplicateEmail._id.toString() !== id)
            {
                return res.status(409).json({ Message : "Duplicate Email"})
            }

        if(username)
            {
                user.username = username        
            }
        
        if(email)
            {
                user.email = email    
            }

        if(password)
            {
                user.password = await bcrypt.hash(password, 10)        
            }

        const updatedUser = await user.save()
        console.log(updatedUser);
        res.status(200).json({ Message : `${updatedUser.username} updated`})
    })

const deleteUser = asyncHandler(async(req, res) =>
{
    const { id } = req.body
    if(!id)
        {
            return res.status(400).json({ message: 'User ID Required' })
        }

    const user = await User.findById(id)
    if(!user)
        {
            return res.status(400).json({ message: 'User not found' })
        }
    await user.deleteOne()
    res.status(200).json({ message: `${user.email} deleted` })

})
module.exports = 
{
    getAllUsers,
    createNewUser,
    updateUser,
    deleteUser
}