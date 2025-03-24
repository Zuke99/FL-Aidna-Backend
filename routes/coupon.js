const express = require('express');
const { getCoupon, createCoupon, redeemCoupon, getAllCoupons, deleteCoupon } = require('../controllers/couponController');

const router = express.Router();

router.get('/:code', getCoupon);
router.post('/', createCoupon);
router.post('/redeem/:code', redeemCoupon);
router.get('/', getAllCoupons);
router.delete('/:code', deleteCoupon);

module.exports = router;
