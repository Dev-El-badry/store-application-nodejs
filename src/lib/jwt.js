const jwt = require('jsonwebtoken');

function signin(payload) {
    return new Promise ((resolve, reject) => {
      
        jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: '1d'
        }, (error, token) => {
            if(error) return reject(error);
            return resolve(token);
        });
    });
}

module.exports = {
    signin,
};