const User = require('../models/UserModel')
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require('./JwtService')

const createUser = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, confirmPassword, phone} = newUser
        try {
            // Check trùng email
            const checkUser = await User.findOne({
                email:email
            })
            if(checkUser === null) {
                resolve({
                    status:"ERR",
                    message:"The email is exist "
                })
            }
            // Mã hóa password
            const hash = bcrypt.hashSync(password, 10);
            console.log("hash", hash)
            const createUser = await User.create({
                name, email, password : hash, confirmPassword: hash, phone
            })
            if(createUser) {
                resolve({
                    status:"OK",
                    message:"SUCCESS",
                    data: createUser
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}
const createUserAdmin = (newUser) => {
    return new Promise(async (resolve, reject) => {
        const {name, email, password, phone,isAdmin, address, image} = newUser
        try {
            // Check trùng email
            const checkUser = await User.findOne({
                email:email
            })
            console.log("checkUser", checkUser)
            if( checkUser && checkUser === null) {
                resolve({
                    status:"ERR",
                    message:"Email đã tồn tại"
                })
            }
            // Mã hóa password
            const hash = bcrypt.hashSync(password, 10);
            const createUser = await User.create({
                name, email, password : hash, confirmPassword: hash, phone,isAdmin, address, image
            })
            console.log("checkUser",createUser)
      
            if(createUser) {
                resolve({
                    status:"OK",
                    message:"SUCCESS",
                    data: createUser
                })
            }
        } catch(e) {
            reject(e)
        }
    })
}
const loginUser = (userLogin) => {
    return new Promise(async (resolve, reject) => {
        const { email, password} = userLogin
        try {
            // Check trùng email
            const checkUser = await User.findOne({
                email:email
            })
            console.log("checkUser",checkUser)
            if(checkUser === null) {
                reject({
                    status:"ERR",
                    message:"The user is not defined "
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)
            console.log("comparePassword",comparePassword)
            if(!comparePassword ) {
                resolve({
                    status:"OK",
                    message:"The password or user is incorrect",
                    access_token,
                    refresh_token
                })
            }
           
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status:"OK",
                message:"Login success",
                access_token,
                refresh_token
            })
        } catch(e) {
            reject(e)
        }
    })
}
const updateUser = (id,data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if(checkUser === null) {
                resolve({
                    status:"Error",
                    message:"The user is not defined "
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, {new: true})
            resolve({
                status:"success",
                message:"Update user success",
                data: updatedUser
            })
        } catch(e) {
            reject(e)
        }
    })
}
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })

            if(checkUser === null) {
                resolve({
                    status:"OK",
                    message:"The user is not defined "
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status:"OK",
                message:"Delete user success",
            })
        } catch(e) {
            reject(e)
        }
    })
}
const  deleteManyUser = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await User.deleteMany({_id: ids})
            resolve({
                status:"OK",
                message:"Delete user success",
            })
        } catch(e) {
            reject(e)
        }
    })
}
const getAllUser = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allUser = await User.find()
            resolve({
                status:"OK",
                message:"get all user success",
                data: allUser
            })
        } catch(e) {
            reject(e)
        }
    })
}
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })

            if(user === null) {
                resolve({
                    status:"OK",
                    message:"The user is not defined "
                })
            }
            resolve({
                status:"OK",
                message:"get detail user success",
                data: user
            })
        } catch(e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    createUserAdmin,
    deleteManyUser
}