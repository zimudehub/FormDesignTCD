<template>
    <el-form
      label-width="80px"
      :model="config"
      class="control-config-form"
      label-position="top"
      size="mini"
    >
      <p style="text-align: center; margin: 6px 0; font-size: 12px">{{config.key}}</p>
      <el-button
          type="primary"
          icon="el-icon-s-unfold"
          class="shrink-button"
          @click="handleShrink"
        />
      <el-form-item label="标签" v-if="config.hasOwnProperty('label')">
          <el-input v-model="config.label" clearable/>
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('buttonType')"/>
      <el-form-item v-if="config.options.hasOwnProperty('buttonType')" label="按钮类型">
        <el-radio-group v-model="config.options.buttonType" size="mini">
          <el-radio-button label="primary" type="primary">primary</el-radio-button>
          <el-radio-button label="success" type="success">success</el-radio-button>
          <el-radio-button label="danger" type="danger">danger</el-radio-button>
          <el-radio-button label="info" type="info">info</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('handle')"/>
      <el-form-item v-if="config.options.hasOwnProperty('handle')" label="按钮类型">
        <el-radio-group v-model="config.options.handle" size="mini">
          <el-radio-button label="submit">提交</el-radio-button>
          <el-radio-button label="clear">重置</el-radio-button>
          <el-radio-button label="doSomething">自定义</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('url')"/>
      <el-form-item v-if="config.options.hasOwnProperty('url')" label="连接地址">
        <el-input
          v-model="config.options.url"
          clearable
        />
      </el-form-item>
      <el-form-item v-if="config.options.hasOwnProperty('handle')&&config.options.handle==='doSomething'" label="自定义事件">
        <el-input
          type="textarea"
          :rows="6"
          v-model="config.options.dynamicFun"
        />
      </el-form-item>
      <el-divider v-if="config.hasOwnProperty('model')"/>
      <el-form-item v-if="config.hasOwnProperty('model')" label="数据字段">
          <el-input
            v-model="config.model"
            clearable
          />
        </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('width')" />
      <el-form-item v-if="config.options.hasOwnProperty('width')" :label="config.type==='button'?'按钮位置':'宽度(子表中控件宽度不生效)'">
          <div class="block">
            <el-slider
              v-model="config.options.width"
              :min="config.options.minWidth"
              :max="config.options.maxWidth?config.options.maxWidth:100"
              show-input>
            </el-slider>
          </div>
        </el-form-item>
      <el-form-item v-if="config.options.hasOwnProperty('height')" label="高度">
          <div class="block">
            <el-slider
              v-model="config.options.height"
              :min="3"
              :max="7"
              show-input>
            </el-slider>
          </div>
        </el-form-item>
      <UploadFileOrImg
          v-if="config.type==='uploadFile'||config.type==='uploadImg'"
          :options="config.options"
      />
      <el-divider v-if="config.options.hasOwnProperty('gutter')" />
      <el-form-item v-if="config.options.hasOwnProperty('gutter')" label="格栅间距">
        <el-input-number
          v-model="config.options.gutter"
          :min="0"
          controls-position="right"
          size="mini"
        />
      </el-form-item>
      <div style="margin-top: 8px" v-if="config.hasOwnProperty('columns')">
        <div style="font-size: 14px">格栅配置</div>
        <el-row v-for="(item,index) in config.columns" :key="index" :gutter="5" style="margin-top: 6px">
          <el-col :span="12" >
            <el-input-number
              v-model="item.span"
              :max="24"
              :min="0"
              controls-position="right"
              size="mini"
            />
          </el-col>
          <el-col :span="6">
            <el-button style="padding: 7px" type="danger" icon="el-icon-delete" circle @click="deleteItem(config.columns,index)"></el-button>
          </el-col>
        </el-row>
        <a href="#" @click="addItem(config.columns)" style="text-decoration:none; font-size: 14px">增加数据</a>
      </div>
      <el-divider v-if="config.options.hasOwnProperty('options')"/>
      <el-form-item label="下拉框数据" v-if="config.options.hasOwnProperty('options')" >
          <el-radio-group v-model="config.options.dynamic"  >
            <el-radio-button :label="false" >静态数据</el-radio-button>
            <el-radio-button :label="true" >动态数据</el-radio-button>
          </el-radio-group>
          <TOptionAdd v-model="config.options.options" v-if="!config.options.dynamic"/>
          <el-input style="margin-top: 10px" v-else v-model="config.options.dynamicKey" placeholder="请输入动态数据地址"></el-input>
        </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('chooseMax')"></el-divider>
      <el-form-item v-if="config.options.hasOwnProperty('chooseMax')" label="最多可选数">
          <el-input-number
            v-model="config.options.chooseMax"
            :min="0"
            :max="config.options.options.length"
          />
        </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('chooseMin')"></el-divider>
      <el-form-item v-if="config.options.hasOwnProperty('chooseMin')" label="最少可选数">
          <el-input-number
            v-model="config.options.chooseMin"
            :min="0"
            :max="config.options.options.length-1"
          />
        </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('defaultValue')&&!config.options.hasOwnProperty('isChooseTimes')"></el-divider>
      <el-form-item v-if="config.options.hasOwnProperty('defaultValue')&&!config.options.hasOwnProperty('isChooseTimes')" :label="config.type==='number'?'默认值(必须为数字)':'默认值'">
        <el-select
          v-if="config.type === 'select'"
          v-model="selectDefaultValue"
          :multiple="config.options.multiple"
        >
          <el-option
            v-for="(items,index) in config.options.options"
            :key="index"
            :label="items.label"
            :value="items.value">
          </el-option>
        </el-select>
        <el-cascader
          v-else-if="config.type === 'cascader'"
          :options="config.options.options"
          v-model="selectDefaultValue"
          :props="{
            multiple:config.options.multiple
          }"
          collapse-tags
          filterable
        />
        <el-input
          v-else
          v-model="config.options.defaultValue"
          clearable
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('showInput')" />
      <el-form-item v-if="config.options.hasOwnProperty('showInput')" label="是否显示计数器">
        <el-switch
          v-model="config.options.showInput"
          active-text="显示"
          inactive-text="不显示"
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('switchValue')" />
      <el-form-item v-if="config.options.hasOwnProperty('switchValue')" label="默认值">
        <el-switch
          v-model="config.options.switchValue"
          :active-text="config.options.activeText"
          :inactive-text="config.options.inactiveText"
          :disabled="config.options.disabled"
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('inactiveText')"/>
      <el-form-item v-if="config.options.hasOwnProperty('inactiveText')" label="左侧提示文字">
        <el-input v-model="config.options.inactiveText"/>
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('activeText')"/>
      <el-form-item v-if="config.options.hasOwnProperty('activeText')" label="右侧提示文字">
        <el-input v-model="config.options.activeText"/>
      </el-form-item>
      <TimeOrDate v-if="config.options.hasOwnProperty('isChooseTimes')" v-model="config"/>
      <el-divider v-if="config.options.hasOwnProperty('min')"></el-divider>
      <el-form-item v-if="config.options.hasOwnProperty('min')" label="最小值">
          <el-input-number v-model="config.options.min" ></el-input-number>
        </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('max')"></el-divider>
      <el-form-item v-if="config.options.hasOwnProperty('max')" label="最大值">
          <el-input-number v-model="config.options.max" ></el-input-number>
        </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('numberDefaultValue')"></el-divider>
      <el-form-item v-if="config.options.hasOwnProperty('numberDefaultValue')" label="默认值">
        <el-input-number
          v-model="config.options.numberDefaultValue"
          :min="config.options.min"
          :max="config.options.max"
        />
      </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('precision')"></el-divider>
      <el-form-item v-if="config.options.hasOwnProperty('precision')" label="精度(小数位数)">
          <el-input-number v-model="config.options.precision" :min="0"></el-input-number>
        </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('step')"></el-divider>
      <el-form-item v-if="config.options.hasOwnProperty('step')" label="步数">
          <el-input-number v-model="config.options.step" ></el-input-number>
        </el-form-item>
      <el-divider v-if="config.options.hasOwnProperty('placeholder')&&!config.options.hasOwnProperty('isChooseTimes')"></el-divider>
      <el-form-item label="提示信息" v-if="config.options.hasOwnProperty('placeholder')&&!config.options.hasOwnProperty('isChooseTimes')">
          <el-input v-model="config.options.placeholder"></el-input>
        </el-form-item>
      <el-divider v-if="showCheckbox"></el-divider>
      <el-form-item label="操作" v-if="showCheckbox">
        <el-checkbox v-model="config.options.disabled" v-if="config.options.hasOwnProperty('disabled')">禁用</el-checkbox>
        <el-checkbox v-model="config.options.hidden" v-if="config.options.hasOwnProperty('hidden')">隐藏</el-checkbox>
        <el-checkbox v-model="config.options.clearable" v-if="config.options.hasOwnProperty('clearable')">可清除</el-checkbox>
        <el-checkbox v-model="config.options.multiple" v-if="config.options.hasOwnProperty('multiple')">可多选</el-checkbox>
      </el-form-item>
      <el-divider v-if="config.hasOwnProperty('rules')"></el-divider>
      <el-form-item label="校验规则(子表中校验规则不生效)" v-if="config.hasOwnProperty('rules')">
        <div v-for="(item,index) in config.rules" :key="index" style="margin-top: 6px">
          <el-row v-if="index === 0">
            <el-col  :span="24" >
              <el-checkbox v-if="config.hasOwnProperty('rules')" v-model="config.rules[0].required">必填项</el-checkbox>
            </el-col>
          </el-row>
          <el-row v-else>
            <el-col  :span="18" >
              <el-input
                v-model="item.pattern"
                placeholder="请输入正则"
              />
            </el-col>
            <el-col :span="18">
              <el-input
                v-model="item.message"
                placeholder="请输入提示内容"
              />
            </el-col>
            <el-col :span="6">
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteRule(config.rules,index)"></el-button>
            </el-col>
          </el-row>
        </div>
        <div>
          <a href="#" @click="handleAddRules(config.rules)">增加验证规则</a>
        </div>
      </el-form-item>
    </el-form>
