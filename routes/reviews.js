const reviewController = require('../controllers/reviews');
const express = require("express");
const router = express.Router();

// POST - /getReviews
router.post('/getReviews',reviewController.getReviewData)

module.exports = router;