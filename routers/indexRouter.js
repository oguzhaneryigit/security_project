const express=require('express');
const {login} = require("../services/userService");
const router = express.Router();

router.post('/login',async (req,res,next)=>{
    login(req,res)
})
router.post("/register", loginBodyValidator)

router.get('/resetpassword',async (req,res,next)=>{
    //login kodları
})

router.get('/confirmation/:token', async (req, res) => {
    try {
      const { user: { id } } = jwt.verify(req.params.token, EMAIL_SECRET);
      await models.User.update({ status: true }, { where: { id } });
    } catch (e) {
      res.send('error');
    }
  
    return res.redirect('http://localhost:3000/login');
  });
module.exports = router