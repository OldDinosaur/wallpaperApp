"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_section2 = common_vendor.resolveComponent("u-section");
  const _easycom_u_grid_item2 = common_vendor.resolveComponent("u-grid-item");
  const _easycom_u_grid2 = common_vendor.resolveComponent("u-grid");
  const _easycom_u_icon2 = common_vendor.resolveComponent("u-icon");
  const _easycom_u_tabbar2 = common_vendor.resolveComponent("u-tabbar");
  (_easycom_u_section2 + _easycom_u_grid_item2 + _easycom_u_grid2 + _easycom_u_icon2 + _easycom_u_tabbar2)();
}
const _easycom_u_section = () => "../../uni_modules/vk-uview-ui/components/u-section/u-section.js";
const _easycom_u_grid_item = () => "../../uni_modules/vk-uview-ui/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../uni_modules/vk-uview-ui/components/u-grid/u-grid.js";
const _easycom_u_icon = () => "../../uni_modules/vk-uview-ui/components/u-icon/u-icon.js";
const _easycom_u_tabbar = () => "../../uni_modules/vk-uview-ui/components/u-tabbar/u-tabbar.js";
if (!Math) {
  (_easycom_u_section + _easycom_u_grid_item + _easycom_u_grid + _easycom_u_icon + _easycom_u_tabbar)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let interviewList = common_vendor.reactive([
      {
        id: 0,
        title: "HTML",
        icon: "html"
      },
      {
        id: 1,
        title: "JS",
        icon: "js"
      },
      {
        id: 2,
        title: "CSS",
        icon: "css"
      }
    ]);
    common_vendor.reactive([
      {
        id: 0,
        title: "壁纸"
      },
      {
        id: 1,
        title: "视频"
      },
      {
        id: 2,
        title: "其他"
      }
    ]);
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
        a: common_vendor.p({
          title: "面试题",
          right: false
        }),
        b: common_vendor.f(common_vendor.unref(interviewList), (item, k0, i0) => {
          return {
            a: common_vendor.t(item.title),
            b: item.id,
            c: "4978fed5-2-" + i0 + ",4978fed5-1"
          };
        }),
        c: common_vendor.p({
          col: 3
        }),
        d: common_vendor.p({
          title: "其他",
          right: false
        }),
        e: common_vendor.p({
          name: "photo",
          size: 46
        }),
        f: common_vendor.p({
          name: "lock",
          size: 46
        }),
        g: common_vendor.p({
          name: "lock",
          size: 46
        }),
        h: common_vendor.p({
          col: 3
        }),
        i: common_vendor.o(($event) => common_vendor.isRef(current) ? current.value = $event : current = $event),
        j: common_vendor.p({
          list: common_vendor.unref(list),
          modelValue: common_vendor.unref(current)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
