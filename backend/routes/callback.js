var express = require('express');
var router = express.Router();
var axios = require('axios');

const client_id = "61a7307350a569b629320ac8c7ed7a3f8b72312e13306a002a3e4b52d039053b";
const client_secret = "a3e76671aa35c05b442566339ebd7d5da3a26a42066fa4525cc8ac64cb8b01d8";

/* GET /auth/coinbase/callback page. */
router.get('/', function(req, result, next) {
    var data = {
        grant_type: 'authorization_code',
        code: req.query.code,
        client_id: client_id,
        client_secret: client_secret,
        redirect_uri: 'http://localhost:3000/auth/coinbase/callback'
    };

    axios.post('https://api.coinbase.com/oauth/token', data)
        .then((res) => {
            result.send(res.data);
        })
        .catch((error) => {
            result.status(error.response.status).send(error.response.data);
        });
});

module.exports = router;
