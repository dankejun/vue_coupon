<template>
  <el-container style="height: 100%; border: 1px solid #eee">
    <el-aside style="width:200px;background-color: rgb(238, 241, 246)">
      <el-menu :default-openeds="['1']" router>
          <div id="activityTitle"><i class="el-icon-picture-outline" style="font-size: 35px;"></i> 水滴后台管理</div>
          <el-menu-item-group>
            <el-menu-item index="/taskTable">任务管理</el-menu-item>
            <el-menu-item index="/userTable">用户管理</el-menu-item>
            <el-menu-item index="/couponTable">优惠券管理</el-menu-item>
            <el-menu-item index="/activityTable">活动管理</el-menu-item>
          </el-menu-item-group>
      </el-menu>
    </el-aside>
        <router-view></router-view>
  </el-container>
</template>

<script>
export default {

};
</script>

<style>
.el-menu{
  height: 100%;
  background-color: lightgray;
}
.el-menu-item{
  font-size: large;
  text-align: center;
}
#activityTitle{
  font-size: large;
  font-weight: bold;
  text-align: center;
  padding-top: 20px;
}
</style>
