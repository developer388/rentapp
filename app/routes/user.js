var express = require('express');
var router  = express.Router();

router.get('/info', function (req,res) {
	res.json({success:true, type:'user'});
})

module.exports = router;