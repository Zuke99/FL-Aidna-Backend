const express = require('express');
const { getCoupon, createCoupon, redeemCoupon, getAllCoupons, deleteCoupon, getCouponByEventId } = require('../controllers/couponController');

const router = express.Router();

router.get('/:code', getCoupon);
router.get('/event/:eventId', getCouponByEventId)
router.post('/', createCoupon);
router.post('/redeem/:couponCode', redeemCoupon);
router.get('/', getAllCoupons);
router.delete('/:code', deleteCoupon);

module.exports = router;
