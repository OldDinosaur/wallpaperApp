"use strict";
const common_vendor = require("../../common/vendor.js");
if (!Array) {
  const _easycom_u_section2 = common_vendor.resolveComponent("u-section");
  const _easycom_u_grid_item2 = common_vendor.resolveComponent("u-grid-item");
  const _easycom_u_grid2 = common_vendor.resolveComponent("u-grid");
  const _easycom_u_tabbar2 = common_vendor.resolveComponent("u-tabbar");
  (_easycom_u_section2 + _easycom_u_grid_item2 + _easycom_u_grid2 + _easycom_u_tabbar2)();
}
const _easycom_u_section = () => "../../uni_modules/vk-uview-ui/components/u-section/u-section.js";
const _easycom_u_grid_item = () => "../../uni_modules/vk-uview-ui/components/u-grid-item/u-grid-item.js";
const _easycom_u_grid = () => "../../uni_modules/vk-uview-ui/components/u-grid/u-grid.js";
const _easycom_u_tabbar = () => "../../uni_modules/vk-uview-ui/components/u-tabbar/u-tabbar.js";
if (!Math) {
  (_easycom_u_section + _easycom_u_grid_item + _easycom_u_grid + _easycom_u_tabbar)();
}
const _sfc_main = {
  __name: "index",
  setup(__props) {
    common_vendor.index.request({
      url: "/test/test",
      method: "GET"
    }).then((res) => {
      console.log(res.data);
    }).catch((err) => {
      console.error(err);
    });
    let interviewList = common_vendor.reactive([
      {
        id: 0,
        title: "HTML",
        icon: "t-icon-html"
      },
      {
        id: 1,
        title: "JS",
        icon: "t-icon-js"
      },
      {
        id: 2,
        title: "CSS",
        icon: "t-icon-css"
      },
      {
        id: 3,
        title: "VUE",
        icon: "t-icon-Vue"
      },
      {
        id: 4,
        title: "算法",
        icon: "t-icon-suanfaku"
      },
      {
        id: 5,
        title: "nodejs",
        icon: "t-icon-Nodejs"
      },
      {
        id: 6,
        title: "浏览器",
        icon: "t-icon-liulanqi1"
      },
      {
        id: 7,
        title: "其他",
        icon: "t-icon-qitafuwu"
      }
    ]);
    let exampleList = common_vendor.reactive([{
      id: 0,
      title: "其他",
      icon: "t-icon-qitafuwu",
      url: "/pages/home/example/index"
    }]);
    let orderList = common_vendor.reactive([
      {
        id: 0,
        title: "壁纸",
        icon: "t-icon-tupian1",
        url: "/pages/home/wall/index"
      },
      {
        id: 1,
        title: "视频",
        icon: "t-icon-shipin",
        url: "/pages/home/video/index"
        // url: '/pages/webview/webview?url=' + encodeURIComponent('https://www.agedm.org/')
      },
      {
        id: 2,
        title: "其他",
        icon: "t-icon-qitafuwu"
      }
    ]);
    const orderTo = (item) => {
      if (item.url) {
        common_vendor.index.navigateTo({
          url: item.url,
          success: function(res) {
            res.eventChannel.emit("acceptDataFromOpenerPage", {
              tab: item.tab
            });
          }
        });
      }
    };
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
          title: "技术",
          right: false
        }),
        b: common_vendor.f(common_vendor.unref(interviewList), (item, k0, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: item.id,
            c: common_vendor.o(($event) => orderTo(item), item.id),
            d: "4978fed5-2-" + i0 + ",4978fed5-1"
          };
        }),
        c: common_vendor.p({
          col: 3
        }),
        d: common_vendor.p({
          title: "实例",
          right: false
        }),
        e: common_vendor.f(common_vendor.unref(exampleList), (item, k0, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: item.id,
            c: common_vendor.o(($event) => orderTo(item), item.id),
            d: "4978fed5-5-" + i0 + ",4978fed5-4"
          };
        }),
        f: common_vendor.p({
          col: 3
        }),
        g: common_vendor.p({
          title: "其他",
          right: false
        }),
        h: common_vendor.f(common_vendor.unref(orderList), (item, k0, i0) => {
          return {
            a: common_vendor.n(item.icon),
            b: item.id,
            c: common_vendor.o(($event) => orderTo(item), item.id),
            d: "4978fed5-8-" + i0 + ",4978fed5-7"
          };
        }),
        i: common_vendor.p({
          col: 3
        }),
        j: common_vendor.o(($event) => common_vendor.isRef(current) ? current.value = $event : current = $event),
        k: common_vendor.p({
          list: common_vendor.unref(list),
          modelValue: common_vendor.unref(current)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-4978fed5"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
