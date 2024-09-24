"use strict";
const common_vendor = require("../../common/vendor.js");
const utils_request = require("../../utils/request.js");
if (!Array) {
  const _easycom_u_swiper2 = common_vendor.resolveComponent("u-swiper");
  _easycom_u_swiper2();
}
const _easycom_u_swiper = () => "../../uni_modules/vk-uview-ui/components/u-swiper/u-swiper.js";
if (!Math) {
  _easycom_u_swiper();
}
const _sfc_main = {
  __name: "swiper1",
  setup(__props, { expose }) {
    let swiperList = common_vendor.ref([]);
    let loading = common_vendor.ref(true);
    const getData = () => {
      loading.value = true;
      utils_request.request.request("https://api.waifu.im/search", "get", {
        // 'included_tags': 'hentai',
        "limit": 5,
        "width": "<=3000",
        "height": "<=1600"
      }).then((res) => {
        swiperList.value = [];
        for (let item of res.images || []) {
          swiperList.value.push({
            image: item.url,
            title: item.image_id
          });
        }
        loading.value = false;
      });
    };
    const showPic = (index) => {
      let picList = [];
      for (let item of swiperList.value) {
        picList.push(item.image);
      }
      common_vendor.index.previewImage({
        current: index,
        // 当前显示图片索引
        urls: picList,
        // 需要预览的图片http链接列表
        longPressActions: {
          itemList: ["保存图片"],
          success: function(data) {
            if (data.tapIndex === 0) {
              savePic(swiperList.value[index].image);
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
    expose({
      getData
      // 暴露方法
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.o(showPic),
        b: common_vendor.p({
          list: common_vendor.unref(swiperList),
          effect3d: true,
          height: 400
        })
      };
    };
  }
};
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["__scopeId", "data-v-d448d23c"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/home/swiper1.vue"]]);
wx.createComponent(Component);
