"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_u_lazy_load2 = common_vendor.resolveComponent("u-lazy-load");
  const _easycom_u_waterfall2 = common_vendor.resolveComponent("u-waterfall");
  const _easycom_u_back_top2 = common_vendor.resolveComponent("u-back-top");
  const _easycom_u_loadmore2 = common_vendor.resolveComponent("u-loadmore");
  (_easycom_u_lazy_load2 + _easycom_u_waterfall2 + _easycom_u_back_top2 + _easycom_u_loadmore2)();
}
const _easycom_u_lazy_load = () => "../../uni_modules/vk-uview-ui/components/u-lazy-load/u-lazy-load.js";
const _easycom_u_waterfall = () => "../../uni_modules/vk-uview-ui/components/u-waterfall/u-waterfall.js";
const _easycom_u_back_top = () => "../../uni_modules/vk-uview-ui/components/u-back-top/u-back-top.js";
const _easycom_u_loadmore = () => "../../uni_modules/vk-uview-ui/components/u-loadmore/u-loadmore.js";
if (!Math) {
  (_easycom_u_lazy_load + _easycom_u_waterfall + _easycom_u_back_top + _easycom_u_loadmore)();
}
const _sfc_main = {
  __name: "moreList",
  setup(__props) {
    const uWaterfall1 = common_vendor.ref(null);
    let tab = common_vendor.ref(null);
    let scrollTop = common_vendor.ref(0);
    common_vendor.onPageScroll((e) => {
      scrollTop.value = e.scrollTop;
    });
    common_vendor.onLoad(() => {
      const pages = getCurrentPages();
      const page = pages[pages.length - 1];
      const eventChannel = page.getOpenerEventChannel();
      eventChannel.on("acceptDataFromOpenerPage", (data) => {
        common_vendor.index.setNavigationBarTitle({
          title: data.tab || "更多"
        });
        tab.value = data.tab;
        addRandomData();
      });
    });
    let loadStatus = common_vendor.ref("loadmore");
    let flowList = common_vendor.ref([]);
    common_vendor.ref([]);
    common_vendor.onReachBottom(() => {
      loadStatus.value = "loading";
      setTimeout(() => {
        addRandomData();
        loadStatus.value = "loadmore";
      }, 1e3);
    });
    const addRandomData = () => {
      utils_request.request.request("https://api.waifu.im/search", "get", {
        "included_tags": tab.value,
        "limit": 10
      }).then((res) => {
        console.log(res);
        for (let pic of res.images) {
          flowList.value.push(pic);
        }
      });
    };
    const showPic = (item) => {
      common_vendor.index.previewImage({
        current: 1,
        // 当前显示图片索引
        urls: [item],
        // 需要预览的图片http链接列表
        longPressActions: {
          itemList: ["保存图片"],
          success: function(data) {
            if (data.tapIndex === 0) {
              savePic(item);
            }
          },
          fail: function(err) {
            console.log(err.errMsg);
          }
        }
      });
    };
    const savePic = (src) => {
      common_vendor.index.downloadFile({
        url: src,
        success(res) {
          common_vendor.index.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success() {
              common_vendor.index.showToast({
                title: "保存成功",
                icon: "succeed"
              });
            },
            fail(err) {
              common_vendor.index.showToast({
                title: "保存失败",
                icon: "error"
              });
            }
          });
        }
      });
    };
    return (_ctx, _cache) => {
      return {
        a: common_vendor.w(({
          leftList
        }, s0, i0) => {
          return {
            a: common_vendor.f(leftList, (item, index, i1) => {
              return {
                a: common_vendor.o(($event) => showPic(item.url), index),
                b: "cb5fdae2-1-" + i0 + "-" + i1 + ",cb5fdae2-0",
                c: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "10",
                  image: item.url,
                  index
                }),
                d: common_vendor.t(item.artist ? item.artist.name : "未知"),
                e: common_vendor.t(item.shop),
                f: index
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "left",
          path: "a",
          vueId: "cb5fdae2-0"
        }),
        b: common_vendor.w(({
          rightList
        }, s0, i0) => {
          return {
            a: common_vendor.f(rightList, (item, index, i1) => {
              return {
                a: common_vendor.o(($event) => showPic(item.url), index),
                b: "cb5fdae2-2-" + i0 + "-" + i1 + ",cb5fdae2-0",
                c: common_vendor.p({
                  threshold: "-450",
                  ["border-radius"]: "10",
                  image: item.url,
                  index
                }),
                d: common_vendor.t(item.artist ? item.artist.name : "未知"),
                e: common_vendor.t(item.shop),
                f: index
              };
            }),
            b: i0,
            c: s0
          };
        }, {
          name: "right",
          path: "b",
          vueId: "cb5fdae2-0"
        }),
        c: common_vendor.sr(uWaterfall1, "cb5fdae2-0", {
          "k": "uWaterfall1"
        }),
        d: common_vendor.o(($event) => common_vendor.isRef(flowList) ? flowList.value = $event : flowList = $event),
        e: common_vendor.p({
          idKey: "image_id",
          modelValue: common_vendor.unref(flowList)
        }),
        f: common_vendor.p({
          ["scroll-top"]: common_vendor.unref(scrollTop)
        }),
        g: common_vendor.o(addRandomData),
        h: common_vendor.p({
          ["bg-color"]: "rgb(240, 240, 240)",
          status: common_vendor.unref(loadStatus)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-cb5fdae2"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/common/moreList.vue"]]);
_sfc_main.__runtimeHooks = 1;
wx.createPage(MiniProgramPage);
