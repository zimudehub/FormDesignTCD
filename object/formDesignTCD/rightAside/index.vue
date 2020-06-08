<template>
  <el-form
    label-width="80px"
    :model="layoutData"
    class="left-form"
    size="mini"
  >
<!--    config: {-->
<!--    labelPosition: "horizontal",-->
<!--    labelCol: 15,-->
<!--    wrapperCol: { span: 18 },-->
<!--    hideRequiredMark: false,-->
<!--    customStyle: ""-->
<!--    }-->

    <el-form-item label="label位置">
      <el-radio-group v-model="layoutData.labelPosition" size="small">
        <el-radio-button label="right">right</el-radio-button>
        <el-radio-button label="left">left</el-radio-button>
        <el-radio-button label="top">top</el-radio-button>
      </el-radio-group>
    </el-form-item>
    <el-divider v-if="layoutData.labelPosition==='right'||layoutData.labelPosition==='left'"></el-divider>
    <el-form-item v-if="layoutData.labelPosition==='right'||layoutData.labelPosition==='left'" label="label宽度(%)">
      <el-slider
        v-model="layoutData.labelWidth"
        :max="80"
        :min="0"
      />
    </el-form-item>
    <el-divider></el-divider>
    <el-form-item label="模态框宽度">
      <el-input v-model="layoutData.customWidth"></el-input>
    </el-form-item>
  </el-form>
</template>

<script>
    export default {
        name: "leftAside",
        props:{
            layoutData:{
                type:Object,
                required:true
            }
        }
    }
</script>
