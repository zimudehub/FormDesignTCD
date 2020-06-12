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
                        :ref="'fbt'"
                        :options="defaultValue"
                        :dynamicData="dynamicData"
                        @onSuccess="getData"
                    />
                </div>
            </el-col>
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
            formData:{
                name:"TCD",
                age:"23"
            },
            dynamicData:{
                a:[
                    {
                        value: "1",
                        label: "动态数据1",
                        children: [
                            {
                                value: "11",
                                label: "动态数据1-1"
                            }
                        ]
                    },
                    {
                        value: "2",
                        label: "动态数据2",
                        children: [
                            {
                                value: "22",
                                label: "动态数据2-2"
                            }
                        ]
                    }
                ]
            },
              defaultValue:{
                  config: {
                      labelPosition: "top",
                      labelWidth: 15,
                  },
                  list: [
                  ]
              }
          }
        },
      methods:{
          getData(response, file, fileList,model){
              console.log(response);
              console.log(file);
              console.log(fileList);
              console.log(model);
          },
      handleSave(data){
        this.defaultValue = data
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
