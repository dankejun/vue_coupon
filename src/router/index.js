import Vue from 'vue'
import Router from 'vue-router'
import TaskTable from '@/components/TaskTable'
import UserTable from '@/components/UserTable'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/taskTable',
      name: 'TaskTable',
      component: TaskTable
    },
    {
      path: '/userTable',
      name: 'userTable',
      component: UserTable
    }
  ]
})
