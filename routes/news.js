const express = require('express');
const newsController = require('../controllers/newsController');

const router = express.Router()

router.post('/', newsController.createNews);
router.get('/', newsController.getAllNews);
router.get('/:id', newsController.getNewsById);
router.delete('/:id', newsController.deleteNews);
router.put('/:id', newsController.updateNews);

module.exports = router;