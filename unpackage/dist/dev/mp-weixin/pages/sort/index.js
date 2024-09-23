"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_tabbar2 = common_vendor.resolveComponent("u-tabbar");
  _easycom_u_tabbar2();
}
const _easycom_u_tabbar = () => "../../uni_modules/vk-uview-ui/components/u-tabbar/u-tabbar.js";
if (!Math) {
  _easycom_u_tabbar();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let list = common_vendor.ref([
      {
        iconPath: "home",
        selectedIconPath: "home-fill",
        text: "首页",
        customIcon: false,
        pagePath: "/pages/home/index"
      },
      {
        iconPath: "photo",
        selectedIconPath: "photo-fill",
        text: "分类",
        customIcon: false,
        pagePath: "/pages/sort/index"
      },
      {
        iconPath: "account",
        selectedIconPath: "account-fill",
        text: "我的",
        customIcon: false,
        pagePath: "/pages/my/index"
      }
    ]);
    let current = common_vendor.ref(0);
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(($event) => common_vendor.isRef(current) ? current.value = $event : current = $event),
        b: common_vendor.p({
          list: common_vendor.unref(list),
          modelValue: common_vendor.unref(current)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/sort/index.vue"]]);
wx.createPage(MiniProgramPage);
