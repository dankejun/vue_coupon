<template>
  <el-container>
    <!--主体表格-->
    <el-main>
      <el-row>
        <el-button type="primary" size="small" @click="toAddCoupon">新增优惠券</el-button>
        <el-button size="small">修改优惠券</el-button>
        <el-button size="small">上架</el-button>
        <el-button size="small">下架</el-button>
      </el-row>
      <!--用户表格-->
      <el-table
        ref="couponList"
        :data="couponList"
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
          prop="productName"
          label="优惠券名称">
        </el-table-column>
        <el-table-column
          align="center"
          prop="smallProductImg"
          label="图片">
        </el-table-column>
        <el-table-column
          align="center"
          prop="idMallItem"
          label="商品商城ID">
        </el-table-column>
        <el-table-column
          align="center"
          prop="productOrder"
          label="排序">
        </el-table-column>
        <el-table-column
          align="center"
          prop="productStatus"
          label="上下架状态">
          <template slot-scope="scope">
　　　　　　　　　　<span v-if="scope.row.productStatus===1">上架</span>
　　　　　　　　　　<span v-if="scope.row.productStatus===0">下架</span>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页组件 -->
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="3"
        :pager-count="5"
        :total="30"
        prev-text="上一页"
        next-text="下一页">
      </el-pagination>
    </el-main>
  </el-container>
</template>

<script>
import {getCouponList} from "../api/couponRequest";

export default {
  name: "CouponTable",
  data() {
    return {
      couponList: [],
      multipleSelection: []
    }
  },
  mounted() {
    getCouponList().then(response => {
      this.couponList = response.data.data;
    });
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    toAddCoupon() {
      this.$router.push('/addCoupon')
    }
  }
};
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
</style>
