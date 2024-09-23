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
    expose({
      getData
      // 暴露方法
    });
    return (_ctx, _cache) => {
      return {
        a: common_vendor.p({
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
