<template>
    <div id="app" style="height: 100vh;">
        <el-row style="height: 100%">
            <el-col :span="15" style="height: 100%">
                <div
                    style="height: 60px; background: #dbeeff; line-height: 60px;text-align: center; font-size: 30px"
                >formDesign-TCD 表单设计器</div>
                    <FormDesignTCD
                        @save="handleSave"
                    />
            </el-col>
            <el-col :span="9">
                <div>
                    <FormBuildTCD
                        :options="data"
                    />
                </div>
            </el-col>
        </el-row>
    </div>
</template>
<script>
  export default {
    name: "App",
    data(){
      return{
        data: {
          config: {
            labelPosition: "top",
            labelWidth: 15,
            customWidth: ""
          },
          list: []
        }
      }
    },
    methods:{
      handleSave(data){
        this.data = data
      }
    }
  }
</script>
<style>
  html,body{
    margin: 0;
    padding: 0;
    overflow: hidden;
  }
</style>
