<template>
    <div id="T-form-wrap" ref="allWrap">
            <!--      控件按钮栏~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
            <aside class="button-wrap" >
                <ControlList
                        :baseArray="baseArray"
                        :layoutList="layoutList"
                        @generate="generate"
                        @clickPushItem="clickPushItem"
                />
            </aside>
            <!--      中间控件展示栏~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
            <section class="T-form-main" ref="contentWrap">
                <TopButton
                     :data="data"
                     @importJson="importJson"
                     :dynamicData="dynamicData"
                     @save="save"
                />
                <div class="control-center-wrap">
                    <ContentFormTemplate
                        :data="data"
                        @selectItemChange="selectItemChange"
                        :selectItem="selectItem"
                        @deleteItem="deleteItem"
                        @choose="choose"
                        @startChoose="startChoose"
                        @selectChange="selectChange"
                        :selectType="selectType"
                    />
                </div>
                <transition name="form">
                    <div  v-if="isShrink" class="right-template-form">
                        <TFormControlConfig
                            :config="selectItem"
                            @shrink="shrink"
                            @addModel="addModel"
                        />
                    </div>
                </transition>
            </section>
            <!--      属性栏~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~-->
            <aside  class="right-form-layout">
                <div class="control-props">表单/控件属性</div>
                <LayoutForm
                        v-if="!isShrink"
                        :layoutData="data.config"
                />
            </aside>
        </div>
</template>

