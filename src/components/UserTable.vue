<template>
  <el-container>
    <!--头部搜索-->
    <el-header>
      <el-form size="small" :inline="true" :model="searchUserList" class="demo-form-inline">
        <el-form-item label="用户ID">
          <el-input style="width: 200px" v-model="searchUserList.userId" placeholder="用户ID"></el-input>
        </el-form-item>

        <el-form-item label="用户昵称">
          <el-input style="width: 200px" v-model="searchUserList.userName" placeholder="用户昵称"></el-input>
        </el-form-item>

        <el-form-item label="是否兑换耗材">
          <el-select style="width: 100px" v-model="searchUserList.exchangeFlag" placeholder="是否兑换耗材">
            <el-option label="是" value="shanghai"></el-option>
            <el-option label="否" value="beijing"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上次兑换商品名称">
          <el-input style="width: 200px" v-model="searchUserList.lastExchangeName" placeholder="上次兑换商品名称"></el-input>
        </el-form-item>
        <el-form-item label="登陆时间">
          <div class="block">
            <el-date-picker
              v-model="searchUserList.lastLoginTime"
              type="date"
              placeholder="选择日期"
              style="width: 200px">
            </el-date-picker>
          </div>
        </el-form-item>
        <br>
        <div style="text-align: center">
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button @click="resetList">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-header>
    <!--主体表格-->
    <el-main>
      <el-row>
        <el-button type="primary" size="small">限制参与活动</el-button>
        <el-button size="small">解除限制</el-button>
      </el-row>
      <!--用户表格-->
      <el-table
        ref="userList"
        :data="userList"
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
          sortable
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
          <el-button type="text" size="small" @click="drawer = true">查看详情</el-button>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
          background
          :page-size="3"
          :pager-count="5"
          layout="prev, pager, next"
          :total="15">
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
    </el-main>
    <el-drawer
      title="用户详情"
      :visible.sync="drawer"
      direction="ltr"
      :withHeader=false>
      <el-descriptions class="margin-top" title="用户详情" :column="2" direction="horizontal">
        <el-descriptions-item label="用户昵称" :span="1">{{userDetails.userName}}</el-descriptions-item>
        <el-descriptions-item label="用户状态" :span="2">{{userDetails.status}}</el-descriptions-item>
        <el-descriptions-item label="用户ID" :span="2">{{ userDetails.userId }}</el-descriptions-item>
        <el-descriptions-item label="拥有水滴" :span="1">{{ userDetails.dripCount }}</el-descriptions-item>
        <el-descriptions-item label="今日获取水滴" :span="2">{{ userDetails.todayDripCount }}</el-descriptions-item>
        <el-descriptions-item label="最近登陆时间" :span="1">{{userDetails.lastLoginTime}}</el-descriptions-item>
          <el-table
            :data="userDetails.exchangeInfo"
            border
            style="width: 90%;margin-left: 5%">
            <el-table-column
              prop="exchangeTime"
              label="兑换时间">
            </el-table-column>
            <el-table-column
              prop="exchangeName"
              label="兑换商品">
            </el-table-column>
          </el-table>
      </el-descriptions>
    </el-drawer>
  </el-container>
</template>

<script>
import {getUserList} from "../api/userRequest";
export default {
  name: 'UserTable',
  data() {
    const userInfo = {
      userName: '周杰伦',
      userId: '0001',
      dripCount: 8999,
      yesDripCount: 500,
      exchangeFlag: '是',
      lastExchangeName: '小天鹅除菌洗衣液3kg',
      lastExchangeDate: '2021-11-29',
      userStatus: '正常',
      lastLoginDate: '2021-11-29'
    };
    return {
      drawer: false,
      userList: Array(5).fill(userInfo),
      searchUserList: {
        userId: '',
        userName: '',
        exchangeFlag:'',
        lastExchangeName: '',
        lastLoginTime: ''
      },
      userDetails: {
        userName: '周杰伦',
        status: '正常',
        userId: '00001',
        dripCount: 8999,
        todayDripCount: 500,
        lastLoginTime: '2022-01-12',
        exchangeInfo:
          [
            {
              exchangeTime: '2022-3-28',
              exchangeName: '小天鹅3kg洗衣机-25元优惠券'
            }
          ]
      },
      multipleSelection: []
    }
  },
  mounted() {
    getUserList().then(response => (this.taskList = response.data))
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
    },
    resetList() {
      this.searchUserList={}
    },
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
.el-descriptions{
  margin: 30px 0 0 20px;
}
</style>
