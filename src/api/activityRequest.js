import Request from "../utils/request";

export function getActivityList() {
  return Request({
    url: '/v1/queryActivity',
    method: 'post'
  })
}

export function updateActivityStatus(idActivityInfo, status) {
  return Request({
    url: '/v1/updateActivityStatus',
    method: 'post',
    params: {
      idActivityInfo: idActivityInfo,
      status: status
    }
  })
}
