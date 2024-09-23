"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_uv_tabbar_item2 = common_vendor.resolveComponent("uv-tabbar-item");
  const _easycom_uv_tabbar2 = common_vendor.resolveComponent("uv-tabbar");
  (_easycom_uv_tabbar_item2 + _easycom_uv_tabbar2)();
}
const _easycom_uv_tabbar_item = () => "../../uni_modules/uv-tabbar/components/uv-tabbar-item/uv-tabbar-item.js";
const _easycom_uv_tabbar = () => "../../uni_modules/uv-tabbar/components/uv-tabbar/uv-tabbar.js";
if (!Math) {
  (home + sort + my + _easycom_uv_tabbar_item + _easycom_uv_tabbar)();
}
const home = () => "../home/index.js";
const sort = () => "../sort/index.js";
const my = () => "../my/index.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let value = common_vendor.ref(0);
    function change(index) {
      value.value = index;
      if (value.value === 0) {
        console.log(0);
      }
      if (value.value === 1) {
        console.log(1);
      }
      if (value.value === 2) {
        console.log(2);
      }
    }
    return (_ctx, _cache) => {
      return common_vendor.e({
        a: common_vendor.unref(value) === 0
      }, common_vendor.unref(value) === 0 ? {} : {}, {
        b: common_vendor.unref(value) === 1
      }, common_vendor.unref(value) === 1 ? {} : {}, {
        c: common_vendor.unref(value) === 2
      }, common_vendor.unref(value) === 2 ? {} : {}, {
        d: common_vendor.p({
          text: "首页",
          icon: "home"
        }),
        e: common_vendor.p({
          text: "分类",
          icon: "photo"
        }),
        f: common_vendor.p({
          text: "我的",
          icon: "account"
        }),
        g: common_vendor.o(change),
        h: common_vendor.p({
          value: common_vendor.unref(value),
          fixed: true,
          safeAreaInsetBottom: true
        })
      });
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/index/index.vue"]]);
wx.createPage(MiniProgramPage);