</template>

<script>
  import TOptionAdd from '../components/tOptionAdd';
  import TimeOrDate from '../components/timeOrDateConfig'
  import UploadFileOrImg from '../components/uploadFileOrImg'
    export default {
        name: "tFormControlConfig",
        components:{TOptionAdd, TimeOrDate, UploadFileOrImg},
        props:{
            config:{
                type: Object,
                required: true
            },
        },

        data(){
            return{
                radio:'1',
            }
        },
        computed:{
            showCheckbox(){
                const options = this.config.options;
                return options.hasOwnProperty('clearable') || options.hasOwnProperty('hidden') || options.hasOwnProperty('disabled');
            },
          selectDefaultValue: {
            get() {
              return this.config.options.multiple?this.config.options.multipleDefaultValue:this.config.options.defaultValue
            },
            set(val) {
              this.config.options.multiple?this.config.options.multipleDefaultValue=val:this.config.options.defaultValue=val
            }
          }
        },
        methods:{
            addItem(columns){
                columns.push({
                    span: 12,
                    list: []
                })
            },
            addModel(){
                // this.$emit('addModel')
            },
            handleShrink(){
                this.$emit('shrink')
            },
            handleAddRules(array){
                array.push({
                    pattern: "",
                    message: ""
                })
            },
            deleteRule(array,i){
                array.splice(i,1)
            },
            deleteItem(columns,i){
                columns.splice(i,1)
            }
        }
    }
</script>