<script>
    import {baseList, layoutList} from './baseConfig'
    import ContentFormTemplate from './contentFormTemplate'
    import ControlList from './controlList'
    import LayoutForm from './rightAside'
    import TFormControlConfig from './tFormControlConfig'
    import TopButton from './contentFormTemplate/topButton'
    export default {
        name: "FormDesignTCD",
        components: {ControlList, ContentFormTemplate, LayoutForm, TFormControlConfig, TopButton},
        // mounted(){
        //     //这里的代码为富文本编辑器服务,因为布局关系会导致富文本编辑器被拖入的时候造成页面被撑开,这里做监听
        //     this.$refs.contentWrap.style.width = this.$refs.allWrap.scrollWidth-640+"px";
        //     addEventListener('resize',()=>{
        //         this.$refs.contentWrap.style.width = this.$refs.allWrap.scrollWidth-640+"px"
        //     })
        // },
        // destroyed(){
        //     removeEventListener('resize',()=>{
        //         this.$refs.contentWrap.style.width = this.$refs.allWrap.scrollWidth-640+"px"
        //     })
        // },
        props: {
            defaultValue:{
                type: Object,
                default: ()=>{
                    return{
                        config: {
                            labelPosition: "top",
                                labelWidth: 15,
                                customWidth: ""
                        },
                        list: []
                    }
                }
            },
            childTableBans:{
                type: Array,
                default: ()=>[
                    "button",
                    "divider",
                    "card",
                    "grid",
                    "table",
                    "super",
                    "childTable",
                    "tMKeditor"
                ]
            },
            layoutBaseList:{
                type: Array,
                default: ()=>[
                    "divider",
                    "card",
                    "grid",
                    "table"
                ]
            },
            baseList: {
                type: Array,
                default: () => [
                    "input",
                    "text",
                    "number",
                    "select",
                    "checkbox",
                    "radio",
                    "date",
                    "time",
                    "uploadFile",
                    "uploadImg",
                    "tMKeditor",
                    "button",
                    "switch",
                    "slider",
                    "p",
                    "super",
                    "tipsWindow",
                    "childTable",
                    "cascader"
                ]
            }
        },
        created(){
            //初始化data数据如果父组件传进来默认值,formDesignTCD会是data等于默认值的克隆副本,避免造成子父联动
            this.data = JSON.parse(JSON.stringify(this.defaultValue))
        },
        data() {
            return {
                dynamicData:{
                    type: Object,
                    default: ()=>{}
                },
                noModel: [
                    "button",
                    "divider",
                    "card",
                    "grid",
                    "table",
                    "alert",
                    "p",
                    "html",
                    "super"
                ],
                isShrink:false,
                selectItem:{
                    key:""
                },//当前激活项
                selectType:"",
                data: {
                    config: {
                        labelPosition: "top",
                        labelWidth: 15,
                        customWidth: ""
                    },
                    list: []
                },
            }
        },
        watch:{
            data:{
                //监听data.list如果没值将isShrink置为false,为操作栏中的清除按钮服务
                handler(newValue){
                    if (newValue.list.length===0){
                        this.isShrink = false;
                        this.selectItem={
                            key: ""
                        }
                    }
                },
                deep:true,
                immediate:true
            },
            selectItem:{
                //监听selectItem变化时将isShrink置为true,如果selectItem没有值置为false
                handler(newValue){
                    if (!newValue.hasOwnProperty('options')){
                        this.isShrink = false;
                        return
                    }
                    this.isShrink = true
                }
            }
        },
        computed:{
            layoutList(){
                //计算返回布局控件
                return layoutList.filter((item)=>this.layoutBaseList.includes(item.type))
            },
            baseArray(){
                //计算返回基础控件传入子组件的值
                return baseList.filter((item)=>this.baseList.includes(item.type))
            }
        },
        methods: {
            save(){
                //保存按钮,传出formDesignTCD中的data克隆副本
                this.$emit('save',JSON.parse(JSON.stringify(this.data)))
            },
            importJson(json){
                this.data = JSON.parse(json)
            },
            selectChange(item){
                this.selectItem=item
            },
            startChoose(i){
                this.selectItem = this.data.list[i]
            },
            choose(item){
                //拿到子组件传过来的激活项
                this.selectItem = item;
                this.isShrink = true
            },
            clickPushItem(list,i){
                let item = list[i];
                item = JSON.parse(JSON.stringify(item));
                delete item.icon;
                const key = item.type +"_"+new Date().getTime();
                //给item做一个深克隆
                item = {
                    ...item,
                    key,
                    model: key
                };
                if(this.noModel.includes(item.type)){
                    delete item.model
                }
                if (!this.selectItem.key){
                    this.data.list.push(item);
                    this.selectItem = item;
                    return
                }
                const putItem = array =>{
                    //如果this.selectItem有值,找到selectItem所在位置
                    array.forEach((child,i)=>{
                        if(child.type === "grid"){
                            //如果是格栅布局
                            child.columns.forEach((item,i)=>{
                                putItem(item.list)
                            })
                        }
                        if(child.type === "card"){
                            putItem(child.list)
                        }
                        if(child.type === "table"){
                            child.trs.forEach((trsObj)=>{
                                trsObj.tds.forEach((tds)=>{
                                    putItem(tds.list)
                                })
                            })
                        }
                        if (child.type === "childTable"){
                            child.list.forEach((items,i)=>{
                                if (this.childTableBans.includes(item.type)){
                                    //屏蔽掉不可放入子表的控件
                                    item=this.selectItem;
                                }else {
                                    if(items.key===this.selectItem.key){
                                        child.list.splice(i+1,0,item);
                                    }
                                }
                            });

                        }
                        if(child.key===this.selectItem.key){
                            array.splice(i+1,0,item);
                        }else if(this.selectItem.key===''){
                            array.push(item)
                        }
                    });
                };
                putItem(this.data.list);
                this.selectItem = item
            },
            deleteItem(){
                const delItem = array =>{
                    array.forEach((child,i)=>{
                        if (child.type === "grid"){
                            child.columns.forEach((item,i)=>{
                                delItem(item.list)
                            })
                        }
                        if(child.type === "card"){
                            delItem(child.list)
                        }
                        if(child.type === "childTable"){
                            delItem(child.list)
                        }
                        if(child.type === "table"){
                            child.trs.forEach((trsObj)=>{
                                trsObj.tds.forEach((tds)=>{
                                    delItem(tds.list)
                                })
                            })
                        }
                        if (child.key === this.selectItem.key){
                            array.splice(i,1);
                            if (array.length===0){
                                this.selectItem = {key: ''};

                            }else if(array.length === i) {
                                this.selectItem = array[i-1]
                            }else {
                                this.selectItem = array[i]
                            }
                        }
                    })
                };
                delItem(this.data.list)
            },
            selectItemChange(item, i){
                this.$set(this.data.list,i, item);
                this.selectItem = item
            },
            generate(list,i){
                let item = list[i];
                //生成key
                const key = item.type +"_"+new Date().getTime();
                item = JSON.parse(JSON.stringify(item));
                //把总线的list里的key赋值,并且让数据联动字段等于key
                this.$set(list,i,{
                    ...item,
                    key,
                    model:key
                });
                //删除不需要model属性的控件
                if(this.noModel.includes(item.type)){
                    delete list[i].model
                }
                delete list[i].icon;
                this.selectType = item.type
            },
            shrink(){
                this.isShrink = false
            },
            addModel(){
                this.selectItem.options.options.push({
                    value: "",
                    label: ""
                })
            },
        }
    }
</script>
