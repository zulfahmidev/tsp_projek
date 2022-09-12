const express = require('express');
const router = express.Router();

const { HomeController } = require('./controllers/HomeController.js');
// const { NodeController } = require('./controllers/API/NodeController.js');
// const { GraphController } = require('./controllers/API/GraphController.js');
const { TowerController } = require('./controllers/API/TowerController.js');
const { OfficeController } = require('./controllers/API/OfficeController.js');

router.get('/', HomeController.index);
// router.get('/api/node', NodeController.index);
// router.post('/api/node', NodeController.insert);
// router.delete('/api/node/:id', NodeController.destroy);

// router.get('/api/graph', GraphController.index);
// router.post('/api/graph', GraphController.insert);
// router.post('/api/graph/:id', GraphController.update);
// router.delete('/api/graph/:id', GraphController.destroy);

router.get('/api/tower', TowerController.index);
router.post('/api/import', TowerController.store);
router.get('/api/office', OfficeController.index);

exports.router = router;