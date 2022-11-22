const {Users} = require("../models")


const listAllUsers = async (req, res) => {
    Users.findAll()
        .then(result => {
            console.log("users listed")
            res.status(200).send(result)
        })
        .catch(error =>{
            console.log(error)

            res.status(400).send()
        })
}
const addUser = async (req, res) => {

    Users.create({ username: "Jane", password: "Doe" })
        .then(result => {
            console.log("user added")

            res.status(200).send(result)
        })
        .catch(error =>{
            console.log(error)
            res.status(400).send()
        })
}
module.exports = {
    listAllUsers,
    addUser
}
