<template>
  <div style="width: 100%">
    <el-form-item
      :label="item.options.hidden||item.type==='tMKeditor'||isLabel?'':item.label"
      :required="item.rules?item.rules[0].required:false"
      :label-width="item.type==='tMKeditor'||isLabel?'0px':layout.labelWidth+'%'"
      :style="item.type==='tMKeditor'?'overflow:hidden':''"
    >

      <el-input
        v-if="item.type === 'input'"
        :placeholder="item.options.placeholder"
        :style="'width:'+item.options.width+'%'"
        v-model="item.options.defaultValue"
        :type="item.options.hidden?'hidden':'input'"
        :disabled="item.options.disabled"
        v-bind="{
              clearable:item.options.clearable,
            }"
      />
      <el-input
        v-if="item.type === 'text'"
        :placeholder="item.options.placeholder"
        :style="'width:'+item.options.width+'%'"
        v-model="item.options.defaultValue"
        :type="item.options.hidden?'hidden':'textarea'"
        :rows="item.options.height"
        :disabled="item.options.disabled"
        v-bind="{
              clearable:item.options.clearable,
            }"
      />
      <el-input-number
        v-if="item.type === 'number'"
        v-model="item.options.numberDefaultValue"
        :step="item.options.step"
        :style="'width:'+item.options.width+'%'"
        :min="item.options.min"
        :max="item.options.max"
        :precision="item.options.precision"
        :disabled="item.options.disabled"
      />
      <el-select
        v-if="item.type === 'select'"
        v-model="selectDefaultValue"
        :multiple="item.options.multiple"
        :placeholder="item.options.placeholder"
        :style="'width:'+item.options.width+'%'"
        :disabled="item.options.disabled"
        :clearable="item.options.clearable"
      >
        <el-option
          v-for="(items,index) in item.options.options"
          :key="index"
          :label="items.label"
          :value="items.value">
        </el-option>
      </el-select>
      <el-cascader
        v-if="item.type === 'cascader'"
        :options="item.options.options"
        v-model="selectDefaultValue"
        :props="{
          multiple:item.options.multiple
        }"
        :placeholder="item.options.placeholder"
        :style="'width:'+item.options.width+'%'"
        collapse-tags
        :disabled="item.options.disabled"
        :clearable="item.options.clearable"
      />
      <el-checkbox-group
        v-if="item.type === 'checkbox'"
        v-model="item.options.checkboxDefaultValue"
        :min="item.options.chooseMin"
        :max="item.options.chooseMax"
        :disabled="item.options.disabled"
      >
        <el-checkbox
                v-for="(items, i) in item.options.options"
                :label="items.value"
                :key="i">{{items.label}}</el-checkbox>
      </el-checkbox-group>
      <el-radio-group
        v-if="item.type === 'radio'"
        v-model="item.options.defaultValue"
        :disabled="item.options.disabled"
      >
        <el-radio
          v-for="(items, index) in item.options.options"
          :label="items.value"
          :key="index"
        >
          {{items.label}}
        </el-radio>
      </el-radio-group>
      <el-date-picker
        v-if="item.type === 'date'&&item.options.isChooseTimes==='2'"
        v-model="item.options.rangeDefaultValue"
        :style="'width:'+item.options.width+'%'"
        :type="item.options.isChooseTimes?'daterange':'date'"
        :range-separator="item.options.rangeSeparator"
        :start-placeholder="item.options.startPlaceholder"
        :end-placeholder="item.options.endPlaceholder"
        :disabled="item.options.disabled"
        :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
        />
      <el-date-picker
        v-if="item.type === 'date'&&item.options.isChooseTimes==='1'"
        v-model="item.options.defaultValue"
        :style="'width:'+item.options.width+'%'"
        type="date"
        :placeholder="item.options.placeholder"
        :format="item.options.format"
        :value-format="item.options.valueFormat"
        :disabled="item.options.disabled"
      />
      <el-time-picker
        v-if="item.type === 'time'"
        :style="'width:'+item.options.width+'%'"
        :is-range="item.options.isChooseTimes==='2'"
        v-model="item.options.defaultValue"
        :range-separator="item.options.rangeSeparator"
        :start-placeholder="item.options.startPlaceholder"
        :end-placeholder="item.options.endPlaceholder"
        :placeholder="item.options.isChooseTimes==='2'?'':item.options.placeholder"
        :disabled="item.options.disabled"
      />
      <el-upload
        v-if="item.type === 'uploadFile'"
        :style="'width:'+item.options.width+'%'"
        class="upload-demo"
        :action="item.options.action"
        :limit="item.options.limit"
        disabled
      >
        <el-button size="small" type="primary">{{ item.options.buttonText }}</el-button>
        <div slot="tip" class="el-upload__tip">{{ item.options.warnText }}</div>
      </el-upload>
      <el-upload
        v-if="item.type === 'uploadImg'"
        :action="item.options.action"
        :limit="item.options.limit"
        :list-type="item.options.listType"
        disabled
      >
        <i class="el-icon-plus"></i>
      </el-upload>
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
        布局控件
      </el-divider>
  <!--    <TipsWindow-->
  <!--      v-if="item.type === 'tipsWindow'"-->
  <!--    />-->
      <el-dialog :visible.sync="item.options.dialogVisible"  v-if="item.type === 'uploadImg'">
        <img width="100%" :src="item.options.dialogImageUrl" alt="">
      </el-dialog>
      <TMKeditor
        v-if="item.type==='tMKeditor'"
        ref="KEditor"
        :style="`width:${item.options.width}%`"
        :record="item"
        :disabled="true"
      />
      <el-switch
        v-if="item.type === 'switch'"
        v-model="item.options.switchValue"
        :active-text="item.options.activeText"
        :inactive-text="item.options.inactiveText"
        :disabled="item.options.disabled"
      />
      <div class="block"
           v-if="item.type === 'slider'"
      >
        <el-slider
          v-model="item.options.numberDefaultValue"
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
      >{{item.label}}</el-button>
    </el-form-item>
    <p id="control-key">{{item.key}}</p>
  </div>
</template>

<script>
  import TMKeditor from './tMkeditor'
    export default {
        name: "formNode",
        components:{TMKeditor, },
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
            layout:{
                type: Object,
                required: true
            },
            item:{
                type: Object,
                required: true
            }
        },
        computed:{
            isLabel(){
                //判断是否是需要label的Node
                return this.typeList.includes(this.item.type);
            },
            selectDefaultValue: {
              get() {
                return this.item.options.multiple?this.item.options.multipleDefaultValue:this.item.options.defaultValue
              },
              set(val) {
                this.item.options.multiple?this.item.options.multipleDefaultValue=val:this.item.options.defaultValue=val
              }
            }
        },
        data(){
            return {
            };
        },
    }
</script>
