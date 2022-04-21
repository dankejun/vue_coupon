import Request from "../utils/request";

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
export function saveOrUpdateProduct(productAddRequest) {
  return Request({
    url: '/v1/saveOrUpdateProduct',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data: productAddRequest
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
export function imgDeleteByPath (filePath) {
  return Request({
    url: '/v1/imgDeleteByPath',
    method: 'post',
    params:{
      filePath: filePath
    }
  })
}
