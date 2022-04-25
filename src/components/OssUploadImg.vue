<template>
  <div>
    <el-upload
      class="upload-demo"
      ref="upload"
      action="#"
      :http-request="uploadImg"
      :on-preview="handlePictureCardPreview"
      :on-remove="handleRemove"
      :before-remove="beforeRemove"
      :auto-upload="false"
      :limit=1
      :file-list="fileList"
      :on-exceed="handleExceed"
      :before-upload="beforeAvatarUpload"
      list-type="picture">
      <el-button slot="trigger" size="small" type="primary">选取文件</el-button>
      <el-button style="margin-left: 10px;" size="small" type="success" @click="submitUpload">上传到服务器</el-button>
      <div slot="tip" class="el-upload__tip">只能上传jpg/jpeg/png文件，且不超过5MB</div>
      {{this.fileList}}
    </el-upload>
    <el-dialog :visible.sync="dialogVisible">
      <img width="100%" :src="dialogImageUrl" alt="">
    </el-dialog>
  </div>
</template>

<script>

import {imgDelete, imgUpload} from "../api/productRequest";

export default {
  name: "OssUploadImg",
  props: ['smallImg', 'idProductInfo'],
  data() {
    return {
      sImg: '',
      fileList: [],
      dialogImageUrl: '',
      path: '',
      dialogVisible: false,
      disabled: false
    }
  },
  watch: {
    smallImg: {
      handler(val) {
        if (val !== null && val !== '') {
          let arr = val.split('/');
          let fileName = arr[arr.length - 1]
          let file = {name: fileName, url: val}
          this.fileList.push(file)
        }
      }
    }
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit();
    },
    handleRemove(file, fileList) {
      if (this.fileList.length !== 0) {
        let ImgDeleteRequest ={
          idProductInfo: this.idProductInfo,
          filePath: file.url,
          isSmall: true
        }
        imgDelete(ImgDeleteRequest).then(response => {
          if (response.data === true) {
            this.$message({
              showClose: true,
              message: '删除成功',
              type: 'success'
            });
            this.$emit('submitSmallImg', '');
            this.fileList = fileList;
          } else {
            this.$message({
              showClose: true,
              message: '删除失败，请重试',
              type: 'error'
            });
            this.fileList = fileList;
          }
        });
      }
    },
    beforeRemove(file, fileList) {
      if (file.type === 'image/jpg' || 'image/jpeg' || 'image/png') {
        return this.$confirm(`确定移除缩略图？`);
      }
      return true;
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    handleExceed() {
      this.$message({
        showClose: true,
        message: '只能添加一张图片,请先删除原图片',
        type: 'warning'
      });
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === 'image/jpg' || 'image/jpeg' || 'image/png';
      const isLt5M = file.size / 1024 / 1024 < 5;

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!');
      }
      if (!isLt5M) {
        this.$message.error('上传头像图片大小不能超过 5MB!');
      }
      return isJPG && isLt5M;
    },
    uploadImg(param) {
      let form = new FormData()
      form.append('file', param.file)
      imgUpload(form).then(response => {
        this.path = response.data
        this.$emit('submitSmallImg', this.path)
      })
    }
  }
}
</script>

<style scoped>

</style>
