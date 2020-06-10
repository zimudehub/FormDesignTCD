<template>
  <div class="json-box-view">
    <codemirror
      style="height:100%;"
      ref="myEditor"
      v-model="importJson.json"
    />
  </div>
</template>

<script>
  import { codemirror } from 'vue-codemirror-lite'
    export default {
        name: "ImportJson",
        components:{codemirror},
        props:{
            importJson:{
                type: Object,
                required: true
            }
        },

    }
</script>

<style scoped>

</style>
