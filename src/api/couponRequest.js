import Request from "../utils/request";

export function getCouponList () {
  return Request({
    url: '/coupon/getCoupon',
    method: 'get'
  })
}
