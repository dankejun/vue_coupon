<template>
  <el-container>
    <el-main>
      <h1 style="font-size:30px;margin-left: 50px">新增优惠券</h1>
      <el-form size="small" :model="productForm" :rules="rules" ref="productForm" label-width="130px"
               class="demo-ruleForm">
        <el-form-item label="优惠券名称" prop="productName">
          <el-input v-model="productForm.productName" style="width: 20%"></el-input>
        </el-form-item>
        <el-form-item label="缩略图" prop="productSmallImg">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit=1
            :on-exceed="handleExceed">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
            <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
            <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
            </div>
            <div class="el-upload__tip" slot="tip" style="color: darkgray">图片格式：png、jpg、jpeg，图片大小不超过5M</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="详情图" prop="productBigImg">
          <el-upload
            action="#"
            list-type="picture-card"
            :auto-upload="false"
            :limit=1
            :on-exceed="handleExceed">
            <i slot="default" class="el-icon-plus"></i>
            <div slot="file" slot-scope="{file}">
              <img class="el-upload-list__item-thumbnail" :src="file.url" alt="">
              <span class="el-upload-list__item-actions">
              <span
                class="el-upload-list__item-preview"
                @click="handlePictureCardPreview(file)">
                <i class="el-icon-zoom-in"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleDownload(file)">
                <i class="el-icon-download"></i>
              </span>
              <span
                v-if="!disabled"
                class="el-upload-list__item-delete"
                @click="handleRemove(file)">
                <i class="el-icon-delete"></i>
              </span>
            </span>
            </div>
            <div class="el-upload__tip" slot="tip" style="color: darkgray">图片格式：png、jpg、jpeg，图片大小不超过5M</div>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="">
          </el-dialog>
        </el-form-item>
        <el-form-item label="所属商品ID" prop="productId">
          <el-input v-model="productForm.productId" style="width: 50%"></el-input>
        </el-form-item>
        <el-form-item label="商品原价" prop="price">
          <el-input v-model.number="productForm.price" style="width: 10%"></el-input>
          <span> 元</span>
        </el-form-item>
        <el-form-item label="优惠券面额设置" prop="couponList">
          <el-table
            :data="productForm.couponList"
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
        <el-form-item label="排序" prop="sort">
          <el-input v-model.number="productForm.sort" @input="handleSort" style="width: 10%"></el-input>
          <span style="margin-left: 30px;color: darkgray">排序值范围0-9999，默认为0，排序值越大，排序越靠前，当排序值相同时，按上传时间顺序排序。</span>
        </el-form-item>
        <el-form-item label="兑换说明" prop="description">
          <el-input type="textarea" v-model="productForm.description" style="width: 60%"></el-input>
        </el-form-item>
        <el-form-item label="上架状态" prop="status">
          <el-switch v-model="productForm.status" active-color="#2B2B2CFF"></el-switch>
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
    const coupon = {
      denomination: '10元优惠券',
      couponId: 'xxxx',
      requiredDrip: 1000,
      couponCount: 100
    }
    return {
      productForm: {
        productName: '',
        productSmallImg: '',
        productBigImg: '',
        productId: '',
        price: '',
        couponList: Array(3).fill(coupon),
        sort: 0,
        description: '',
        status: ''
      },
      rules: {
        productName: [{required: true, message: '请输入商品名称', trigger: 'blur'}, {
          whitespace: true,
          message: '名称不能仅含有空格',
          trigger: 'blur'
        }],
        productSmallImg: [{required: true, type: 'object', message: '请选择缩略图', trigger: 'blur'}],
        productBigImg: [{required: true}],
        productId: [{required: true, message: '请输入商品ID', trigger: 'blur'}, {
          whitespace: true,
          message: 'ID不能仅含有空格',
          trigger: 'blur'
        }],
        price: [{required: true, message: '请输入商品原价', trigger: 'blur'}, {
          type: 'number',
          message: '请输入数字',
          trigger: ['blur', 'change']
        }],
        couponList: [{required: true, trigger: 'blur'}]
      },
      dialogImageUrl: '',
      dialogVisible: false,
      disabled: false
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
    },
    handleSort() {
      if ((typeof this.productForm.sort) !== "number") {
        this.productForm.sort = 0;
      }
    },
    handleRemove(file) {
      console.log(file);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleDownload(file) {
      console.log(file);
    },
    handleExceed() {
      this.$message({
        showClose: true,
        message: '只能添加一张图片',
        type: 'warning'
      });
    }
  }
}
</script>

<style scoped>

</style>
