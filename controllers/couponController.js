const couponService = require('../services/couponService');

const getCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    const coupon = await couponService.getCouponByCode(code);
    if (!coupon) return res.status(404).json({ message: 'Coupon not found or expired' });
    res.json(coupon);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const createCoupon = async (req, res) => {
  try {
    const coupon = await couponService.createCoupon(req.body);
    res.status(201).json(coupon);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// const redeemCoupon = async (req, res) => {
//   try {
//     const { code } = req.params;
//     const userId = req.user.id; // Assuming user is authenticated
//     const coupon = await couponService.redeemCoupon(userId, code);
//     res.json({ message: 'Coupon redeemed successfully', coupon });
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// };

const redeemCoupon = async (req, res) => {
  try {
    const { couponCode } = req.params;

    const coupon = await couponService.redeemCoupon(couponCode);

    res.json({ message: 'Coupon redeemed successfully', coupon });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

const getAllCoupons = async (req, res) => {
  try {
    const coupons = await couponService.getAllCoupons();
    res.json(coupons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteCoupon = async (req, res) => {
  try {
    const { code } = req.params;
    await couponService.deleteCoupon(code);
    res.json({ message: 'Coupon deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

module.exports = {
  getCoupon,
  createCoupon,
  redeemCoupon,
  getAllCoupons,
  deleteCoupon
};
