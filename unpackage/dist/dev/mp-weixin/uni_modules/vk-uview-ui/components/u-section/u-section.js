"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  emits: ["click"],
  name: "u-section",
  props: {
    // 标题信息
    title: {
      type: String,
      default: ""
    },
    // 右边副标题内容
    subTitle: {
      type: String,
      default: "更多"
    },
    // 是否显示右边的内容
    right: {
      type: Boolean,
      default: true
    },
    fontSize: {
      type: [Number, String],
      default: 28
    },
    // 主标题是否加粗
    bold: {
      type: Boolean,
      default: true
    },
    // 主标题的颜色
    color: {
      type: String,
      default: "#303133"
    },
    // 右边副标题的颜色
    subColor: {
      type: String,
      default: "#909399"
    },
    // 是否显示左边的竖条
    showLine: {
      type: Boolean,
      default: true
    },
    // 左边竖线的颜色
    lineColor: {
      type: String,
      default: ""
    },
    // 是否显示右边箭头
    arrow: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    // 左边竖条的样式
    lineStyle() {
      return {
        // 由于竖线为字体图标，具有比实际线宽更宽的宽度，所以也需要根据字体打下动态调整
        left: -(Number(this.fontSize) * 0.9) + "rpx",
        top: -(Number(this.fontSize) * (this.$u.os() == "ios" ? 0.14 : 0.15)) + "rpx"
      };
    }
  },
  methods: {
    rightClick() {
      this.$emit("click");
    }
  }
};
if (!Array) {
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  _easycom_u_icon2();
}
const _easycom_u_icon = () => "../u-icon/u-icon.js";
if (!Math) {
  _easycom_u_icon();
}
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return common_vendor.e({
    a: $props.showLine
  }, $props.showLine ? {
    b: common_vendor.p({
      top: "0",
      name: "column-line",
      size: $props.fontSize * 1.25,
      bold: true,
      color: $props.lineColor ? $props.lineColor : $props.color
    }),
    c: common_vendor.s($options.lineStyle)
  } : {}, {
    d: common_vendor.t($props.title),
    e: $props.bold ? "bold" : "normal",
    f: $props.color,
    g: $props.fontSize + "rpx",
    h: $props.showLine ? $props.fontSize * 0.7 + "rpx" : 0,
    i: $props.showLine ? 1 : "",
    j: $props.right || _ctx.$slots.right
  }, $props.right || _ctx.$slots.right ? common_vendor.e({
    k: _ctx.$slots.right
  }, _ctx.$slots.right ? {} : common_vendor.e({
    l: common_vendor.t($props.subTitle),
    m: $props.arrow
  }, $props.arrow ? {
    n: common_vendor.p({
      name: "arrow-right",
      size: "24",
      color: $props.subColor
    })
  } : {}), {
    o: $props.subColor,
    p: common_vendor.o((...args) => $options.rightClick && $options.rightClick(...args))
  }) : {});
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-e64769b9"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/uni_modules/vk-uview-ui/components/u-section/u-section.vue"]]);
wx.createComponent(Component);
