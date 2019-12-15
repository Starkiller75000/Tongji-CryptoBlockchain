var express = require('express');
var router = express.Router();

const client_id = "61a7307350a569b629320ac8c7ed7a3f8b72312e13306a002a3e4b52d039053b";
const redirect_uri = "http://localhost:3000/auth/coinbase/callback";

/* GET /login/coinbase page. */
router.get('/', function(req, res, next) {
    res.redirect(`https://www.coinbase.com/oauth/authorize?response_type=code&client_id=${client_id}&redirect_uri=${redirect_uri}`);
});

module.exports = router;
