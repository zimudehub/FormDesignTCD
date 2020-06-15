## 指南 
基于vue和element-ui实现的表单设计器，主要功能是使使用者在图形界面配置所需的表单，生成可保存的JSON数据，并能将JSON还原成表单，使表单开发更简单更快速
  
  [预览地址](http://47.98.53.80:8005/)  
  [[GitHub]源码开源地址](https://github.com/zimudehub/FormDesignTCD)  
  [[码云]源码开源地址](https://gitee.com/tanchengduo/form-design-tcd)
  
![An image](./img/formDesignTCD1.gif)
特性
- 可视化配置页面
- 自由控制表单控件布局
- 表单自定义样式(以行内样式插入)
- 提供预览、保存、生成json、生成可执行代码等操作
- 支持表单验证
- 快速获取表单数据
- 提供高级控件
    <p align="center">
      <a href="https://github.com/vuejs/vue">
        <img src="https://img.shields.io/badge/vue-2.6.11-brightgreen.svg" alt="vue">
      </a>
      <a href="https://github.com/ElemeFE/element">
        <img src="https://img.shields.io/badge/element%20ui-2.13.0-blue" alt="element-ui">
      </a>
      <a href="https://github.com/zimudehub/FormDesignTCD/blob/master/LICENSE">
        <img src="https://img.shields.io/github/license/mashape/apistatus.svg" alt="license">
      </a>
    </p>
### 感谢
创作感谢k-form-design给予的灵感
### 版本
<p align="center">
      <a href="https://github.com/zimudehub/FormDesignTCD">
        <img src="https://img.shields.io/badge/form%20design%20tcd-0.0.6-brightgreen.svg" alt="vue">
      </a>
</p>

### 设计原则
form-design-tcd本着所有表单控件特性尽可能可视化配置。
## 快速上手
### 1.安装vue-cli
```
 npm install -g @vue/cli
 # OR
 yarn global add @vue/cli
```
### 2.创建一个项目
使用初始化项目命令
``` 
 vue create myapp
```
### 3.安装form-design-tcd
``` 
 npm i form-design-tcd --save
 # OR
 yarn add form-design-tcd
```

### 4.使用form-design-tcd
在项目main.js中
``` 
 import FormDesignTCD from 'form-design-tcd'
 import "form-design-tcd/lib/form-design-tcd.css"
 Vue.use(FormDesignTCD)
```
以上步骤便完成便可在项目中直接使用form-design-tcd。  
form-design-tcd内置了两个组件分别为FormDesignTCD和FormBuildTCD。  
## 建议
form-design-tcd基础组件样式引用的element-ui的组件库,在使用过程中一些表单控件特性可查阅element-ui官方文档







