"use strict";const e=require("../../common/vendor.js"),t=require("../../utils/request.js");if(!Array){e.resolveComponent("u-swiper")()}Math;const r={__name:"swiper1",setup(r,{expose:s}){let i=e.ref([]),a=e.ref(!0);return s({getData:()=>{a.value=!0,t.request.request("https://api.waifu.im/search","get",{limit:5,width:"<=3000",height:"<=1600"}).then((e=>{i.value=[];for(let t of e.images||[])i.value.push({image:t.url,title:t.image_id});a.value=!1}))}}),(t,r)=>({a:e.p({list:e.unref(i),effect3d:!0,height:400})})}},s=e._export_sfc(r,[["__scopeId","data-v-a8891fe5"]]);wx.createComponent(s);