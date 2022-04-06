import Request from "../utils/request";

export function getTaskList () {
  return Request({
    url: '/v1/queryTask',
    method: 'post'
  })
}
