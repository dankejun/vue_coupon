<template>
  <el-container>
    <!--头部搜索-->
    <el-header>
      <el-form size="small" :inline="true" :model="formInline" class="demo-form-inline">
        <el-form-item label="用户ID">
          <el-input style="width: 120px" v-model="formInline.user" placeholder="用户ID"></el-input>
        </el-form-item>

        <el-form-item label="用户昵称">
          <el-input style="width: 90px" v-model="formInline.user" placeholder="用户昵称"></el-input>
        </el-form-item>

        <el-form-item label="是否兑换耗材">
          <el-select style="width: 60px" v-model="formInline.region" placeholder="是否兑换耗材">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上次兑换商品名称">
          <el-input style="width: 150px" v-model="formInline.user" placeholder="上次兑换商品名称"></el-input>
        </el-form-item>
        <el-form-item label="登陆时间">
<!--          <el-input style="width: 155px" v-model="formInline.user" placeholder="登陆时间"></el-input>-->
          <div class="block">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期"
              style="width: 130px">
            </el-date-picker>
          </div>
        </el-form-item>
        <br>
        <div style="text-align: center">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button >重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-header>
    <!--主题表格-->
    <el-main>
      <el-row>
        <el-button type="primary" size="small">限制参与活动</el-button>
        <el-button size="small">解除限制</el-button>
      </el-row>
      <!--用户表格-->
      <el-table
        ref="multipleTable"
        :data="tableData"
        stripe
        border
        style="width: 100%;font-size: x-small"
        :index="indexMethod"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          align="center"
          type="index"
          :index="indexMethod"
          label="序号">
        </el-table-column>
        <el-table-column
          align="center"
          prop="userName"
          label="用户名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="userId"
          label="用户ID">
        </el-table-column>
        <el-table-column
          align="center"
          prop="dripCount"
          label="拥有水滴">
        </el-table-column>
        <el-table-column
          align="center"
          prop="yesDripCount"
          label="昨天获取水滴">
        </el-table-column>
        <el-table-column
          align="center"
          prop="exchangeFlag"
          label="是否兑换耗材">
        </el-table-column>
        <el-table-column
          align="center"
          prop="lastExchangeName"
          label="上次兑换商品名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="lastExchangeDate"
          label="上次兑换商品时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="userStatus"
          label="用户账号状态">
        </el-table-column>
        <el-table-column
          align="center"
          prop="lastLoginDate"
          label="最近登陆时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="userDetails"
          label="详情">
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
          background
          layout="prev, pager, next"
          page-size="3"
          pager-count="4"
          :total="30"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'UserTable',
  data() {
    return {
      tableData: [
        {
        userName: '周杰伦',
        userId: '0001',
        dripCount: 8999,
        yesDripCount: 500,
        exchangeFlag: '是',
        lastExchangeName: '小天鹅除菌洗衣液3kg',
        lastExchangeDate: '2021-11-29',
        userStatus: '正常',
        lastLoginDate: '2021-11-29'
      },
        {
          userName: '周杰伦',
          userId: '0001',
          dripCount: 8999,
          yesDripCount: 500,
          exchangeFlag: '是',
          lastExchangeName: '小天鹅除菌洗衣液3kg',
          lastExchangeDate: '2021-11-29',
          userStatus: '正常',
          lastLoginDate: '2021-11-29'
        },
        {
          userName: '周杰伦',
          userId: '0001',
          dripCount: 8999,
          yesDripCount: 500,
          exchangeFlag: '是',
          lastExchangeName: '小天鹅除菌洗衣液3kg',
          lastExchangeDate: '2021-11-29',
          userStatus: '正常',
          lastLoginDate: '2021-11-29'
        },
        {
          userName: '周杰伦',
          userId: '0001',
          dripCount: 8999,
          yesDripCount: 500,
          exchangeFlag: '是',
          lastExchangeName: '小天鹅除菌洗衣液3kg',
          lastExchangeDate: '2021-11-29',
          userStatus: '正常',
          lastLoginDate: '2021-11-29'
        }
      ],
      multipleSelection: [],
      formInline: {
        user: '',
        region: ''
      },
      value1:''
    }
  },
  methods: {
    indexMethod(index) {
      return index+1;
    },
    handleSelectionChange (val) {
      this.multipleSelection = val
    },
    onSubmit() {
      console.log('submit!');
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
  margin-bottom: 10px;
}
.el-header,.el-main{
  margin-top: 50px;
}
</style>
