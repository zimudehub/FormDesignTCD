<template>
  <div>
    <!--    格栅布局-->
    <template v-if="item.type ==='grid'">
      <div class="form-build-grid">
        <el-row
          :gutter="item.options.gutter"
        >
          <el-col
            v-for="(column, i) in item.columns"
            :span="column.span"
            :key="i"
          >
            <FinalForm
              v-for="(item, i) in column.list"
              :item="item"
              :dynamicData="dynamicData"
              :layout="layout"
              :key="i"
              :formData="formData"
              :childTableColumns="childTableColumns"
              @clickFormButton="handleFormButton"
              @onSuccess="(response, file, fileList)=>{$emit('onSuccess',response, file, fileList)}"
              @beforeUpload="(file)=>{$emit('beforeUpload', file)}"
            />
          </el-col>
        </el-row>
      </div>
    </template>
    <!--    格栅布局结束-->
    <!--    子表-->
    <template v-else-if="item.type === 'childTable'">
      <el-table
        class="form-build-childTable"
        :data="formData[item.model]"
        border
        style="width: 100%">
        <el-table-column
          v-for="(column,i) in item.list"
          :key="i"
          :label="column.label"
          min-width="170">
          <template slot-scope="scope">
            <el-input
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'input'"
              :placeholder="column.options.placeholder"
              :style="'width:'+column.options.width+'%'"
              :defaultValue="column.options.defaultValue"
              :type="column.options.hidden?'hidden':'input'"
              :disabled="column.options.disabled"
              v-bind="{
                clearable:column.options.clearable,
              }"
            />
            <el-input
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'text'"
              :placeholder="column.options.placeholder"
              :style="'width:'+column.options.width+'%'"
              :defaultValue="column.options.defaultValue"
              :type="column.options.hidden?'hidden':'textarea'"
              :rows="column.options.height"
              :disabled="column.options.disabled"
              v-bind="{
                clearable:column.options.clearable,
              }"
            />
            <el-input-number
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'number'"
              :defaultValue="column.options.numberDefaultValue"
              :step="column.options.step"
              :style="'width:'+column.options.width+'%'"
              :min="column.options.min"
              :max="column.options.max"
              :precision="column.options.precision"
              :disabled="column.options.disabled"
            />
            <el-cascader
              v-if="column.type === 'cascader'"
              :options="column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options"
              v-model="formData[item.model][scope.$index][column.model]"
              :props="{
                multiple:column.options.multiple
              }"
              :placeholder="column.options.placeholder"
              :style="'width:'+column.options.width+'%'"
              collapse-tags
              :disabled="column.options.disabled"
              :clearable="column.options.clearable"
            />
            <el-select
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'select'"
              :defaultValue="column.options.defaultValue"
              :multiple="item.options.multiple"
              :placeholder="column.options.placeholder"
              :style="'width:'+column.options.width+'%'"
              :disabled="column.options.disabled"
              :clearable="column.options.clearable"
            >
              <el-option
                v-for="(items,index) in (column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options)"
                :key="index"
                :label="items.label"
                :value="items.value">
              </el-option>
            </el-select>
            <el-checkbox-group
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'checkbox'"
              :defaultValue="column.options.checkboxDefaultValue"
              :min="column.options.chooseMin"
              :max="column.options.chooseMax"
              :disabled="column.options.disabled"
            >
              <el-checkbox
                v-for="(items,index) in (column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options)"
                :label="items.value"
                :key="index"
              >
                {{items.label}}
              </el-checkbox>
            </el-checkbox-group>
            <el-radio-group
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'radio'"
              :defaultValue="column.options.defaultValue"
              :disabled="column.options.disabled"
            >
              <el-radio
                v-for="(items,index) in (column.options.dynamic&&dynamicData[column.options.dynamicKey]?dynamicData[column.options.dynamicKey]:column.options.options)"
                :label="items.value"
                :key="index"
              >
                {{items.label}}
              </el-radio>
            </el-radio-group>
            <el-date-picker
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'date'&&column.options.isChooseTimes==='2'"
              :defaultValue="column.options.rangeDefaultValue"
              :style="'width:'+column.options.width+'%'"
              :type="column.options.isChooseTimes?'daterange':'date'"
              :range-separator="column.options.rangeSeparator"
              :start-placeholder="column.options.startPlaceholder"
              :end-placeholder="column.options.endPlaceholder"
              :disabled="column.options.disabled"
              :placeholder="column.options.isChooseTimes==='2'?'':column.options.placeholder"
            />
            <el-date-picker
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'date'&&column.options.isChooseTimes==='1'"
              :defaultValue="column.options.defaultValue"
              :style="'width:'+column.options.width+'%'"
              type="date"
              :placeholder="column.options.placeholder"
              :format="column.options.format"
              :value-format="column.options.valueFormat"
              :disabled="column.options.disabled"
            />
            <el-time-picker
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'time'"
              :style="'width:'+column.options.width+'%'"
              :is-range="column.options.isChooseTimes==='2'"
              :defaultValue="column.options.defaultValue"
              :range-separator="column.options.rangeSeparator"
              :start-placeholder="column.options.startPlaceholder"
              :end-placeholder="column.options.endPlaceholder"
              :placeholder="column.options.isChooseTimes==='2'?'':column.options.placeholder"
              :disabled="column.options.disabled"
            />
            <UploadFile
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'uploadFile'"
              :warnText="column.options.warnText"
              :buttonText="column.options.buttonText"
              :style="'width:'+column.options.width+'%'"
              :action="column.options.action"
              :multiple="column.options.multiple"
              :limit="column.options.limit"
              :disabled="column.options.disabled"
              :list-type="column.options.listType"
              :headers="column.options.headers?column.options.headers:{}"
              :data="column.options.data?column.options.data:{}"
              :name="column.options.name?column.options.name:''"
              @onSuccess="(response, file, fileList)=>{$emit('onSuccess',response, file, fileList)}"
              @beforeUpload="(file)=>{$emit('beforeUpload', file)}"
            />
            <UploadImg
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'uploadImg'"
              :style="'width:'+column.options.width+'%'"
              :action="column.options.action"
              :multiple="column.options.multiple"
              :limit="column.options.limit"
              :disabled="column.options.disabled"
              :list-type="column.options.listType"
              :headers="column.options.headers?column.options.headers:{}"
              :data="column.options.data?column.options.data:{}"
              :name="column.options.name?column.options.name:''"
              @onSuccess="(response, file, fileList)=>{$emit('onSuccess',response, file, fileList)}"
              @beforeUpload="(file)=>{$emit('beforeUpload', file)}"
            />
            <el-switch
              v-model="formData[item.model][scope.$index][column.model]"
              v-if="column.type === 'switch'"
              :defaultValue="column.options.switchValue"
              :active-text="column.options.activeText"
              :inactive-text="column.options.inactiveText"
              :disabled="column.options.disabled"
            />
            <div class="block"
                 v-if="column.type === 'slider'"
            >
              <el-slider
                v-model="formData[item.model][scope.$index][column.model]"
                :defaultValue="column.options.numberDefaultValue"
                :disabled="column.options.disabled"
                :show-input="column.options.showInput"
                :step="column.options.step"
              />
            </div>
            <div
              v-if="column.type==='p'"
              :style="'width:'+column.options.width+'%; margin: 0; padding: 0; line-height: 20px; '"
              v-text="column.label"
            />
          </template>
        </el-table-column>
        <el-table-column
          fixed="right"
          label="操作"
          width="100">
          <template slot-scope="scope">
            <el-button
              icon="el-icon-minus"
              circle
              class="table-button"
              @click="handleDelete(scope.$index, formData[item.model], item.model)"
            />
            <el-button
              icon="el-icon-plus"
              circle
              class="table-button"
              @click="handleAdd(scope.$index,formData[item.model], item.model)"
            />
          </template>
        </el-table-column>
      </el-table>
    </template>
    <!--    子表结束-->
    <!--    卡片布局-->
    <template v-else-if="item.type === 'card'">
      <div>
        <el-card class="card-layout" >
          <div slot="header" >
            <span>{{item.label}}</span>
          </div>
          <div>
            <FinalForm
              v-for="(items, i) in item.list"
              :item="items"
              :dynamicData="dynamicData"
              :layout="layout"
              :key="i"
              :formData="formData"
              :childTableColumns="childTableColumns"
              @clickFormButton="handleFormButton"
              @onSuccess="(response, file, fileList)=>{$emit('onSuccess',response, file, fileList)}"
              @beforeUpload="(file)=>{$emit('beforeUpload', file)}"
            />
          </div>
        </el-card>
      </div>
    </template>
    <!--    卡片布局结束-->
    <template v-else>
      <el-form-item
        :prop="item.model"
        :label="item.options.hidden||item.type==='tMKeditor'||isLabel?'':item.label"
        :required="item.rules?item.rules[0].required:false"
        :label-width="item.type==='tMKeditor'||isLabel?'0px':layout.labelWidth+'%'"
        :style="item.type==='tMKeditor'?'overflow:hidden':''"
      >
        <el-input
          v-if="item.type === 'input'"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%'"
          :defaultValue="item.options.defaultValue"
          v-model="formData[item.model]"
          :type="item.options.hidden?'hidden':'input'"
          :disabled="item.options.disabled"
          v-bind="{
                clearable:item.options.clearable,
              }"
        />
        <el-input
          v-model="formData[item.model]"
          v-if="item.type === 'text'"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%'"
          :defaultValue="item.options.defaultValue"
          :type="item.options.hidden?'hidden':'textarea'"
          :rows="item.options.height"
          :disabled="item.options.disabled"
          v-bind="{
                clearable:item.options.clearable,
              }"
        />
        <el-input-number
          v-model="formData[item.model]"
          v-if="item.type === 'number'"
          :defaultValue="item.options.numberDefaultValue"
          :step="item.options.step"
          :style="'width:'+item.options.width+'%'"
          :min="item.options.min"
          :max="item.options.max"
          :precision="item.options.precision"
          :disabled="item.options.disabled"
        />
        <el-cascader
          v-if="item.type === 'cascader'"
          :options="item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options"
          v-model="formData[item.model]"
          :props="{
            multiple:item.options.multiple
          }"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%'"
          collapse-tags
          :disabled="item.options.disabled"
          :clearable="item.options.clearable"
        />
        <el-select
          v-model="formData[item.model]"
          v-if="item.type === 'select'"
          :multiple="item.options.multiple"
          :defaultValue="item.options.multiple?item.options.multipleDefaultValue:item.options.defaultValue"
          :placeholder="item.options.placeholder"
          :style="'width:'+item.options.width+'%'"
          :disabled="item.options.disabled"
          :clearable="item.options.clearable"
        >
          <el-option
            v-for="(items,index) in (item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options)"
            :key="index"
            :label="items.label"
            :value="items.value">
          </el-option>
        </el-select>
        <el-checkbox-group
          v-model="formData[item.model]"
          v-if="item.type === 'checkbox'"
          :defaultValue="item.options.checkboxDefaultValue"
          :min="item.options.chooseMin"
          :max="item.options.chooseMax"
          :disabled="item.options.disabled"
        >
          <el-checkbox
            v-for="(items,index) in (item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options)"
            :label="items.value"
            :key="index"
          >
            {{items.label}}
          </el-checkbox>
        </el-checkbox-group>
        <el-radio-group
          v-model="formData[item.model]"
          v-if="item.type === 'radio'"
          :defaultValue="item.options.defaultValue"
          :disabled="item.options.disabled"
        >
          <el-radio
            v-for="(items,index) in (item.options.dynamic&&dynamicData[item.options.dynamicKey]?dynamicData[item.options.dynamicKey]:item.options.options)"
            :label="items.value"
            :key="index"
          >
            {{items.label}}
          </el-radio>
        </el-radio-group>
        <el-date-picker
          v-model="formData[item.model]"
          v-if="item.type === 'date'&&item.options.isChooseTimes==='2'"
          :defaultValue="item.options.rangeDefaultValue"
          :style="'width:'+item.options.width+'%'"
          :type="item.options.isChooseTimes?'daterange':'date'"
          :range-separator="item.options.rangeSeparator"
          :start-placeholder="item.options.startPlaceholder"
          :end-placeholder="item.options.endPlaceholder"
          :disabled="item.options.disabled"
          :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
        />
        <el-date-picker
          v-model="formData[item.model]"
          v-if="item.type === 'date'&&item.options.isChooseTimes==='1'"
          :defaultValue="item.options.defaultValue"
          :style="'width:'+item.options.width+'%'"
          type="date"
          :placeholder="item.options.placeholder"
          :format="item.options.format"
          :value-format="item.options.valueFormat"
          :disabled="item.options.disabled"
        />
        <el-time-picker
          v-model="formData[item.model]"
          v-if="item.type === 'time'"
          :style="'width:'+item.options.width+'%'"
          :is-range="item.options.isChooseTimes==='2'"
          :defaultValue="item.options.defaultValue"
          :range-separator="item.options.rangeSeparator"
          :start-placeholder="item.options.startPlaceholder"
          :end-placeholder="item.options.endPlaceholder"
          :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
          :disabled="item.options.disabled"
        />
        <UploadFile
          v-model="formData[item.model]"
          v-if="item.type === 'uploadFile'"
          :warnText="item.options.warnText"
          :buttonText="item.options.buttonText"
          :style="'width:'+item.options.width+'%'"
          :action="item.options.action"
          :multiple="item.options.multiple"
          :limit="item.options.limit"
          :disabled="item.options.disabled"
          :list-type="item.options.listType"
          :headers="item.options.headers?item.options.headers:{}"
          :data="item.options.data?item.options.data:{}"
          :name="item.options.name?item.options.name:''"
          @onSuccess="(response, file, fileList)=>{$emit('onSuccess',response, file, fileList)}"
          @beforeUpload="(file)=>{$emit('beforeUpload', file)}"
        />
        <UploadImg
          ref="b"
          v-model="formData[item.model]"
          v-if="item.type === 'uploadImg'"
          :style="'width:'+item.options.width+'%'"
          :action="item.options.action"
          :multiple="item.options.multiple"
          :limit="item.options.limit"
          :disabled="item.options.disabled"
          :list-type="item.options.listType"
          :headers="item.options.headers?item.options.headers:{}"
          :data="item.options.data?item.options.data:{}"
          :name="item.options.name?item.options.name:''"
          @onSuccess="(response, file, fileList)=>{$emit('onSuccess',response, file, fileList)}"
          @beforeUpload="(file)=>{$emit('beforeUpload', file)}"
        />
        <div
          v-if="item.type === 'super'"
        >
          <a
            :href="'https://'+item.options.url"
            target="_blank"
          >
            {{item.options.defaultValue}}
          </a>
        </div>
        <el-divider
          v-if="item.type === 'divider'"
          content-position="left"
        >
          {{item.label}}
        </el-divider>
        <TMKeditor
          v-if="item.type==='tMKeditor'"
          ref="KEditor"
          :style="`width:${item.options.width}%`"
          :record="item"
          :disabled="true"
        />
        <el-switch
          v-model="formData[item.model]"
          v-if="item.type === 'switch'"
          :defaultValue="item.options.switchValue"
          :active-text="item.options.activeText"
          :inactive-text="item.options.inactiveText"
          :disabled="item.options.disabled"
        />
        <div class="block"
             v-if="item.type === 'slider'"
        >
          <el-slider
            v-model="formData[item.model]"
            :defaultValue="item.options.numberDefaultValue"
            :disabled="item.options.disabled"
            :show-input="item.options.showInput"
            :step="item.options.step"
          />
        </div>
        <div
          v-if="item.type==='p'"
          :style="'width:'+item.options.width+'%; margin: 0; padding: 0; line-height: 20px; '"
          v-text="item.label"
        />
        <el-button
          v-if="item.type === 'button'"
          :type="item.options.buttonType"
          :disabled="item.options.disabled"
          :style="'margin-left:'+ item.options.width + '%'"
          @click="handleFormButton(item.options.handle)"
        >{{item.label}}</el-button>
      </el-form-item>
    </template>
  </div>
