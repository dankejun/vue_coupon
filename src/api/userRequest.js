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
export function searchUserList(searchRequest) {
  return Request({
    url: '/v1/searchUserList',
    method: 'post',
    headers: {
      'Content-Type': 'application/json'
    },
    data:searchRequest
  })
}

export function queryUserInPage(pageIndex, pageSize) {
  return Request({
    url: '/v1/queryUserInPage',
    method: 'post',
    params: {
      pageIndex: pageIndex,
      pageSize: pageSize
    }
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
