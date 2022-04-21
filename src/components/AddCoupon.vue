<template>
  <el-container>
    <el-main>
      <h1 style="font-size:30px;margin-left: 50px" v-if="this.$route.path.startsWith('/add')">
        <p>新增优惠券</p>
      </h1>
      <h1 style="font-size:30px;margin-left: 50px" v-else>
        <p>修改优惠券</p>
      </h1>
      <el-form size="small" :model="productForm" :rules="rules" ref="productForm" label-width="130px"
               class="demo-ruleForm">
        <el-form-item label="优惠券名称" prop="productName">
          <el-input v-model="productForm.productName" style="width: 20%"></el-input>
        </el-form-item>
        <el-form-item label="缩略图" prop="smallProductImg">
          <OssUploadImg :smallImg="productForm.smallProductImg" :idProductInfo="productForm.idProductInfo"
                        @submitSmallImg="submitSmallImg"
                        ref="OssUploadImg"></OssUploadImg>
          <input type="hidden" v-model="productForm.smallProductImg"></input>
        </el-form-item>
        <el-form-item label="详情图" prop="bigProductImg">
          <OssUploadBigImg :bigProductImg="productForm.bigProductImg" :idProductInfo="productForm.idProductInfo"
                           @submitBigImg="submitBigImg"
                           ref="OssUploadBigImg"></OssUploadBigImg>
          <input type="hidden" v-model="productForm.bigProductImg"></input>
        </el-form-item>
        <el-form-item label="所属商品ID" prop="idMallItem">
          <el-input v-model="productForm.idMallItem" @change="queryCoupon" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="productPrice">
          <el-input v-model="productForm.productPrice" style="width: 10%"></el-input>
          <span> 元</span>
        </el-form-item>
        <el-form-item label="优惠券面额设置" prop="couponList">
          <el-table
            :data="productForm.couponList"
            border
            size="mini"
            style="width: 50%">
            <el-table-column
              prop="couponDenomination"
              label="优惠券面额"
              width="180">
              <template slot-scope="scope">
                {{ scope.row.couponDenomination }}元优惠券
              </template>
            </el-table-column>
            <el-table-column
              prop="idMallObtain"
              label="优惠券领取ID"
              width="180">
            </el-table-column>
            <el-table-column
              prop="requiredDrip"
              label="所需水滴">
            </el-table-column>
            <el-table-column
              prop="couponStock"
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
        <el-form-item label="排序" prop="productOrder">
          <el-input v-model.number="productForm.productOrder" @input="handleSort" style="width: 10%"></el-input>
          <span style="margin-left: 30px;color: darkgray">排序值范围0-9999，默认为0，排序值越大，排序越靠前，当排序值相同时，按上传时间顺序排序。</span>
        </el-form-item>
        <el-form-item label="兑换说明" prop="exchangeDescription">
          <el-input type="textarea" v-model="productForm.exchangeDescription" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="上架状态" prop="productStatus">
          <el-switch v-model="productForm.productStatus" :active-value=1 :inactive-value=0
                     active-color="#2B2B2CFF"></el-switch>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('productForm')">确定提交</el-button>
          <el-button @click="retCouponTable">返回列表</el-button>
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>

<script>
import {queryCouponListByMId} from "../api/couponRequest";
import OssUploadImg from "./OssUploadImg";
import OssUploadBigImg from "./OssUploadBigImg";
import {imgDeleteByPath, queryProductDetailsById, saveOrUpdateProduct} from "../api/productRequest";

export default {
  name: "AddCoupon",
  components: {OssUploadImg, OssUploadBigImg},
  data() {
    return {
      productForm: {
        idProductInfo: '',
        productName: '',
        smallProductImg: '',
        bigProductImg: '',
        idMallItem: '',
        productPrice: '',
        productOrder: 0,
        exchangeDescription: '',
        productStatus: ''
      },
      rules: {
        productName: [{required: true, message: '请输入商品名称', trigger: 'blur'}, {
          whitespace: true,
          message: '名称不能仅含有空格',
          trigger: 'blur'
        }],
        smallProductImg: [{required: true, message: '请上传缩略图到服务器', trigger: 'blur'}],
        bigProductImg: [{required: true, message: '请上传详情图到服务器', trigger: 'blur'}],
        idMallItem: [{required: true, message: '请输入商品ID', trigger: 'blur'}, {
          whitespace: true,
          message: 'ID不能仅含有空格',
          trigger: 'blur'
        }],
        productPrice: [{required: true, message: '请输入商品原价', trigger: 'blur'}, {
          pattern:/^[+-]?(0|([1-9]\d*))(\.\d+)?$/g,message: '商品价格必须是数字', trigger: 'blur'}]
      }
    };
  },
  mounted() {
    if (this.$route.params.id != null) {
      queryProductDetailsById(this.$route.params.id).then(response => {
        this.productForm = response.data.data
        this.queryCoupon()
      });
    }
  },
  // beforeRouteLeave(to, from , next) {
  //   if (!this.$route.path.startsWith('/add')) {
  //     this.retCouponTable()
  //     // next();
  //   } else {
  //     next();
  //   }
  // },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.saveOrUpdateProduct(this.productForm)
        } else {
          this.$message({
            message: '商品必填字段不能为空',
            type: 'warning'
          });
        }
      });
    },
    submitSmallImg(path) {
      this.productForm.smallProductImg = path
    },
    submitBigImg(path) {
      this.productForm.bigProductImg = path
    },
    retCouponTable() {
      this.$confirm('确定退出商品编辑?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (this.$route.path.startsWith('/add')) {
          if (this.productForm.smallProductImg !== '') {
            imgDeleteByPath(this.productForm.smallProductImg);
          }
          if (this.productForm.bigProductImg !== '') {
            imgDeleteByPath(this.productForm.bigProductImg)
          }
          this.$router.push('/couponTable');
        } else {
          this.$router.push('/couponTable');
        }
      }).catch(() => {
        return false;
      });
    },
    deleteRow(index, rows) {
      rows.splice(index, 1);
    },
    handleSort() {
      if ((typeof this.productForm.productOrder) !== "number" || this.productForm.productOrder === '') {
        this.productForm.productOrder = 0;
      }
    },
    queryCoupon() {
      queryCouponListByMId(this.productForm.idMallItem).then(response => {
        this.productForm.couponList = response.data.data;
        this.$forceUpdate()
      })
    },
    saveOrUpdateProduct(productForm) {
      saveOrUpdateProduct(productForm).then(response => {
        if (response.data === true) {
            this.$message({
              message: '编辑商品信息成功',
              type: 'success'
            });
          this.$router.push('/couponTable');
          } else {
            if (this.productForm.smallProductImg !== '') {
              imgDeleteByPath(this.productForm.smallProductImg);
            }
            if (this.productForm.bigProductImg !== '') {
              imgDeleteByPath(this.productForm.bigProductImg)
            }
          }
      })
    }
  }
};
</script>

<style scoped>

</style>
