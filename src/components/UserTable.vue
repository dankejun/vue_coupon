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
          prop="idUserInfo"
          label="用户ID">
        </el-table-column>
        <el-table-column
          align="center"
          prop="dripCount"
          sortable
          label="拥有水滴">
        </el-table-column>
<!--        <el-table-column-->
<!--          align="center"-->
<!--          prop="yestDripCount"-->
<!--          sortable-->
<!--          label="昨天获取水滴">-->
<!--        </el-table-column>-->
        <el-table-column
          align="center"
          prop="exchangedFlag"
          label="是否兑换耗材">
        </el-table-column>
<!--        <el-table-column-->
<!--          align="center"-->
<!--          prop="lastExchangeName"-->
<!--          label="上次兑换商品名称">-->
<!--          <template slot-scope="scope">-->
<!--　　　　　　　　　　<span v-if="scope.row.lastExchangeName===null">—</span>-->
<!--　　　　　　　　　　<span v-else>{{ scope.row.lastExchangeName }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
<!--        <el-table-column-->
<!--          align="center"-->
<!--          prop="lastExchangeTime"-->
<!--          label="上次兑换商品时间">-->
<!--          <template slot-scope="scope">-->
<!--　　　　　　　　　　<span v-if="scope.row.lastExchangeTime===null">—</span>-->
<!--                <span v-else>{{ scope.row.lastExchangeTime }}</span>-->
<!--          </template>-->
<!--        </el-table-column>-->
        <el-table-column
          align="center"
          prop="status"
          label="用户账号状态">
          <template slot-scope="scope">
　　　　　　　　　　<span v-if="scope.row.status===1">正常</span>
　　　　　　　　　　<span v-if="scope.row.status===0">限制</span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="lastVisitTime"
          label="最近登陆时间">
        </el-table-column>
        <el-table-column
          align="center"
          prop="userDetails"
          label="详情">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="queryUserInfoById(scope.row)">查看详情</el-button>
          </template>
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
        <el-descriptions-item label="用户状态" :span="2">
        </el-descriptions-item>
        <el-descriptions-item label="用户ID" :span="2">{{ userDetails.idUserInfo }}</el-descriptions-item>
        <el-descriptions-item label="拥有水滴" :span="1">{{ userDetails.dripCount }}</el-descriptions-item>
        <el-descriptions-item label="今日获取水滴" :span="2">{{ userDetails.todayDripCount }}</el-descriptions-item>
        <el-descriptions-item label="最近登陆时间" :span="1">{{userDetails.lastVisitTime}}</el-descriptions-item>
      </el-descriptions>
      <el-table
        :data="userDetails.exchangeList"
        border
        style="width: 90%;margin-left: 5%">
        <el-table-column
          prop="exchangeTime"
          label="兑换时间">
        </el-table-column>
        <el-table-column
          prop="productName+couponName"
          label="兑换商品">
        </el-table-column>
      </el-table>
    </el-drawer>
  </el-container>
</template>

<script>
import {getUserList, queryUserDetailsById} from "../api/userRequest";
export default {
  name: 'UserTable',
  data() {
    return {
      drawer: false,
      userList: [],
      searchUserList: {
        userId: '',
        userName: '',
        exchangeFlag:'',
        lastExchangeName: '',
        lastLoginTime: ''
      },
      userDetails: {},
      multipleSelection: []
    }
  },
  mounted() {
    getUserList().then(response => (this.userList = response.data.data))
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
    queryUserInfoById(row) {
      this.drawer = true;
      queryUserDetailsById(row.idUserInfo).then(response => (this.userDetails = response.data.data))
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
.el-descriptions{
  margin: 30px 0 0 20px;
}
</style>
