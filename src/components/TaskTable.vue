<template>
  <el-container>
    <el-main style="margin-top: 100px">
      <el-table
        :data="tableData"
        stripe
        border
        style="width: 100%;">
        <el-table-column
          align="center"
          prop="id"
          label="任务Id"
          width="180"
        >
        </el-table-column>
        <el-table-column
          align="center"
          prop="name"
          label="任务名称"
          width="180">
        </el-table-column>
        <el-table-column
          align="center"
          prop="count"
          label="奖励水滴数量">
        </el-table-column>
        <el-table-column
          align="center"
          prop="frequency"
          label="频率">
        </el-table-column>
        <el-table-column
          align="center"
          prop="description"
          label="任务说明">
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
export default {
  data() {
    const item = {
      id: "0001",
      name: '使用任意程序',
      count: 100,
      frequency:'每日一次',
      description:'启动并完成程序'
    };
    return {
      tableData: Array(5).fill(item)
    }
  }
}
</script>

<style scoped>
</style>
