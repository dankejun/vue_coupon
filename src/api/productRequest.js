import Request from "../utils/request";

export function getProductList () {
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

export function queryProductInPage(pageIndex, pageSize) {
  return Request({
    url: '/v1/queryProductInPage',
    method: 'post',
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
  })
}
