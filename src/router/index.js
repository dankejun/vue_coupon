import Vue from 'vue'
import Router from 'vue-router'
import TaskTable from '@/components/TaskTable'
import UserTable from '@/components/UserTable'
import CouponTable from "@/components/CouponTable";
import ActivityTable from "@/components/ActivityTable";
import AddCoupon from "@/components/AddCoupon";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: {path: 'TaskTable'}
    },
    {
      path: '/taskTable',
      name: 'TaskTable',
      component: TaskTable
    },
    {
      path: '/userTable',
      name: 'userTable',
      component: UserTable
    },
    {
      path: '/couponTable',
      name: 'couponTable',
      component: CouponTable
    },
    {
      path: '/activityTable',
      name: 'activityTable',
      component: ActivityTable
    },
    {
      path: '/updateProduct/:id',
      name: 'updateProduct',
      component: AddCoupon
    },
    {
      path: '/addProduct',
      name: 'addProduct',
      component: AddCoupon
    }
  ]
})
