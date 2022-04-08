import Request from "../utils/request";

export function getUserList () {
  return Request({
    url: '/v1/queryUserList',
    method: 'post'
  })
}
export function queryUserDetailsById(idActivityInfo) {
  return Request({
    url: '/v1/queryUserDetailsById',
    method: 'post',
    params: {
      idUserInfo: idActivityInfo
    }
  })
}