</template>

<script>
    import UploadImg from "../formDesignTCD/components/uploadImg"
    import UploadFile from "../formDesignTCD/components/uploadFile"
    export default {
        name: "FinalForm",
        components:{UploadImg,UploadFile},
        props:{
            typeList:{
                type: Array,
                default: ()=>[
                    "button",
                    "divider",
                    "card",
                    "grid",
                    "table",
                    "alert",
                    "html",
                    "p",
                    "divider"
                ]
            },
            dynamicData:{
                type: Object,
                default: ()=>{}
            },
            childTableColumns:{
                type: Array,
                default: ()=>[]
            },
            formData:{
                type: Object,
                required: true
            },
            item:{
                type: Object,
                required: true
            },
            layout:{
                type: Object,
                required: true
            }
        },
        data(){
            return{

            }
        },
        computed:{
            isLabel(){
                //判断是否是需要label的Node
                return this.typeList.includes(this.item.type);
            },
        },
        methods:{
            handleFormButton(type){
              this.$emit("clickFormButton", type)
            },
            handleAdd(index,array, model){
                //操作子表添加一行
                let item = {};
                this.childTableColumns.forEach((child,i)=>{
                    if(model === child.model){
                        item = JSON.parse(JSON.stringify(child))
                    }
                });
                delete item.model;
                array.splice(index,0,item)

            },
            handleDelete(index,array) {
                //操作子表删除指定行
                if (array.length>1){
                    array.splice(index,1)
                }
            }
        }
    }
</script>
