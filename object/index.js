
//处理兼容
import "@babel/polyfill";
//导入element
import "./eleComponents/index.js";
//导入FormDesignTCD样式
import 'codemirror/mode/javascript/javascript';
import 'codemirror/mode/vue/vue';
import "../styles/tcd-form-design.less";
import "../styles/T-Form-build.less";
import FormDesignTCD from "./formDesignTCD"
import FormBuildTCD from "./formBuildTCD"

import {
    baseList,
    layoutList
} from "./formDesignTCD/baseConfig"

let components = [FormDesignTCD, FormBuildTCD];

let install = function (Vue) {
    //检查是否已经注册过FormDesignTCD
    if (install.installed)return;
    install.installed = true;

    components.map(component=>{
        Vue.component(component.name, component)
    })

};
//当插件引入时,会自动注册组件,避免一些用户疏忽导致组件未注册
if (typeof window !== "undefined" && window.Vue) {
    install(window.Vue);
}

function setDesignConfig(config) {
    //全局前置函数配置formDesignTCD设计器
    if (Object.prototype.toString.call(config)!=="[object Object]"){
        throw "[formDesignTCD warn] Function setDesignConfig argument is not object"
    }
    baseList.forEach((item)=>{
        if(config[item.type]){
            item.options = {
                ...item.options,
                ...config[item.type]
            }
        }
    });
}

function serBuildConfig(buildArray, config, model = undefined) {
    //配置formBuildTCD解析器,配置不同表单
    if (Object.prototype.toString.call(config)!=="[object Object]"&&Object.prototype.toString.call(buildArray)!=="[object Array]"){
        throw "[formDesignTCD warn] Function setBuildConfig arguments type error"
    }
    if (model){
        //如果传入model则只修改对应model字段的控件,否则所有类型的控件都会被修改
        buildArray.forEach((item)=>{
            if(config[item.type]&&item.model === model){
                item.options = {
                    ...item.options,
                    ...config[item.type]
                }
            }
        })
    }else {
        buildArray.forEach((item)=>{
            if(config[item.type]){
                item.options = {
                    ...item.options,
                    ...config[item.type]
                }
            }
        })
    }
}

//可以导入FormDesignTCD提供的单个组件,如果在项目中只需要使用FormDesignTCD的单个组件
export {
    FormDesignTCD,
    FormBuildTCD
}

export default {
    install,
    setDesignConfig,
    serBuildConfig
}


