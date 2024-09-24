"use strict";const t=require("../../../../common/vendor.js"),e={name:"u-card",emits:["click","head-click","body-click","foot-click"],props:{full:{type:Boolean,default:!1},title:{type:String,default:""},titleColor:{type:String,default:"#303133"},titleSize:{type:[Number,String],default:"30"},subTitle:{type:String,default:""},subTitleColor:{type:String,default:"#909399"},subTitleSize:{type:[Number,String],default:"26"},border:{type:Boolean,default:!0},index:{type:[Number,String,Object],default:""},margin:{type:String,default:"30rpx"},borderRadius:{type:[Number,String],default:"16"},headStyle:{type:Object,default:()=>({})},bodyStyle:{type:Object,default:()=>({})},footStyle:{type:Object,default:()=>({})},headBorderBottom:{type:Boolean,default:!0},footBorderTop:{type:Boolean,default:!0},thumb:{type:String,default:""},thumbWidth:{type:[String,Number],default:"60"},thumbCircle:{type:Boolean,default:!1},padding:{type:[String,Number],default:"30"},showHead:{type:Boolean,default:!0},showFoot:{type:Boolean,default:!0},boxShadow:{type:String,default:"none"}},data:()=>({}),methods:{click(){this.$emit("click",this.index)},headClick(){this.$emit("head-click",this.index)},bodyClick(){this.$emit("body-click",this.index)},footClick(){this.$emit("foot-click",this.index)}}};const o=t._export_sfc(e,[["render",function(e,o,i,d,l,r){return t.e({a:i.showHead},i.showHead?t.e({b:!e.$slots.head},e.$slots.head?{}:t.e({c:i.title},i.title?t.e({d:i.thumb},i.thumb?{e:i.thumb,f:i.thumbWidth+"rpx",g:i.thumbWidth+"rpx",h:i.thumbCircle?"100rpx":"6rpx"}:{},{i:t.t(i.title),j:i.titleSize+"rpx",k:i.titleColor}):{},{l:i.subTitle},i.subTitle?{m:t.t(i.subTitle),n:i.subTitleSize+"rpx",o:i.subTitleColor}:{}),{p:t.s({padding:i.padding+"rpx"}),q:t.s(i.headStyle),r:i.headBorderBottom?1:"",s:t.o(((...t)=>r.headClick&&r.headClick(...t)))}):{},{t:t.o(((...t)=>r.bodyClick&&r.bodyClick(...t))),v:t.s({padding:i.padding+"rpx"}),w:t.s(i.bodyStyle),x:i.showFoot},i.showFoot?{y:t.o(((...t)=>r.footClick&&r.footClick(...t))),z:t.s({padding:e.$slots.foot?i.padding+"rpx":0}),A:t.s(i.footStyle),B:i.footBorderTop?1:""}:{},{C:t.o(((...t)=>r.click&&r.click(...t))),D:i.border?1:"",E:i.full?1:"",F:i.borderRadius>0?1:"",G:i.borderRadius+"rpx",H:i.margin,I:i.boxShadow})}],["__scopeId","data-v-c52e22f9"]]);wx.createComponent(o);