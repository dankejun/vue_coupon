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
