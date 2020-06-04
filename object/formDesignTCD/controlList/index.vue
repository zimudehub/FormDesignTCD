<template>
    <div class="test">
      <div class="control-button-title">控件选择</div>
<!--      <div class="button-wrap">-->
      <draggable
          tag="ul"
          :value="baseArray"
          class="button-wrap-drg"
          v-bind="{
            group: { name: 'form-draggable', pull: 'clone', put: false },
            sort: false,
            animation: 180,
            ghostClass: 'leftMoving'
          }"
          @start="deepClone($event, baseArray)"
      >
          <li
            v-for="(val, index) in baseArray"
            :key="index"
            @dragstart="$emit('generate', baseArray, index)"
            @click="$emit('clickPushItem', baseArray, index)"
          >
              <i :class="val.icon"></i>
              {{ val.label }}
          </li>
        </draggable>
      <el-divider content-position="left">基础控件</el-divider>
      <draggable
          tag="ul"
          :value="layoutList"
          class="button-wrap-drg"
          v-bind="{
            group: { name: 'form-draggable', pull: 'clone', put: false },
            sort: false,
            animation: 180,
            ghostClass: 'leftMoving'
          }"
          @start="deepClone($event, layoutList)"
      >
          <li
            v-for="(val, index) in layoutList"
            :key="index"
            @dragstart="$emit('generate', layoutList, index)"
            @click="$emit('clickPushItem', layoutList, index)"
          >
            <i :class="val.icon"></i>
            {{ val.label }}
          </li>
      </draggable>
      <el-divider content-position="left">布局控件</el-divider>
    </div>
</template>

<script>
    import draggable from "vuedraggable";
    export default {
        name: "controlList",
        components:{
            draggable
        },
        props:{
            baseArray:{
                type: Array,
                required: true
            },
            layoutList:{
                type: Array,
                required: true
            }
        },
        data(){
            return{

            }
        },
        methods:{
            deepClone(e, list){
              // console.log(e)
            },
        }
    }
</script>

