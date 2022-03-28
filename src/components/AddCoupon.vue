<template>
  <el-container>
    <el-main>
      <h1 style="font-size:30px;margin-left: 50px">新增优惠券</h1>
      <el-form size="small" :model="ruleForm" :rules="rules" ref="ruleForm" label-width="130px" class="demo-ruleForm">
        <el-form-item label="优惠券名称" prop="couponName">
          <el-input v-model="ruleForm.couponName" style="width: 20%"></el-input>
        </el-form-item>
        <el-form-item label="所属商品ID" prop="productId">
          <el-input v-model="ruleForm.name" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="productPrice">
          <el-input v-model="ruleForm.name" style="width: 10%"></el-input> <span> 元</span>
        </el-form-item>
        <el-form-item label="优惠券面额设置">
          <el-table
            :data="tableData"
            border
            size="mini"
            style="width: 50%">
            <el-table-column
              prop="denomination"
              label="优惠券面额"
              width="180">
            </el-table-column>
            <el-table-column
              prop="couponId"
              label="优惠券ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="requiredDrip"
              label="所需水滴">
            </el-table-column>
            <el-table-column
              prop="couponCount"
              label="优惠券数量">
            </el-table-column>
<!--            <el-table-column-->
<!--              label="操作">-->
<!--              <template slot-scope="scope">-->
<!--                <el-button-->
<!--                  @click.native.prevent="deleteRow(scope.$index, tableData)"-->
<!--                  type="text"-->
<!--                  size="small">-->
<!--                  移除-->
<!--                </el-button>-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>
        </el-form-item>

<!--        <el-form-item-->
<!--          v-for="(coupon, index) in ruleForm.coupons"-->
<!--          :label="'域名' + index"-->
<!--          :key="coupon.key"-->
<!--          :prop="'coupons.' + index + '.value'"-->
<!--          :rules="{required: true, message: '域名不能为空', trigger: 'blur'}">-->
<!--          <el-input v-model="coupon.value" style="width: 200px"></el-input><el-button @click.prevent="removeDomain(coupon)">删除</el-button>-->
<!--        </el-form-item>-->
<!--        <el-form-item>-->
<!--          <el-button @click="addDomain">新增域名</el-button>-->
<!--        </el-form-item>-->

        <el-form-item label="排序" prop="sort">
          <el-input v-model="ruleForm.sort" style="width: 10%"></el-input><span style="margin-left: 30px;color: darkgray">排序值范围0-9999，默认为0，排序值越大，排序越靠前，当排序值相同时，按上传时间顺序排序。</span>
        </el-form-item>
        <el-form-item label="兑换说明" prop="description">
          <el-input type="textarea" v-model="ruleForm.description" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="上架状态" prop="status">
          <el-switch v-model="ruleForm.status" active-color="#2B2B2CFF"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')">确定提交</el-button>
          <el-button @click="retCouponTable">返回列表</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: "AddCoupon",
  data() {
    return {
      ruleForm: {
        name: '',
        region: '',
        coupons: [
          {
          denomination: '10元优惠券',
          couponId: 'xxxx',
          requiredDrip: 1000,
          couponCount: 100
        },
          {
            denomination: '10元优惠券',
            couponId: 'xxxx',
            requiredDrip: 1000,
            couponCount: 100
          },
          {
            denomination: '10元优惠券',
            couponId: 'xxxx',
            requiredDrip: 1000,
            couponCount: 100
          }
        ],
        couponDenomination: '',
        status: true,
        type: [],
        resource: '',
        desc: ''
      },
      rules: {
        couponName: [
          {required: true, message: '请输入活动名称', trigger: 'blur'},
          {min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur'}
        ],
        productId: [
          {required: true, message: '请输入所属商品ID', trigger: 'blur'},
        ],
        productPrice: [
          {required: true, message: '请输入商品原价', trigger: 'blur'},
        ],
        couponDenomination: [
          {required: true, message: '请输入商品原价', trigger: 'blur'},
        ],
        sort: [
          {required: false, message: '请输入排序值', trigger: 'blur'}
        ],
        description: [
          {required: false, message: '请填写优惠券兑换说明', trigger: 'blur'}
        ]
      },
      tableData:[
        {
          denomination: '10元优惠券',
          couponId: 'xxxx',
          requiredDrip: 1000,
          couponCount: 100
        },
        {
          denomination: '10元优惠券',
          couponId: 'xxxx',
          requiredDrip: 1000,
          couponCount: 100
        },
        {
          denomination: '10元优惠券',
          couponId: 'xxxx',
          requiredDrip: 1000,
          couponCount: 100
        }
      ]
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert('submit!');
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
    retCouponTable() {
      this.$router.push('/couponTable')
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    }
  }
}
</script>

<style scoped>

</style>
