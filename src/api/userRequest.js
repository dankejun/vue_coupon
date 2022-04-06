import Request from "../utils/request";

export function getUserList () {
  return Request({
    url: '/user/getUser',
    method: 'get'
  })
}
