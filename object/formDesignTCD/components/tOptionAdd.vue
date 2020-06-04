<template>
  <div style="margin-top: 8px" >
    <el-row v-for="(item,index) in value" :key="index" :gutter="5" style="margin-top: 6px">
      <el-col :span="9" >
        <el-input v-model="item.label" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="9">
        <el-input v-model="item.value" placeholder="请输入内容"></el-input>
      </el-col>
      <el-col :span="6">
        <el-button type="danger" icon="el-icon-delete" circle @click="deleteItem(index)"></el-button>
      </el-col>
    </el-row>
    <a href="#" @click="addItem">增加数据</a>
  </div>
</template>

<script>
    export default {
        name: "tOptionAdd",
        props:{
            value:{
                type:Array,
                required:true
            },
        },
        methods:{
            deleteItem(index){
              let options =[
                  ...this.value
              ];
              if (options.length<=1){
                  return
              }
              options.splice(index,1);
              this.$emit("input", options)
            },
            addItem(){
                const key = new Date().getTime();
                const options = [
                    ...this.value,
                    {
                        value: '',
                        label: '',
                        key
                    }
                ];
                this.$emit("input", options)
            }
        }
    }
</script>
<style scoped>
  a{
    text-decoration:none;
  }
  a:hover{
    color: #409eff;
  }
</style>

