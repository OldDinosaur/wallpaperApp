"use strict";const i=require("../../../uv-ui-tools/libs/mixin/mpMixin.js"),e=require("../../../uv-ui-tools/libs/mixin/mixin.js"),t=require("../../../../common/vendor.js");require("../../../uv-ui-tools/libs/function/index.js"),require("../../../uv-ui-tools/libs/function/test.js"),require("../../../uv-ui-tools/libs/function/digit.js"),require("../../../uv-ui-tools/libs/util/route.js"),require("../../../uv-ui-tools/libs/function/debounce.js"),require("../../../uv-ui-tools/libs/function/throttle.js");const s={name:"uv-safe-bottom",mixins:[i.mpMixin,e.mixin],data:()=>({safeAreaBottomHeight:0,isNvue:!1}),computed:{style(){return this.$uv.deepMerge({},this.$uv.addStyle(this.customStyle))}},mounted(){}};const u=t._export_sfc(s,[["render",function(i,e,s,u,o,n){return{a:t.s(n.style),b:t.n(!o.isNvue&&"uv-safe-area-inset-bottom")}}],["__scopeId","data-v-71c4b1ce"]]);wx.createComponent(u);