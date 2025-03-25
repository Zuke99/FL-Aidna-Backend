const Coupon = require('../models/Coupon');
const Event = require('../models/Event');

const getCouponByCode = async (code) => {
  const coupon = await Coupon.findOne({ code });

  if (!coupon) return null;

  // If the coupon is linked to an event, check expiry
  if (coupon.eventId) {
    const event = await Event.findById(coupon.eventId);
    if (event?.startDate && new Date() > new Date(event.startDate)) {
      return null; // Coupon has expired
    }
  }

  return coupon.populate("eventId", "title");
};

const createCoupon = async (data) => {
  if (!data.couponCode || data.couponCode.trim() === "") {
    throw new Error("Coupon code cannot be empty");
  }

  // Check if a coupon with the same code and eventId already exists
  const existingCoupon = await Coupon.findOne({
    couponCode: data.couponCode.toUpperCase(),
    eventId: data.eventId,
  });

  if (existingCoupon) {
    throw new Error("A coupon with this code already exists for the selected event.");
  }

  return await Coupon.create({
    ...data,
    couponLimit: data.limit,
    couponCode: data.couponCode.toUpperCase(), // Ensure consistency
  });
};

// const redeemCoupon = async (userId, code) => {
//   const coupon = await getCouponByCode(code);

//   if (!coupon) throw new Error('Invalid or expired coupon');

//   // Check if the coupon is linked to an event and if the event has already started
//   if (coupon.eventId) {
//     const event = await Event.findById(coupon.eventId);
//     if (event?.startDate && new Date() > new Date(event.startDate)) {
//       throw new Error('Coupon cannot be redeemed as the event has already started');
//     }
//   }

//   const userRedemption = coupon.usersRedeemed.find((u) => u.userId.toString() === userId);

//   if (userRedemption && userRedemption.count >= coupon.limit) {
//     throw new Error('Coupon redemption limit reached for this user');
//   }

//   // Update redemption count
//   if (userRedemption) {
//     userRedemption.count += 1;
//   } else {
//     coupon.usersRedeemed.push({ userId, count: 1 });
//   }

//   await coupon.save();
//   return coupon;
// };

const redeemCoupon = async (code) => {
  console.log(code)
  const coupon = await Coupon.findOne({ couponCode: code });
  console.log(coupon)

  if (coupon.limit <= 0) {
    coupon.isActive = false
    throw new Error('This coupon is expired')
  }

  if (!coupon || !coupon.isActive) throw new Error('Invalid or expired coupon');

  // Check if the coupon is linked to an event and if the event has already started
  if (coupon.eventId) {
    const event = await Event.findById(coupon.eventId);
    if (event?.startDate && new Date() > new Date(event.startDate)) {
      throw new Error('Coupon cannot be redeemed as the event has already started');
    }
  }

  // Update total redemption count
  coupon.limit = (coupon.limit || 0) - 1;

  await coupon.save();
  return coupon;
};


const getAllCoupons = async () => {
  return await Coupon.find().populate("eventId", "title");
};

const deleteCoupon = async (couponCode) => {
  const coupon = await Coupon.findOneAndDelete({ couponCode });

  if (!coupon) {
    throw new Error('Coupon not found');
  }

  return true;
};

module.exports = {
  getCouponByCode,
  createCoupon,
  redeemCoupon,
  getAllCoupons,
  deleteCoupon
};
