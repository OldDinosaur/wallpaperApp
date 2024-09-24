"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_u_search2 = common_vendor.resolveComponent("u-search");
  const _easycom_u_image2 = common_vendor.resolveComponent("u-image");
  const _easycom_u_card2 = common_vendor.resolveComponent("u-card");
  const _easycom_u_tabbar2 = common_vendor.resolveComponent("u-tabbar");
  (_easycom_u_search2 + _easycom_u_image2 + _easycom_u_card2 + _easycom_u_tabbar2)();
}
const _easycom_u_search = () => "../../uni_modules/vk-uview-ui/components/u-search/u-search.js";
const _easycom_u_image = () => "../../uni_modules/vk-uview-ui/components/u-image/u-image.js";
const _easycom_u_card = () => "../../uni_modules/vk-uview-ui/components/u-card/u-card.js";
const _easycom_u_tabbar = () => "../../uni_modules/vk-uview-ui/components/u-tabbar/u-tabbar.js";
if (!Math) {
  (_easycom_u_search + swiper1 + _easycom_u_image + _easycom_u_card + _easycom_u_tabbar)();
}
const swiper1 = () => "./swiper1.js";
const _sfc_main = {
  __name: "index",
  setup(__props) {
    let loading = common_vendor.ref(false);
    let keyword = common_vendor.ref("爆照的老恐龙");
    let swiper1Ref = common_vendor.ref();
    common_vendor.onPullDownRefresh(() => {
      swiper1Ref.value.getData();
      getAllTags();
      setTimeout(function() {
        common_vendor.index.stopPullDownRefresh();
      }, 1e3);
    });
    let tags = common_vendor.ref({});
    let nsfwList = common_vendor.ref([]);
    let versatileList = common_vendor.ref([]);
    let picList = common_vendor.ref([]);
    const getAllTags = () => {
      loading.value = true;
      utils_request.request.request("https://api.waifu.im/tags").then((res) => {
        tags.value = res;
        nsfwList.value = res.nsfw;
        versatileList.value = res.versatile;
        picList.value = [];
        for (let item of versatileList.value) {
          utils_request.request.request("https://api.waifu.im/search", "get", {
            "included_tags": item,
            "limit": 6
          }).then((res2) => {
            picList.value.push({
              tab: item,
              list: res2.images
            });
          });
        }
        loading.value = false;
      });
    };
    common_vendor.onLoad(() => {
      common_vendor.nextTick$1(() => {
        if (swiper1Ref.value) {
          swiper1Ref.value.getData();
        }
      });
      getAllTags();
    });
    const showPic = (item, index, list2) => {
      let picList2 = [];
      for (let item2 of list2) {
        picList2.push(item2.url);
      }
      common_vendor.index.previewImage({
        current: index,
        // 当前显示图片索引
        urls: picList2,
        // 需要预览的图片http链接列表
        longPressActions: {
          itemList: ["保存图片"],
          success: function(data) {
            console.log(data);
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
    const searchClick = (val) => {
      console.log(keyword.value);
      if (keyword.value == "老恐龙是帅哥") {
        picList.value = [];
        for (let item of nsfwList.value) {
          utils_request.request.request("https://api.waifu.im/search", "get", {
            "included_tags": item,
            "limit": 6
          }).then((res) => {
            picList.value.push({
              tab: item,
              list: res.images
            });
          });
        }
      } else {
        picList.value = [];
        for (let item of versatileList.value) {
          utils_request.request.request("https://api.waifu.im/search", "get", {
            "included_tags": item,
            "limit": 6
          }).then((res) => {
            picList.value.push({
              tab: item,
              list: res.images
            });
          });
        }
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
        a: common_vendor.o(searchClick),
        b: common_vendor.o(($event) => common_vendor.isRef(keyword) ? keyword.value = $event : keyword = $event),
        c: common_vendor.p({
          margin: "10rpx",
          ["show-action"]: false,
          placeholder: "爆照的老恐龙",
          clearabled: true,
          modelValue: common_vendor.unref(keyword)
        }),
        d: common_vendor.sr(swiper1Ref, "53cec437-1", {
          "k": "swiper1Ref"
        }),
        e: common_vendor.f(common_vendor.unref(picList), (item, index, i0) => {
          return {
            a: common_vendor.f(item.list, (pic, index1, i1) => {
              return {
                a: common_vendor.o(($event) => showPic(pic.url, index1, item.list)),
                b: "53cec437-3-" + i0 + "-" + i1 + "," + ("53cec437-2-" + i0),
                c: common_vendor.p({
                  width: "100%",
                  height: "300rpx",
                  src: pic.url
                })
              };
            }),
            b: item.tab,
            c: "53cec437-2-" + i0,
            d: common_vendor.p({
              title: item.tab,
              ["show-foot"]: false,
              ["sub-title"]: "查看更多"
            })
          };
        }),
        f: common_vendor.o(($event) => common_vendor.isRef(current) ? current.value = $event : current = $event),
        g: common_vendor.p({
          list: common_vendor.unref(list),
          modelValue: common_vendor.unref(current)
        })
      };
    };
  }
};
const MiniProgramPage = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/home/index.vue"]]);
wx.createPage(MiniProgramPage);
