<template>
  <div class="json-box-view">
    <codemirror
      style="height:100%;"
      ref="myEditor"
      :value="json"
    />
  </div>
</template>

<script>
    import { codemirror } from 'vue-codemirror-lite'
    import('codemirror/mode/javascript/javascript');
    import('codemirror/mode/vue/vue');
    export default {
        name: "codemirrorVue",
        props:{
            json:{
                type:String,
            }
        },
        components:{codemirror},
        data(){
            return{

            }
        }
    }
</script>

<style lang="less" scoped>

</style>
