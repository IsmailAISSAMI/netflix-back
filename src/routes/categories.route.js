const express = require('express');
const router = express.Router();
const category = require('../controllers/category.controller');

router.get('/get/:id', category.getCategory);
router.get('/all/', category.getCategories);
router.post('/createCategory', category.createCategory);
router.put('/edit/:id', category.updateCategory);
router.delete('/delete/:id', category.deleteCategory);

module.exports = router;