export const baseList=[
  {
    type: "input",//控件类型
    icon: "el-icon-edit",//图标
    label: "输入框",//控件名字
    options: {
      label: "输入框",
      minWidth:10,
      width: 100, // 宽度
      defaultValue: "", // 默认值
      placeholder: "请输入", // 没有输入时，提示文字
      clearable: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false // 是否禁用，false不禁用，true禁用
    },
    model: "", // 数据字段
    key: "",
    rules: [
      //验证规则
      {
        required: false, // 必须填写
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "text",//控件类型
    icon: "el-icon-edit-outline",//图标
    label: "文本域",//控件名字
    options: {
      minWidth:10,
      width: 100, // 宽度
      height:3,//高度
      defaultValue: "", // 默认值
      placeholder: "请输入", // 没有输入时，提示文字
      clearable: false,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false // 是否禁用，false不禁用，true禁用
    },
    model: "", // 数据字段
    key: "",
    rules: [
      //验证规则
      {
        required: false, // 必须填写
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "number",//控件类型
    icon: "el-icon-c-scale-to-original",//图标
    label: "计数器",//控件名字
    options: {
      minWidth:40,
      width: 40, // 宽度
      numberDefaultValue: 0, // 默认值
      min: -999999999, // 可输入最小值
      max: 99999999999,
      step:1,
      precision:null,
      disabled: false // 是否禁用，false不禁用，true禁用
    },
    model: "", // 数据字段
    key: "",
    rules: [
      {
        required: false,
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "select",//控件类型
    icon: "el-icon-caret-bottom",//图标
    label: "下拉选择框",//控件名字
    options: {
      width: 100, // 宽度
      minWidth:20,
      multiple:false,
      defaultValue: "1", // 下拉选框请使用null为默认值
      multipleDefaultValue:[],
      disabled: false, // 是否禁用
      clearable: false, // 是否显示清除按钮
      placeholder: "请选择", // 默认提示文字
      dynamicKey: "",
      dynamic: false,
      options: [
        // 下拉选择项配置
        {
          value: "1",
          label: "选项1",
        },
        {
          value: "2",
          label: "选项2",
        },
      ],
      showSearch: false // 是否显示搜索框，搜索选择的项的值，而不是文字
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "cascader", // 表单类型
    label: "级联选择器", // 标题文字
    icon: "el-icon-office-building",
    options: {
      width: 100,
      multipleDefaultValue:[],
      multiple:false,
      disabled: false, //是否禁用
      defaultValue: "1", // 默认值
      showSearch: false, // 是否显示搜索框，搜索选择的项的值，而不是文字
      placeholder: "请选择",
      clearable: false, // 是否显示清除按钮
      dynamicKey: "",
      dynamic: true,
      options: [
        {
          value: "1",
          label: "选项1",
          children: [
            {
              value: "11",
              label: "选项11"
            }
          ]
        },
        {
          value: "2",
          label: "选项2",
          children: [
            {
              value: "22",
              label: "选项22"
            }
          ]
        }
      ]
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项"
      }
    ]
  },
  {
    type: "checkbox",//控件类型
    icon: "el-icon-tickets",//图标
    label: "多选框",//控件名字
    options: {
      disabled: false, //是否禁用
      checkboxDefaultValue: [],
      chooseMin:1,
      chooseMax:3,
      dynamicKey: "",
      dynamic: false,
      options: [
        {
          value: "1",
          label: "选项1",
        },
        {
          value: "2",
          label: "选项2",
        },
        {
          value: "3",
          label: "选项3",
        }
      ]
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "radio",//控件类型
    icon: "el-icon-remove-outline",//图标
    label: "单选框",
    options: {
      disabled: false, //是否禁用
      defaultValue: null, // 默认值
      dynamicKey: "",
      dynamic: false,
      options: [
        {
          value: "1",
          label: "选项1",
        },
        {
          value: "2",
          label: "选项2",
        },
      ]
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "date",//控件类型
    icon: "el-icon-stopwatch",//图标
    label: "日期选择器",
    options: {
      width: 100, // 宽度
      defaultValue: "", // 默认值，字符串 12:00:00
      rangeDefaultValue: [ "", "" ], // 默认值，字符串 12:00:00
      disabled: false, // 是否禁用
      placeholder: "请选择日期点",
      format:"yyyy 年 MM 月 dd 日",//展示格式
      isChooseTimes: "1",//是否是选择一个时间段1是时间点
      valueFormat:"timestamp",//解析格式
      rangeSeparator:"至",//时间段选择中间文字
      startPlaceholder:"开始日期",//时间段选择前文字
      endPlaceholder:"结束日期",//时间段选择后文字
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "time",//控件类型
    icon: "el-icon-date",//图标
    label: "时间选择器",
    options: {
      isChooseTimes: "1",//是否是选择一个时间段
      width: 100, // 宽度
      defaultValue: "", // 默认值，字符串 12:00:00
      clearable: false, // 是否显示清除按钮
      placeholder: "请选择时间点",
      format: "HH:mm:ss", // 展示格式
      rangeSeparator:"至",//时间段选择中间文字
      startPlaceholder:"开始时间",//时间段选择前文字
      endPlaceholder:"结束时间",//时间段选择后文字
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "uploadFile",//控件类型
    icon: "el-icon-upload2",//图标
    label: "上传文件",
    options: {
      uploadDefaultValue: [],
      multiple: true,
      disabled: false,
      drag: false,
      width: 100,
      limit: 3,
      buttonText:"点击上传",
      warnText:"只能上传jpg/png文件，且不超过500kb",
      action: "http://cdn.kcz66.com/uploadFile.txt",
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "uploadImg",//控件类型
    icon: "el-icon-picture-outline",//图标
    label: "上传图片",
    options: {
      uploadDefaultValue: "",
      multiple: true,
      disabled: false,
      width: 100,
      limit: 3,
      action: "https://jsonplaceholder.typicode.com/posts/",
      listType: "picture-card",
      dialogVisible:false,
      dialogImageUrl:""
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "button",//控件类型
    icon: "el-icon-thumb",//图标
    label: "按钮",
    options: {
      width:0,
      maxWidth:80,
      buttonType: "primary",
      handle: "submit",
      dynamicFun: "",
      disabled:false
    },
    key: ""
  },
  {
    type: "switch",//控件类型
    icon: "el-icon-open",//图标
    label: "开关",
    options: {
      switchValue: "1", // 默认值 Boolean 类型
      disabled: false, // 是否禁用
      activeText:"开",
      inactiveText:"关"
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  {
    type: "slider",//控件类型
    icon: "el-icon-set-up",//图标
    label: "滑动输入条",
    options: {
      width: 100, // 宽度
      numberDefaultValue: 0, // 默认值， 如果range为true的时候，则需要改成数组,如：[12,15]
      disabled: false, // 是否禁用
      min: 0, // 最小值
      max: 100, // 最大值
      step: 1, // 步长，取值必须大于 0，并且可被 (max - min) 整除
      showInput: true // 是否显示输入框，range为true时，请勿开启
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项",
        trigger: 'blur'
      }
    ]
  },
  // {
  //   type: "tipsWindow",//控件类型
  //   icon: "el-icon-copy-document",//图标
  //   label: "弹出选择框",
  //   options: {
  //     width: 100, // 宽度
  //     defaultValue: "", // 默认值
  //     placeholder: "请输入", // 没有输入时，提示文字
  //     clearable: false,
  //     hidden: false, // 是否隐藏，false显示，true隐藏
  //     disabled: false // 是否禁用，false不禁用，true禁用
  //   },
  // },
  {
    type: "childTable",
    label: "子表",
    icon: "el-icon-menu",
    list: [],
    options: {

    },
    model: "",
    key: ""
  },
  {
    type: "p",//控件类型
    icon: "el-icon-notebook-2",//图标
    label: "文字",
    options: {
      width: 100, // 宽度
    },
  },
  {
    type: "super",//控件类型
    icon: "el-icon-link",//图标
    label: "超链接",
    options: {
      defaultValue: "点击这跳转", // 默认值
      url:"",//跳转连接
    },
  },
  {
    type: "tMKeditor",//控件类型
    icon: "el-icon-s-grid",//图标
    label: "富文本",
    list: [],
    options: {
      height: 3,
      placeholder: "请dada",
      chinesization: true,
      hidden: false, // 是否隐藏，false显示，true隐藏
      disabled: false,
      showLabel: false,
      width: 100
    },
    model: "",
    key: "",
    rules: [
      {
        required: false,
        message: "必填项"
      }
    ]
  },
];
//布局控件
export const layoutList = [
  {
    type: "divider",
    label: "分割线",
    icon: "el-icon-minus",
    options: {
      orientation: "left"
    },
    key: "",
    model: ""
  },
  {
    type: "card",
    label: "卡片布局",
    icon: "el-icon-postcard",
    list: [],
    key: "",
    model: "",
    options: {
    },
  },
  {
    type: "grid",
    label: "栅格布局",
    icon: "el-icon-s-grid",
    columns: [
      {
        span: 12,
        list: []
      },
      {
        span: 12,
        list: []
      },
    ],
    options: {
      gutter: 0
    },
    key: "",
    model: ""
  },
  {
    type: "table",
    label: "表格布局",
    icon: "el-icon-menu",
    trs: [
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      },
      {
        tds: [
          {
            colspan: 1,
            rowspan: 1,
            list: []
          },
          {
            colspan: 1,
            rowspan: 1,
            list: []
          }
        ]
      }
    ],
    options: {
      width: "100%",
      bordered: true,
      bright: false,
      small: true,
      customStyle: ""
    },
    key: "",
    model: ""
  }
];
