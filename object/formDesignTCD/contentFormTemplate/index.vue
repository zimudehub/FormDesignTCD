<template>
  <el-form
    :label-position="data.config.labelPosition"
  >
    <draggable
      tag="div"
      class= "wrapper"
      v-model= "data.list"
      v-bind= "{
        group: 'form-draggable',
        animation: 180,
        handle:'.dar-box',
        ghostClass: 'moving',
        sort: true,
      }"
      @add="addItem"
      @start="start"
    >
      <transition-group tag="div" name="list" class="list-main">
          <TFormTemplate
            v-for="(item,i) in data.list"
            :layout="data.config"
            :key="item.key"
            :item="item"
            :i = "i"
            :selectType="selectType"
            @handleStart="handleStart"
            @deleteItem="deleteItem"
            :selectItem.sync="selectItem"
            @onClick="handleSelectItem"
            @selectChange="selectChange"
          />
      </transition-group>
    </draggable>
  </el-form>
</template>

<script>
    import draggable from 'vuedraggable';
    import TFormTemplate from '../components/tFormTemplate'
    export default {
        name: "contentFormTemplate",
        props:{
            selectType:{
                required: true
            },
            data:{
                type: Object,
                required: true
            },
            selectItem:{
                required: true
            },
            noModel: {
                type: Array,
                default:()=>[
                    "button",
                    "divider",
                    "card",
                    "grid",
                    "table",
                    "alert",
                    "p",
                    "html"
                ],
            }
        },
        components:{draggable, TFormTemplate},
        computed:{

        },
        data(){
            return{

            }
        },
        watch:{

        },
        methods: {
            start(e){
                this.$emit("startChoose", e.oldIndex)
            },
            handleStart(e,list){
                this.selectChange(list[e.oldIndex])
            },
            handleSelectItem(item){
                this.$emit("choose", item)
            },
            selectChange(item){
                this.$emit("selectChange", item)
            },
            addItem(e){
                //当从左侧拖进来时,将拖进来的数据,克隆一份传给selectItem,保证操作区域的data.list值唯一
                const item = JSON.parse(JSON.stringify(this.data.list[e.newIndex]));
                delete item.icon;
                if(this.noModel.includes(item.type)){
                    delete item.model
                }
                this.$emit("selectItemChange", item, e.newIndex)
            },
            deleteItem(){
                this.$emit('deleteItem')
            }

        }
    }
</script>
