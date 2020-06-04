<template>
    <div>
      <el-divider v-if="options.hasOwnProperty('buttonText')"/>
      <el-form-item label="按钮文字" v-if="options.hasOwnProperty('buttonText')">
        <el-input v-model="options.buttonText" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-divider v-if="options.hasOwnProperty('warnText')"/>
      <el-form-item label="提示文字" v-if="options.hasOwnProperty('warnText')">
        <el-input v-model="options.warnText" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-divider/>
      <el-form-item label="上传地址">
        <el-input v-model="options.action" placeholder="请输入内容"></el-input>
      </el-form-item>
      <el-divider v-if="options.hasOwnProperty('listType')" />
      <el-form-item label="上传地址" v-if="options.hasOwnProperty('listType')">
        <el-radio-group v-model="options.listType"  size="mini">
          <el-radio-button label="text">文本</el-radio-button>
          <el-radio-button label="picture">文本图</el-radio-button>
          <el-radio-button label="picture-card">照片墙</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </div>
</template>

<script>
    export default {
        name: "index",
        props:{
            options:{
                type: Object,
                required: true
            }
        },

    }
</script>
