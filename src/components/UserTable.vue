<template>
  <el-container>
    <!--头部搜索-->
    <el-header>
      <el-form size="small" :inline="true" :model="searchRequest" style="text-align: center" class="demo-form-inline">
        <el-form-item label="用户ID">
          <el-input style="width: 200px" v-model="searchRequest.idUserInfo" placeholder="用户ID"></el-input>
        </el-form-item>

        <el-form-item label="用户昵称">
          <el-input style="width: 200px" v-model="searchRequest.userName" placeholder="用户昵称"></el-input>
        </el-form-item>

        <el-form-item label="是否兑换耗材">
          <el-select style="width: 100px" v-model="searchRequest.exchangedFlag" placeholder="是否兑换耗材">
            <el-option label="是" value=1></el-option>
            <el-option label="否" value=0></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="上次兑换商品名称">
          <el-input disabled style="width: 200px" v-model="searchRequest.lastExchangeName" placeholder="上次兑换商品名称"></el-input>
        </el-form-item>
        <el-form-item label="登陆时间">
          <div class="block">
            <el-date-picker
              v-model="searchRequest.lastVisitTime"
              type="date"
              placeholder="选择日期"
              value-format="yyyy-MM-dd"
              style="width: 200px">
            </el-date-picker>
          </div>
        </el-form-item>
        <br>
        <div style="text-align: center">
          <el-form-item>
            <el-button type="primary" @click="searchUserList">查询</el-button>
            <el-button @click="resetList">重置</el-button>
          </el-form-item>
        </div>
      </el-form>
    </el-header>
    <!--主体表格-->
    <el-main>
      <el-row>
        <el-button type="primary" size="small" @click="updateStatus(0)">限制参与活动</el-button>
        <el-button size="small" @click="updateStatus(1)">解除限制</el-button>
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
          <template slot-scope="scope">
            　　　　　　　　　　<span v-if="scope.row.exchangedFlag===1">是</span>
            　　　　　　　　　　<span v-if="scope.row.exchangedFlag===0">否</span>
          </template>
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
            <el-button type="text" size="small" @click="queryUserInfoByIdInPage(scope.row)">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size=userListPage.pageSize
        :pager-count="5"
        :total=userListPage.total
        :page-count=userListPage.pages
        :current-page.sync=userListPage.pageIndex
        @current-change="getUserListPage(userListPage.pageIndex)"
        @next-click="getUserListPage(userListPage.pageIndex + 1)"
        @prev-click="getUserListPage(userListPage.pageIndex - 1)"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </el-main>
      <!--用户详情-->
    <el-drawer
      title="用户详情"
      :visible.sync="drawer"
      direction="ltr"
      size="45%"
      :withHeader=false>
      <el-descriptions class="margin-top" title="用户详情" :column="2" direction="horizontal">
        <el-descriptions-item label="用户昵称" :span="1">{{ userDetails.userName }}</el-descriptions-item>
        <el-descriptions-item label="用户状态" :span="2">{{ userDetails.status === 1 ? '正常' : '限制' }}</el-descriptions-item>
        <el-descriptions-item label="用户ID" :span="2">{{ userDetails.idUserInfo }}</el-descriptions-item>
        <el-descriptions-item label="拥有水滴" :span="1">{{ userDetails.dripCount }}</el-descriptions-item>
        <el-descriptions-item label="今日获取水滴" :span="2">{{ userDetails.todayDripCount }}</el-descriptions-item>
        <el-descriptions-item label="最近登陆时间" :span="1">{{ userDetails.lastVisitTime }}</el-descriptions-item>
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
          prop="productName,couponName,requiredDrip,smallProductImg"
          label="兑换商品">
          <template slot-scope="scope">
            <el-image style="width: 60px; height: 40px" :src="scope.row.smallProductImg"
                      :preview-src-list="[scope.row.smallProductImg]">
              <div slot="error" class="image-slot">
                <i class="el-icon-picture-outline"></i>
              </div>
            </el-image>
            <span>{{ scope.row.productName }}-{{ scope.row.couponName }}<br></span>
            <span style="color:#d67440;">{{ scope.row.requiredDrip }}水滴</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
          background
          layout="prev, pager, next"
          :page-size=userDetailsPage.pageSize
          :pager-count="5"
          :total=userDetailsPage.total
          :page-count=userDetailsPage.pages
          :current-page.sync=userDetailsPage.pageIndex
          @current-change="getUserDetailsPage(userDetailsPage.pageIndex)"
          @next-click="getUserDetailsPage(userDetailsPage.pageIndex + 1)"
          @prev-click="getUserDetailsPage(userDetailsPage.pageIndex - 1)"
          prev-text="上一页"
          next-text="下一页">
        </el-pagination>
    </el-drawer>
  </el-container>
</template>

<script>
import {
  queryUserDetailsById, queryUserDetailsInPage,
  queryUserInPage,
  searchUserList,
  updateUserStatus
} from "../api/userRequest";

export default {
  name: 'UserTable',
  data() {
    return {
      drawer: false,
      userList: [],
      searchRequest: {},
      userDetails: {},
      multipleSelection: [],
      userListPage: {
        pageIndex: 0,
        pageSize: 0,
        pages: 0,
        total: 0
      },
      userDetailsPage: {
        pageIndex: 0,
        pageSize: 0,
        pages: 0,
        total: 0
      }

    };
  },
  mounted() {
    this.getUserListPage();
  },
  methods: {
    indexMethod(index) {
      return index + 1;
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    onSubmit() {
      console.log('submit!');
    },
    resetList() {
      this.searchRequest = {}
    },
    queryUserInfoById(row) {
      this.drawer = true;
      queryUserDetailsById(row.idUserInfo).then(response => (this.userDetails = response.data.data))
    },
    queryUserInfoByIdInPage(row) {
      this.drawer = true;
      this.userDetails.idUserInfo = row.idUserInfo
      this.getUserDetailsPage()
    },
    updateStatus(status) {
      let userList = [];
      for (let selection of this.multipleSelection) {
        if (selection.status !== status) {
          selection.status = status;
          userList.push(selection);
        }
      }
      if (userList.length !== 0) {
        updateUserStatus(userList).then(response => {
          if (response.data === true) {
            location.reload()
          }
        });
      }
    },
    searchUserList() {
      if (this.searchRequest != null) {
        searchUserList(this.searchRequest).then(response =>{
          this.userList = response.data.data;
        });
      }
    },
    getUserListPage(pageIndex) {
      queryUserInPage(pageIndex).then(response => {
        let responseData = response.data.data
        this.userList = responseData.userList;
        this.userListPage.total = responseData.total;
        this.userListPage.pages = responseData.pages;
        this.userListPage.pageIndex = responseData.pageIndex;
        this.userListPage.pageSize = responseData.pageSize;
      });
    },
    getUserDetailsPage(pageIndex) {
      queryUserDetailsInPage(this.userDetails.idUserInfo, pageIndex).then(response => {
        let responseData = response.data.data
        this.userDetails = responseData;
        this.userDetailsPage.total = responseData.total;
        this.userDetailsPage.pages = responseData.pages;
        this.userDetailsPage.pageIndex = responseData.pageIndex;
        this.userDetailsPage.pageSize = responseData.pageSize;
      });
    }
  }
}
</script>

<style scoped>
.el-pagination {
  margin-top: 40px;
  text-align: center;
}

.el-row {
  margin-bottom: 30px;
}

.el-header, .el-main {
  margin-top: 50px;
}

.el-descriptions {
  margin: 30px 0 0 20px;
}
</style>
