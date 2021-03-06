var express = require('express');
var router = express.Router();
var expressSession = require('express-session');

var users = require('../controllers/users_controller');
console.log("before / Route");
router.get('/', function(req, res){
    console.log("/ Route");
//    console.log(req);
    console.log(req.session);
    if (req.session.user) {
      console.log("/ Route if user");
      res.render('index', {username: req.session.username,
                           msg:req.session.msg,
                           color:req.session.color,
                           screen_name:req.session.screen_name,
                           high_score:req.session.high_score});
      console.log("new high score rendered: " + req.session.high_score);
    } else {
      console.log("/ Route else user");
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
router.get('/user', function(req, res){
    console.log("/user Route");
    if (req.session.user) {
      res.render('user', {msg:req.session.msg});
    } else {
      req.session.msg = 'Access denied!';
      res.redirect('/login');
    }
});
// router.get('/game', function(req, res){
//     console.log("/game Route");
//     if (req.session.user) {
//       res.render('user', {msg:req.session.msg});
//     } else {
//       req.session.msg = 'Access denied!';
//       res.redirect('/login');
//     }
// });
router.get('/signup', function(req, res){
    console.log("/signup Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('signup', {msg:req.session.msg});
});
router.get('/login',  function(req, res){
    console.log("/login Route");
    if(req.session.user){
      res.redirect('/');
    }
    res.render('login', {msg:req.session.msg});
});
router.get('/logout', function(req, res){
    console.log("/logout Route");
    req.session.destroy(function(){
      res.redirect('/login');
    });
  });
// router.get('/user/updateHighScore/:router_id/increment', function(req, res){
//   router.update({_id: req.params.router_id}, { $inc: {high_score: 1} } ),
// function(err,doc){
// }})

router.post('/signup', users.signup);
router.post('/user/updateHighScore', users.updateHighScore);
router.post('/user/update', users.updateUser);
router.post('/user/delete', users.deleteUser);
router.post('/login', users.login);
router.get('/user/profile', users.getUserProfile);


module.exports = router;