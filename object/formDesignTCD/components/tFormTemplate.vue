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
      <template v-if="item.type === 'table'">
        <ul
          class="table-rightClick-wrap"
          v-show="tableHandleShow"
          :style="`top:${top}px; left:${left}px`"
          @contextmenu.prevent ="()=>{return false}"
        >
          <li ref="mergeRight"><i class="el-icon-caret-right"/>向右合并</li>
          <li ref="addCol"><i class="el-icon-right"/>增加一列</li>
          <li ref="mergeDown"><i class="el-icon-caret-bottom"/>向下合并</li>
          <li ref="addRow"><i class="el-icon-bottom"/>增加一行</li>
          <li ref="repeal"><i class="el-icon-refresh-left"/>回退</li>
        </ul>
        <table style="width: 100%" @contextmenu.prevent ="()=>{return false}" ref="FDTCDtable">
          <tbody class="table-layout">
            <tr v-for="(tr,tri) in item.trs" :key="tri">
              <td
                v-for="(td,tdi) in tr.tds"
                :colspan="td.colspan"
                :rowspan="td.rowspan"
                :key="tdi"
                @contextmenu.prevent ="()=>{return false}"
                @mouseup="tableHandle($event, item.trs, tri, tdi )"
              >
                <draggable
                  tag="div"
                  class="table-dra"
                  v-model= "td.list"
                  v-bind= "{
                    group: 'form-draggable',
                    animation: 180,
                    handle:'.dar-box',
                    ghostClass: 'moving',
                  }"
                  @add="addItem($event,td.list)"
                  @start="start($event,td.list)"
                >
                  <transition-group tag="div" name="list" class="table-item">
                    <TFormTemplate
                      v-for="(r, i) in td.list"
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
              </td>
            </tr>
          </tbody>
        </table>
      </template>
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
        data(){
          return{
            tableHandleShow: false,
            left:0,
            top:0,
          }
        },
        computed:{
            unInterFlow(){
                return this.childTableBans.includes(this.selectType)
            }
        },
        methods:{
            tableHandle(e, table, tri, tdi ){
              if (e.button === 2){
                this.top = e.clientY;
                this.left = e.clientX;
                this.tableHandleShow = !this.tableHandleShow
              }else {
                this.tableHandleShow = false
              }
              this.$refs.mergeRight.onclick = ()=>{
                  //向右合并
                ( () =>{
                  if (table[tri].tds.length-1 === tdi){
                    this.$message({
                      showClose: true,
                      message: `已是最后一列,无法向右合并`,
                      type: 'error',
                      duration:1500
                    })
                  } else if(table[tri].tds[tdi].rowspan!==table[tri].tds[tdi+1].rowspan){
                    this.$message({
                      showClose: true,
                      message: `该单元无法向右合并`,
                      type: 'error',
                      duration:1500
                    })
                  }else {
                    table[tri].tds[tdi].colspan++;
                    table[tri].tds.splice(tdi+1,1)
                  }
                })()
              };
              this.$refs.addCol.onclick = ()=>{
                //增加一列
                ( () =>{
                  table.forEach((tr)=>{
                    tr.tds.push({
                      colspan: 1,
                      rowspan: 1,
                      list: []
                    })
                  });
                })()
              };
              this.$refs.mergeDown.onclick = ()=>{
                //向下合并
                ( () =>{
                  if (table.length-1 === tri){
                    this.$message({
                      showClose: true,
                      message: `已是最后一行,无法向下合并`,
                      type: 'error',
                      duration:1500
                    })
                  }else if(table[tri].tds[tdi].colspan!==table[tri+1].tds[tdi].colspan){
                    this.$message({
                      showClose: true,
                      message: `当前单元格无法向下合并`,
                      type: 'error',
                      duration:1500
                    })
                  }else {
                    table[tri].tds[tdi].rowspan++;
                    table[tri+1].tds.splice(tdi,1)
                  }
                })()
              };
              this.$refs.addRow.onclick = ()=>{
                //增加一行
                ( () =>{
                  const cells = table[0].tds.reduce((pre,cur)=>pre+cur.colspan,0);
                  let rows = [];
                  for (let i =0; i<cells; i++){
                    rows.push({
                      colspan: 1,
                      rowspan: 1,
                      list: []
                    })
                  }
                  table.push({
                    tds: rows
                  })
                })()
              };
            },
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

