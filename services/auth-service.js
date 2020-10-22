const axios = require('axios');
const config = require('../config/config.dev.json');

const verifyToken = (req, res, next) => {
  const accessToken = req.headers['authorization'].split(' ')[1];

       let options = {
            method: 'post',
            url: config.AUTH_HOST + '/verify',
            data: {
              refreshToken: req.body.refreshToken,
              email: req.body.email
            },
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer '+ accessToken
              }
          }

        axios(options)
          .then(response => {
              next();
          })
          .catch(err => {
              res.status(401).json({ message: 'Unauthorized' });
              // console.log(err);
          })
    }

module.exports = verifyToken;
