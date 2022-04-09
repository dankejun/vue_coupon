import Request from "../utils/request";

export function getCouponList () {
  return Request({
    url: '/v1/queryProduct',
    method: 'post'
  })
}
export function updateProductStatus(productList) {
  return Request({
    url: '/v1/updateProductStatus',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data:productList
  })
}
