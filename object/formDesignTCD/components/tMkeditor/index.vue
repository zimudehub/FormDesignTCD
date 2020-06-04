<template>
  <quillEditor
    :style="{ height: record.options.height*100+'px' }"
    :value="value"
    ref="vueQuillEditor"
    class="ql-editor-class"
    :class="{ chinesization: record.options.chinesization }"
    :options="editorOption"
    :disabled="record.options.disabled || disabled"
    @blur="onEditorBlur($event)"
    @focus="onEditorFocus($event)"
    @change="onEditorChange($event)"
  >
  </quillEditor>
</template>
<script>
    import { quillEditor } from "vue-quill-editor"; //调用编辑器
    import "quill/dist/quill.core.css";
    import "quill/dist/quill.snow.css";
    import "quill/dist/quill.bubble.css";
    import "../../../../styles/tMkeditor-chinesization.less"

    export default {
        name: "tMkeditor",
        props: ["value", "record", "disabled"],
        components: { quillEditor },
        data() {
            return {
                editorOption: {
                    placeholder: this.record.options.placeholder
                }
            };
        },
        methods: {
            onEditorBlur() {}, // 失去焦点事件
            onEditorFocus() {}, // 获得焦点事件
            onEditorChange(e) {
                this.$emit("change", e.html);
            }
        }
    };
</script>
<style lang="less" scoped>
  .ql-editor-class {
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    line-height: 1.42;
    outline: none;
    padding: 0 0 66px;
    tab-size: 4;
    -moz-tab-size: 4;
    text-align: left;
    word-wrap: break-word;
  }

</style>
