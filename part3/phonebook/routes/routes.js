const express = require('express')
const router = express.Router();
const personController = require('../controllers/personsController');


router.get('/', personController.getAll)
router.get('/persons', personController.getAll)
router.post('/persons',personController.addPerson)
router.delete('/persons/:id', personController.deletePerson)
router.put('/persons/:id', personController.updatePerson)

module.exports = router;