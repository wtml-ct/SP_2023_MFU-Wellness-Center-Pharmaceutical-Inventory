const crypto = require('crypto-js')
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const security = {
    password_hash(password) {
        let hash = crypto.SHA256(password)
        return hash.toString(crypto.enc.Hex)
    },
    password_hashPost(req,res) {
        let password = req.body.password
        console.log(password)
        let hash = crypto.SHA256(password)
        if(password === undefined) {
            res.status(500).send({message : "Please Input Password"})
        }else{
            res.json({
                status: 200,
                data: hash.toString(crypto.enc.Hex),
              })
        }
        
    },
    password_verify(password, password_hash) {
        return security.password_hash(password) === password_hash
    },
    generateAccessToken(data) {
        return jwt.sign({data : data}, process.env.TOKEN_SECRET, { expiresIn: '1y' });
    },

    authenticateToken(req, res, next) {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
      
        if (token == null) return res.sendStatus(401)
      
        jwt.verify(token, process.env.TOKEN_SECRET, (err, user) => {
      
          if (err) return res.sendStatus(403)
      
          req.user = user
      
          next()
        })
      },
}
module.exports = security
