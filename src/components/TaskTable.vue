<template>
  <el-container>
    <el-main style="margin-top: 100px">
      <el-table
        :data="taskList"
        stripe
        border
        style="width: 100%;">
        <el-table-column
          align="center"
          prop="idTaskInfo"
          label="任务Id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="taskName"
          label="任务名称"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="rewardDripCount"
          label="奖励水滴数量">
        </el-table-column>
        <el-table-column
          align="center"
          prop="taskFrequency"
          label="频率">
        </el-table-column>
        <el-table-column
          align="center"
          prop="taskDescription"
          label="任务说明">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import {getTaskList} from "../api/taskRequest";

export default {
  data() {
    return {
      taskList: []
    }
  },
  mounted() {
    getTaskList().then(response => (this.taskList = response.data.data))
  }
}
</script>

<style scoped>
</style>
