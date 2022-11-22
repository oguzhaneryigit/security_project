const models=require("./models")


const listAllUsers=async(req,res)=>{
    models.Users.findAll()
        .then(result=>{
        res.status(200).send(result)
    })
}
const listUser=async(req,res)=>{

}
module.exports = {
    listAllUsers,
    listUser
}