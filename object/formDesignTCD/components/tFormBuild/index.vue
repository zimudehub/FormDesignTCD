<template>
    <div>
      <div style="width: 100%; max-height: 600px; overflow-y: auto; overflow-x: hidden">
        <Codemirror
          v-if="formDataJsonView"
          :json="JSON.stringify(formData, null, '\t')"
        />
        <el-form
          v-else
          :model="formData"
          ref="buildForm"
          :label-position="formOptions.config.labelPosition"
          class="finalForm"
          :rules="rules"
        >
          <FinalForm
            v-for="(item, i) in formOptions.list"
            :item="item"
            :layout="formOptions.config"
            :key="i"
            :formData="formData"
            :dynamicData="dynamicData"
            :childTableColumns="childTableColumns"
            @onSuccess="(response, file, fileList)=>{$emit('onSuccess',response, file, fileList)}"
          />
        </el-form>
      </div>
      <el-button type="primary" @click="handleJsonView" style="margin-top: 10px">
        {{formDataJsonView?'展示表单':'展示数据'}}
      </el-button>
      <el-button v-if="!formDataJsonView" type="primary" @click="handleSubmit('buildForm')" style="margin-top: 10px">
        提交模拟
      </el-button>
    </div>
</template>

<script>
  import FinalForm from "../../../formBuildTCD/buildFormNode"
  import Codemirror from "../codemirrorVue"
  import "../../../../styles/T-Form-build.less"
    export default {
        name: "index",
        components:{FinalForm, Codemirror},
        props:{
            options:{
                type:Object,
                required: true
            },
            defaultValue:{
                type: Object,
                default: ()=>{}
            },
            dynamicData:{
                type: Object,
                default: ()=>{}
            }
        },
        data(){
            return{
                formData:{},
                formOptions: JSON.parse(JSON.stringify(this.options)),
                formDataJsonView: false,
                childTableColumns:[],
                rules: {}
            }
        },
        methods:{
            handleSubmit(formName){
                    if (!this.formDataJsonView){
                        this.$refs[formName].validate((valid) => {
                            if (valid) {
                                this.$message({
                                    showClose: true,
                                    message: `模拟提交成功`,
                                    type: 'success',
                                })
                            } else {
                                return false;
                            }
                        })
                    }
            },
            handleJsonView(formName){
                this.formDataJsonView = !this.formDataJsonView;
            }
        },
        created() {
            let duplicate = [];
            //根据模板formOptions映射出formData给予form组件进行数据联动
            const mapFormData = (formData, array)=>{
                //查重model
                const duplicating =(duplicate, control)=>{
                   if(duplicate.includes(control.model)){
                       this.$message({
                           showClose: true,
                           message: `${control.key}控件数据字段重复(会导致字段重复的控件value值联动)`,
                           type: 'error',
                           duration:0
                       })
                   }else {
                       duplicate.push(control.model)
                   }
                };
                array.forEach((item,i) =>{
                   if(item.model){
                       if (item.type ==="number"||item.type ==="slider"){
                           duplicating(duplicate, item);
                           formData[item.model] = item.options.numberDefaultValue
                       }else if (item.type === "checkbox"){
                           duplicating(duplicate, item);
                           formData[item.model] = item.options.checkboxDefaultValue
                       }else if (item.type === "date"){
                           if (item.options.isChooseTimes === "1"){
                               duplicating(duplicate, item);
                               formData[item.model] = item.options.defaultValue
                           }else {
                               duplicating(duplicate, item);
                               formData[item.model] = item.options.rangeDefaultValue
                           }
                       }else if (item.type === "uploadImg"||item.type === "uploadFile"){
                           duplicating(duplicate, item);
                           formData[item.model] = item.options.fileList
                       }else if (item.type === "switch"){
                           duplicating(duplicate, item);
                           formData[item.model] = item.options.switchValue
                       }else if (item.type === "select"||item.type === "cascader"){
                         duplicating(duplicate, item);
                         formData[item.model] = item.options.multiple?item.options.multipleDefaultValue:item.options.defaultValue
                       }else if (item.type === "childTable"){
                           duplicating(duplicate, item);
                           formData[item.model] = [];
                           //映射出childTable增加一行的数据格式,保存到一个数组,并且添加model值以便遍历查取
                           let childTableColumns = mapFormData({}, item.list);
                           let obj = JSON.parse(JSON.stringify(childTableColumns));
                           formData[item.model].push(obj);
                           this.childTableColumns.push({
                               ...obj,
                               model:item.model
                           })
                       }else {
                           duplicating(duplicate, item);
                           formData[item.model] = item.options.defaultValue
                       }
                   }else if (item.type === "grid"){
                       //处理格栅布局
                       item.columns.forEach((item,i) =>{
                           mapFormData(formData, item.list)
                       })
                   }else if (item.type === "card"){
                       //处理卡片布局
                       mapFormData(formData, item.list)
                   }else if (item.type === "table"){
                     //处理卡片布局
                     item.trs.forEach((tr)=>{
                       tr.tds.forEach((td)=>{
                         mapFormData(formData, td.list)
                       })
                     })
                   }
                });
                return formData
            };
            this.formData = mapFormData({},this.formOptions.list);
            const ruleFn = (pattern, message) =>{
                //柯利化返回验证函数
                return (rule, value, callback) => {
                    let reg = pattern?eval(pattern):"";
                    if (reg&&!reg.test(value)) {
                        callback(new Error(message))
                    } else {
                        callback()
                    }
                };
            };
            const mapRules = (rules, array)=>{
                //映射出element需要的验证rules
                array.forEach((child, i)=>{
                    if (child.model){
                        if (child.type === "childTable"){
                            return
                        }
                        //把rule深克隆
                        let rule = JSON.parse(JSON.stringify(child.rules));
                        rules[child.model] = rule.map((item,i)=>{
                            if(i === 0){
                                return item
                            }else {
                                return {
                                    validator: ruleFn(item.pattern, item.message),
                                    trigger: 'blur'
                                }
                            }
                        })
                    }else if (child.type === "grid"){
                        child.columns.forEach((item, i)=>{
                            mapRules(rules, item.list)
                        })
                    }else if (child.type === "card"){
                        mapRules(rules, child.list)
                    }else if (child.type === "table"){
                      //处理卡片布局
                      child.trs.forEach((tr)=>{
                        tr.tds.forEach((td)=>{
                          mapRules(rules, td.list)
                        })
                      })
                    }
                });
                return rules
            };
            this.rules = mapRules({}, this.formOptions.list)
        },
    }
</script>
