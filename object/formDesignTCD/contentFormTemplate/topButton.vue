<template>
  <div class="content-top-button" >
    <el-tooltip class="item" effect="dark" content="保存" placement="top-start">
      <el-button icon="el-icon-document-checked" circle size="mini"  @click="save"/>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="预览" placement="top-start">
      <el-button icon="el-icon-view" circle size="mini" @click="viewFrom"/>
    </el-tooltip>
    <el-dialog title="表单样式如下" v-if="formViewVisible" :visible.sync="formViewVisible" :top="'10vh'">
      <TFormBuild
        :options="data"
        :dynamicData="dynamicData"
      />
    </el-dialog>
<!--    导入Json-->
    <el-tooltip class="item" effect="dark" content="导入" placement="top-start">
      <el-button icon="el-icon-upload2" circle size="mini" @click="handleImportJson"/>
    </el-tooltip>
    <el-dialog title="导入Json(请注意数据格式)" v-if="importJsonView" :visible.sync="importJsonView" :top="'10vh'">
      <ImportJson
        :importJson="importJson"
      />
      <span slot="footer" class="dialog-footer">
        <el-button @click="importJsonView = false">取 消</el-button>
        <el-button type="primary" @click="handleEmitImportJson">确 定</el-button>
      </span>
    </el-dialog>
<!--    导入Json结束-->
    <el-tooltip class="item" effect="dark" content="生成Json" placement="top-start">
      <el-button icon="el-icon-tickets" circle size="mini" @click="jsonView"/>
    </el-tooltip>
    <el-dialog title="Json数据如下所示" v-if="jsonViewVisible" :visible.sync="jsonViewVisible" :top="'10vh'">
      <CodemirrorVue
        :json="JSON.stringify(data, null, '\t')"
      />
    </el-dialog>
    <el-tooltip class="item" effect="dark" content="生成Html" placement="top-start">
      <el-button icon="el-icon-document" circle size="mini"/>
    </el-tooltip>
    <el-tooltip class="item" effect="dark" content="清空" placement="top-start">
      <el-button icon="el-icon-delete" circle size="mini" @click="deleteAll"/>
    </el-tooltip>
  </div>
</template>

<script>
    import ImportJson from "./importJson"
    import CodemirrorVue from "../components/codemirrorVue";
    import TFormBuild from "../components/tFormBuild"
    export default {
        name: "topButton",
        props:{
            data:{
                type: Object,
                required: true
            },
            dynamicData:{
                type: Object,
                default: ()=>{}
            }
        },
        components:{CodemirrorVue, TFormBuild, ImportJson},
        data(){
            return{
                jsonViewVisible: false,
                formViewVisible: false,
                importJsonView:false,
                importJson:{
                    //用对象实现一个父子组件的通信策略
                    json:`{
                      "config": {
                      "labelPosition": "top",
                      "labelWidth": 15,
                      "customWidth": ""
                      },
                      "list": []
                      }`
                }
            }
        },
        methods:{
            save(){
                this.$emit('save')
            },
            deleteAll(){
                this.data.list=[];
            },
            viewFrom(){
                this.formViewVisible = true
            },
            jsonView(){
                this.jsonViewVisible = true
            },
            handleImportJson(){
                this.importJsonView = true
            },
            handleEmitImportJson(){
                this.$emit('importJson', this.importJson.json);
                this.importJsonView = false
            }
        }
    }
</script>

<style scoped>

</style>
