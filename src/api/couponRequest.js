import Request from "../utils/request";

export function queryCouponListByMId (idMallItem) {
  return Request({
    url: '/v1/queryCouponListByMId',
    method: 'post',
    params:{
      idMallItem: idMallItem
    }
  })
}
export function queryProductDetailsById (idProductInfo) {
  return Request({
    url: '/v1/queryProductDetailsById',
    method: 'post',
    params:{
      idProductInfo: idProductInfo
    }
  })
}
export function getOssInfo () {
  return Request({
    url: '/v1/getOssInfo',
    method: 'post'
  })
}
export function imgUpload (file) {
  return Request({
    url: '/v1/imgUpload',
    method: 'post',
    data: file
  })
}
export function imgDelete (ImgDeleteRequest) {
  return Request({
    url: '/v1/imgDelete',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: ImgDeleteRequest
  })
}
