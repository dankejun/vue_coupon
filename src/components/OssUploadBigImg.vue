<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="#"
      :http-request="uploadImg"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :file-list="fileList"
      :auto-upload="true"
      :limit=1
      :on-exceed="handleExceed"
      list-type="picture-card">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
<!--      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>-->
      <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>
import {getOssInfo, imgUpload} from "../api/couponRequest";

export default {
  name: "OssUploadBigImg",
  data() {
    return {
      fileList: [],
      dialogImageUrl: '',
      path: '',
      dialogVisible: false,
      disabled: false
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed() {
      this.$message({
        showClose: true,
        message: '只能添加一张图片',
        type: 'warning'
      });
    },
    uploadImg({file}) {
      let form = new FormData()
      form.append('file', file)
      imgUpload(form).then(response => {
        this.path = response.data
        this.$emit('submitBigImg',this.path)
        console.log("path1---->" + this.path)
      })
    }
  }
}
</script>

<style scoped>

</style>
