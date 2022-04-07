<template>
  <el-container>
    <!--主体表格-->
    <el-main>
      <el-row>
        <el-button size="small" @click="updateStatus(true)">上架</el-button>
        <el-button size="small" @click="updateStatus(false)">下架</el-button>
      </el-row>
      <!--用户表格-->
      <el-table
        ref="activityList"
        :data="activityList"
        stripe
        border
        style="width: 100%;font-size: x-small"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          prop="activityName"
          label="活动名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="beginTime"
          label="活动开始时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="endTime"
          label="活动结束时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="activityStatus"
          label="上下架状态">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import {getActivityList, updateActivityStatus} from "../api/activityRequest";

export default {
  name: "ActivityTable",
  inject: ["reload"],
  data() {
    return {
      activityList: [],
      multipleSelection: []
    }
  },
  mounted() {
    getActivityList().then(response => {
      for (let activity of response.data.data) {
        if (activity.activityStatus === 1) {
          activity.activityStatus = "上架";
        } else {
          activity.activityStatus = "下架";
        }
      }
      this.activityList = response.data.data;
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    updateStatus(status) {
      for (let selection of this.multipleSelection) {
        let id = selection.idActivityInfo
        updateActivityStatus(id, status);
      }
      location.reload()
    }
  }
}
</script>

<style scoped>
.el-pagination{
  margin-top: 40px;
  text-align: center;
}
.el-row{
  margin-bottom: 30px;
}
.el-header,.el-main{
  margin-top: 50px;
}
.el-button{
  width: 100px;
}
</style>
