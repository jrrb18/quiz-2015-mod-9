var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Página de entrada (home page) 
router.get('/', function(req, res/*next*/) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

router.get('/author', function(req, res, next) {
  res.render('author', { nombre_autor: 'Jose R. Rojas B.', foto_autor: 'images/autor.jpg', video_autor: 'videos/about_me.mp4' });
});
// Definición de rutas de /quizes
router.get('/quizes', 					   quizController.index);
router.get('/quizes/:quizId(\\d+)', 	   quizController.show);
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer);

module.exports = router;
