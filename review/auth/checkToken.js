module.exports = function(req, res, next){
   const token = req.header('auth-token');
   if(!token) return res.status(422).send("Vui lòng đăng nhập để được truy cập")
   try{
        const checkToken = jwt.verify(token, process.env.SECRET_TOKEN)
       req.user = checkToken
       next()
   }catch(err){
       res.status(422).send('Token không hợp lệ')
   }
}
