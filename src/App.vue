<template>
    <div id="app" style="height: 100vh;">
        <el-row style="height: 100%">
            <el-col :span="24" style="height: 100%">
                <div
                    style="height: 60px; background: #dbeeff; line-height: 60px;text-align: center; font-size: 30px"
                >formDesign-TCD 表单设计器</div>
                    <FormDesignTCD
                        @save="handleSave"
                    />
            </el-col>
<!--            <el-col :span="9">-->
<!--                <div>-->
<!--                    <FormBuildTCD-->
<!--                        :options="data"-->
<!--                        :dynamicData="dynamicData"-->
<!--                    />-->
<!--                </div>-->
<!--            </el-col>-->
        </el-row>
    </div>
</template>
<script>
    // import FormBuildTCD from "../object/formBuildTCD"
    export default {
      name: "App",
      // components:{FormBuildTCD},
      data(){
          return{
            dynamicData:{
                a:[
                    {
                        value: "1",
                        label: "选项1",
                        children: [
                            {
                                value: "11",
                                label: "tanxiansheng"
                            }
                        ]
                    },
                    {
                        value: "2",
                        label: "选项2",
                        children: [
                            {
                                value: "22",
                                label: "选项22"
                            }
                        ]
                    }
                ]
            },
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
