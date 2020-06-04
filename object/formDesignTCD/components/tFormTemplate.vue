<template>
  <div
    class="dar-box"
    :class="{
      itemWrapTableChild: type === 'childTable'
    }"
  >
    <div
      class="item-wrap"
      :class="{
        active : selectItem.key===item.key,

      }"
      @click.stop="$emit('onClick',item)"
    >
<!--      格栅布局-->
      <template v-if="item.type === 'grid'">
        <div class="grid-box">
          <el-row
            :gutter="item.options.gutter"
          >
            <el-col
              v-for="(column, i) in item.columns"
              :span="column.span"
              :key="i"
            >
              <draggable
                tag="div"
                class="grid-box-dra"
                v-model= "column.list"
                v-bind= "{
                  group: 'form-draggable',
                  animation: 180,
                  handle:'.dar-box',
                  ghostClass: 'moving',
                }"
                @add="addItem($event,column.list)"
                @start="start($event,column.list)"
              >
                <transition-group tag="div" name="list" class="grid-item">
                  <TFormTemplate
                    v-for="(r, i) in column.list"
                    :key="r.key"
                    :item="r"
                    :i="i"
                    :layout="layout"
                    :selectItem="selectItem"
                    @onClick="onClick"
                    @deleteItem="deleteItem"
                    @selectChange="selectChange"
                    @handleStart="start"
                    :selectType="selectType"
                  />
                </transition-group>
              </draggable>
            </el-col>
          </el-row>
        </div>
      </template>
<!--      格栅布局结束-->
<!--      卡片布局-->
      <template v-if="item.type === 'card'">
        <div style="padding: 0 5px">
          <el-card class="card-layout" >
            <div slot="header" >
              <span>{{item.label}}</span>
            </div>
            <div>
              <draggable
                tag="div"
                class="grid-card-dra"
                v-model= "item.list"
                v-bind= "{
                  group: 'form-draggable',
                  animation: 180,
                  handle:'.dar-box',
                  ghostClass: 'moving',
                }"
                @add="addItem($event,item.list)"
                @start="start($event,item.list)"
              >
                <transition-group tag="div" name="list" class="card-item">
                  <TFormTemplate
                    v-for="(r, i) in item.list"
                    :key="r.key"
                    :item="r"
                    :i="i"
                    :layout="layout"
                    :selectItem="selectItem"
                    @onClick="onClick"
                    @deleteItem="deleteItem"
                    @selectChange="selectChange"
                    @handleStart="start"
                    :selectType="selectType"
                  />
                </transition-group>
              </draggable>
            </div>
          </el-card>
        </div>
      </template>
<!--      卡片布局结束-->
<!--      子表-->
      <template v-if="item.type === 'childTable'">
        <div style="padding: 0 5px">
          <el-card class="childTable-layout" >
            <div slot="header" >
              <span>子表</span>
            </div>
            <draggable
              class="childTable-card-dra"
              v-model= "item.list"
              v-bind= "{
                 group: unInterFlow?'no':'form-draggable',
                 animation: 180,
                 handle:'.dar-box',
                 ghostClass: 'gridMoving',
               }"
              @add="addItem($event,item.list)"
              @start="start($event,item.list)"
            >
              <transition-group tag="div" name="list" class="childTable-main">
                <TFormTemplate
                  v-for="(r, i) in item.list"
                  :key="r.key"
                  :item="r"
                  :i="i"
                  :layout="layout"
                  :selectType="selectType"
                  :selectItem="selectItem"
                  :type="'childTable'"
                  @onClick="onClick"
                  @deleteItem="deleteItem"
                  @selectChange="selectChange"
                  @handleStart="start"
                />
              </transition-group>
            </draggable>
          </el-card>
        </div>
      </template>
<!--      子表结束-->
      <template v-else>
        <FormNode
          :item="item"
          :layout="layout"
        />
      </template>
      <el-button
        size="mini"
        type="primary"
        icon="el-icon-delete"
        :class="selectItem.key===item.key?'delete-active':'delete'"
        @click.stop="$emit('deleteItem')"
      />
    </div>
  </div>
</template>

<script>
  import FormNode from './fromNode'
  import draggable from 'vuedraggable';
    export default {
        name: "TFormTemplate",
        components:{FormNode, draggable},
        props:{
            selectType:{
                required:true,
                default:""
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
            layout:{
                type:Object,
                required:true,
            },
            item:{
                type: Object,
                required: true
            },
            i:{
                type: Number,
                required:true
            },
            selectItem:{
                required:true
            },
            type:{
                default: "",
            }
        },
        computed:{
            unInterFlow(){
                return this.childTableBans.includes(this.selectType)
            }
        },
        methods:{
            start(e,list){
                this.$emit('handleStart', e, list)
            },
            deleteItem(){
                this.$emit('deleteItem')
            },
            selectChange(item){
                this.$emit("selectChange", item)
            },
            addItem(e,list,type){
                let item = JSON.parse(JSON.stringify(list[e.newIndex]));
                this.$set(list,e.newIndex, item);
                this.selectChange(item)
            },
            onClick(r){
                this.$emit("onClick",r)
            }
        }
    }
</script>

