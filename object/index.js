
//处理兼容
import "@babel/polyfill";
//导入element
import "./eleComponents/index.js";
//导入FormDesignTCD样式
import "../styles/tcd-form-design.less";
import FormDesignTCD from "./formDesignTCD"
import FormBuildTCD from "./formBuildTCD"

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

//可以导入FormDesignTCD提供的单个组件,如果在项目中只需要使用FormDesignTCD的单个组件
export {
    FormDesignTCD,
    FormBuildTCD
}

export default {
    install
}


