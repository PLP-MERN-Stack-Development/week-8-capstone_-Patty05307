const controllers = require('../controllers/main');
const express = require('express');
const router = express.Router();

router.get('/', controllers.getHome)
router.get('/enroll',controllers.getEnroll)
router.post('/enroll',controllers.postEnroll)
router.get('/find', controllers.getAll )
router.get('/technician', controllers.queryUser)
router.delete('/delete/:id',controllers.deleteUsers)

module.exports = router;