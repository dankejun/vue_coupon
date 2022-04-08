import Request from "../utils/request";

export function getCouponList () {
  return Request({
    url: '/v1/queryProduct',
    method: 'post'
  })
}
