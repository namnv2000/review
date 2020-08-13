const jwt = require("jsonwebtoken")
const User = require("../modal/user.modal")
const {registerValidation , loginValidation} = require("../auth/validation")

module.exports.login = async function(req, res){
    const{ error } = loginValidation(req.body);
     if(error) return res.status(422).send(error.details[0].message)
    const userLogin = await User.findOne({email: req.body.email});
    if(!userLogin) return res.status(422).send(error.details[0].message)
    const passLogin = await User.findOne({password: req.body.password});
    if(!passLogin) return res.status(422).send(error.details[0].message)
    var token = jwt.sign({_id: userLogin._id}, 'shhhhh')
    // res.header("auth-token", token).send(token);
    res.status(200).send({
        id: userLogin._id,
        email: userLogin.email,
        accessToken: token,
        username: userLogin.name,
        bio: userLogin.bio,
        image: userLogin.image
        });
    };

module.exports.register  = async function(req, res){
    const{ error } = registerValidation(req.body);
    if(error) return res.status(422).send(error.details[0].message)
    const newuser = new User();
    newuser.name = req.body.name
    newuser.email = req.body.email
    newuser.password = req.body.password
    newuser.bio = req.body.bio
    newuser.image = req.body.image
    try{
        const user = await newuser.save()
        res.send(user);
    }catch(err){
        res.status(422).send(err);
    }
};

module.exports.Verify =  function(req, res){
    res.send("demo")
}
// User.findOne({email: req.body.email}).exec((user) =>{
//     var token = jwt.sign({_id: userLogin._id}, 'shhhhh');
//     res.status(200).send({
//     //   id: user._id,
//       username: user.username,
//       email: user.email,
//       accessToken: token
//     });
// });