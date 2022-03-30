<template>
  <el-container>
    <!--主体表格-->
    <el-main>
      <el-row>
        <el-button size="small">上架</el-button>
        <el-button size="small">下架</el-button>
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
          prop="status"
          label="上下架状态">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import {getActivityList} from "../api/activityRequest";

export default {
  name: "ActivityTable",
  data() {
    const activity = {
      activityName: '洗衣攒水滴',
      beginTime: '2022-04-01',
      endTime: "待定",
      status: '上架'
    }
    return {
      activityList: Array(5).fill(activity),
      // activityList: [],
      multipleSelection: []
    }
  },
  mounted() {
    getActivityList().then(response => (this.activityList = response.data))
  },
  methods:{
    handleSelectionChange(val) {
      this.multipleSelection = val
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