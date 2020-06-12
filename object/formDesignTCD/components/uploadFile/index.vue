<template>
    <el-upload
            :action="action"
            :list-type="listType"
            :ref="'uploadFile'"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleOnSuccess"
            :before-upload="beforeUpload"
            :fileList="fileList"
            :limit="limit"
            :headers="headers"
            :data="data"
            :name="name"
            :disabled="disabled"
    >
        <el-button size="small" type="primary">{{ buttonText }}</el-button>
        <div slot="tip" class="el-upload__tip">{{ warnText }}</div>
    </el-upload>
</template>

<script>
    export default {
        name: "uploadFile",
        props:{
            warnText: String,
            buttonText: String,
            data: Object,
            name: {
                type: String,
                default: "file"
            },
            headers: Object,
            limit: Number,
            multiple:{
                type: Boolean
            },
            disabled:{
                type: Boolean
            },
            listType: String,
            value:{
                type: Array,
                default:()=>[]
            },
            action:{
                type: String,
                default: "http://cdn.kcz66.com/uploadFile.txt"
            }
        },
        watch:{
            value:{
                handler(newValue){
                    if(newValue.length === 0){
                        this.$refs.uploadFile.clearFiles()
                    }
                    //监听value,变化时让fileList也变化
                    this.fileList = newValue;
                },
                deep:true
            },

        },
        data() {
            return {
                fileList:[]
            };
        },
        methods: {
            handleOnSuccess(response, file, fileList){
                if (response.code === 0){
                    this.fileList.push({
                        name:file.name,
                        url:response.data.url,
                        fileId: response.data.fileId,
                        uid:file.uid
                    })
                }else if (response.code === 1){
                    this.$message({
                        showClose: true,
                        message: `上传${file.name}文件服务器返回code为1`,
                        type: 'error',
                    })
                }

                this.$emit('input', this.fileList);
                this.$emit('onSuccess',response, file, fileList)
            },
            beforeUpload(file){
                this.$emit('beforeUpload', file)
            },
            handleRemove(file, fileList) {
                this.fileList = [...fileList];
                this.$emit('input', this.fileList);
                this.$emit('onRemove', file, fileList)
            },

            handlePictureCardPreview(file) {
            }
        }
    }
</script>
