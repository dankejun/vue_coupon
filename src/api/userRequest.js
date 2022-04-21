import Request from "../utils/request";

export function updateUserStatus(userList) {
  return Request({
    url: '/v1/updateUserStatus',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data:userList
  })
}

export function queryUserInPage(searchRequest, pageIndex, pageSize) {
  return Request({
    url: '/v1/queryUserInPage',
    method: 'post',
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize
    },
    headers: {
      'Content-Type': 'application/json'
    },
    data: searchRequest
  })
}

export function queryUserDetailsInPage(idActivityInfo, pageIndex, pageSize) {
  return Request({
    url: '/v1/queryUserInfoByIdInPage',
    method: 'post',
    params: {
      idUserInfo: idActivityInfo,
      pageIndex: pageIndex,
      pageSize: pageSize
    }
  })
}
