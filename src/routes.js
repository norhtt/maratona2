const express = require ('express');
const routes = express.Router(); // parte do express para criar rotas
const ProfileController = require('./controllers/ProfileController');
const JobController = require('./controllers/JobController');
const DashboarderController = require('./controllers/DashboarderController');
//const views = __dirname + "/views/"  // (__dirname indica que a pasta esa dentro de outra pasta)


//req, res
routes.get('/', DashboarderController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
routes.get('/job/:id', JobController.show)
routes.post('/job/:id', JobController.update)
routes.post('/job/delete/:id', JobController.delete)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)


module.exports = routes;
