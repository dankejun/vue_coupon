import Request from "../utils/request";

export function getActivityList () {
  return Request({
    url: '/activity/getActivity',
    method: 'get'
  })
}
