var express = require('express');
var router  = express.Router();

var quizController    = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');
var sessionController = require('../controllers/session_controller');
var statisticsController = require('../controllers/statistics_controller');

// Página de entrada (home page) 
router.get('/', function(req, res) {
  res.render('index', { title: 'Quiz', errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId
router.param('commentId', commentController.load);// autoload : commentId

router.get('/author', function(req, res, next) {
  res.render('author', { nombre_autor: 'Jose R. Rojas B.', foto_autor: 'images/autor.jpg', video_autor: 'videos/about_me.mp4', errors: [] });
});


// Definición de rutas de sesion
router.get('/login',  sessionController.new); 		 // formulario login
router.post('/login', sessionController.create);    // crear sesión
router.get('/logout', sessionController.destroy);  // destruir session


// Definición de rutas de /quizes
router.get('/quizes', 					   quizController.index);
router.get('/quizes/:quizId(\\d+)', 	   quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);
router.get('/quizes/new',                  sessionController.loginRequired, quizController.new);
router.post('/quizes/create',              sessionController.loginRequired, quizController.create);
router.get('/quizes/:quizId(\\d+)/edit',   sessionController.loginRequired, quizController.edit);
router.put('/quizes/:quizId(\\d+)',        sessionController.loginRequired, quizController.update);
router.delete('/quizes/:quizId(\\d+)',     sessionController.loginRequired, quizController.destroy);

// Definición de rutas de comentarios
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments',    commentController.create);
router.get('/quizes/:quizId(\\d+)/comments/:commentId(\\d+)/publish', sessionController.loginRequired, commentController.publish);


// Definición de rutas de Estadisticas
router.get('/quizes/statistics', statisticsController.index);


module.exports = router;
