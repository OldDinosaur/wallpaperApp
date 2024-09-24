import{_ as e,h as t,r as o,o as l,c as i,w as a,a as s,n as r,b as n,d,e as u,f as c,t as h,i as p,I as f,g as m,j as y,k as g,l as b,m as k,p as w,F as C,q as x,s as S,u as _,v,x as $,S as B,y as R,z as I,A as N,B as z,C as P,D as T}from"./index-a4ce6203.js";import{r as E,_ as A,o as F,a as j,b as L}from"./u-tabbar.22274cc4.js";const H=e({name:"u-search",emits:["update:modelValue","input","change","search","custom","clear","focus","blur"],props:{value:{type:String,default:""},modelValue:{type:String,default:""},shape:{type:String,default:"round"},bgColor:{type:String,default:"#f2f2f2"},placeholder:{type:String,default:"请输入关键字"},clearabled:{type:Boolean,default:!0},focus:{type:Boolean,default:!1},showAction:{type:Boolean,default:!0},actionStyle:{type:Object,default:()=>({})},actionText:{type:String,default:"搜索"},inputAlign:{type:String,default:"left"},disabled:{type:Boolean,default:!1},animation:{type:Boolean,default:!1},borderColor:{type:String,default:"none"},height:{type:[Number,String],default:64},inputStyle:{type:Object,default:()=>({})},maxlength:{type:[Number,String],default:"-1"},searchIconColor:{type:String,default:""},color:{type:String,default:"#606266"},placeholderColor:{type:String,default:"#909399"},margin:{type:String,default:"0"},searchIcon:{type:String,default:"search"}},data(){return{keyword:"",showClear:!1,show:!1,focused:this.focus}},watch:{keyword(e){this.$emit("input",e),this.$emit("update:modelValue",e),this.$emit("change",e)},valueCom:{immediate:!0,handler(e){this.keyword=e}}},computed:{valueCom(){return this.modelValue},showActionBtn(){return!(this.animation||!this.showAction)},borderStyle(){return this.borderColor?`1px solid ${this.borderColor}`:"none"}},methods:{inputChange(e){this.keyword=e.detail.value},clear(){this.keyword="",this.$nextTick((()=>{this.$emit("clear")}))},search(e){this.$emit("search",e.detail.value);try{t()}catch(o){}},custom(){this.$emit("custom",this.keyword);try{t()}catch(e){}},getFocus(){this.focused=!0,this.animation&&this.showAction&&(this.show=!0),this.$emit("focus",this.keyword)},blur(){setTimeout((()=>{this.focused=!1}),100),this.show=!1,this.$emit("blur",this.keyword)},clickHandler(){this.disabled&&this.$emit("click")}}},[["render",function(e,t,m,y,g,b){const k=E(o("u-icon"),A),w=p,C=f;return l(),i(w,{class:"u-search",onClick:b.clickHandler,style:r({margin:m.margin})},{default:a((()=>[s(w,{class:"u-content",style:r({backgroundColor:m.bgColor,borderRadius:"round"==m.shape?"100rpx":"10rpx",border:b.borderStyle,height:m.height+"rpx"})},{default:a((()=>[s(w,{class:"u-icon-wrap"},{default:a((()=>[s(k,{class:"u-clear-icon",size:30,name:m.searchIcon,color:m.searchIconColor?m.searchIconColor:m.color},null,8,["name","color"])])),_:1}),s(C,{"confirm-type":"search",onBlur:b.blur,value:b.valueCom,onConfirm:b.search,onInput:b.inputChange,disabled:m.disabled,onFocus:b.getFocus,focus:m.focus,maxlength:m.maxlength,"placeholder-class":"u-placeholder-class",placeholder:m.placeholder,"placeholder-style":`color: ${m.placeholderColor}`,class:"u-input",type:"text",style:r([{textAlign:m.inputAlign,color:m.color,backgroundColor:m.bgColor},m.inputStyle])},null,8,["onBlur","value","onConfirm","onInput","disabled","onFocus","focus","maxlength","placeholder","placeholder-style","style"]),g.keyword&&m.clearabled&&g.focused?(l(),i(w,{key:0,class:"u-close-wrap",onClick:b.clear},{default:a((()=>[s(k,{class:"u-clear-icon",name:"close-circle-fill",size:"34",color:"#c0c4cc"})])),_:1},8,["onClick"])):n("",!0)])),_:1},8,["style"]),s(w,{style:r([m.actionStyle]),class:d(["u-action",[b.showActionBtn||g.show?"u-action-active":""]]),onClick:u(b.custom,["stop","prevent"])},{default:a((()=>[c(h(m.actionText),1)])),_:1},8,["style","class","onClick"])])),_:1},8,["onClick","style"])}],["__scopeId","data-v-209d41ca"]]);const O=e({name:"u-image",emits:["click","error","load"],props:{src:{type:[String,null],default:""},mode:{type:String,default:"aspectFill"},width:{type:[String,Number],default:"100%"},height:{type:[String,Number],default:"auto"},shape:{type:String,default:"square"},borderRadius:{type:[String,Number],default:0},lazyLoad:{type:Boolean,default:!0},showMenuByLongpress:{type:Boolean,default:!0},loadingIcon:{type:String,default:"photo"},errorIcon:{type:String,default:"error-circle"},showLoading:{type:Boolean,default:!0},showError:{type:Boolean,default:!0},fade:{type:Boolean,default:!0},webp:{type:Boolean,default:!1},duration:{type:[String,Number],default:500},bgColor:{type:String,default:"#f3f4f6"}},data(){return{isError:!1,loading:!0,opacity:1,durationTime:this.duration,backgroundStyle:{}}},watch:{src:{immediate:!0,handler(e){e?(this.isError=!1,this.loading=!0):(this.isError=!0,this.loading=!1)}}},computed:{wrapStyle(){let e={};return e.width=this.$u.addUnit(this.width),e.height=this.$u.addUnit(this.height),e.borderRadius="circle"==this.shape?"50%":this.$u.addUnit(this.borderRadius),e.overflow=this.borderRadius>0?"hidden":"visible",this.fade&&(e.opacity=this.opacity,e.transition=`opacity ${Number(this.durationTime)/1e3}s ease-in-out`),e}},methods:{onClick(){this.$emit("click")},onErrorHandler(e){this.loading=!1,this.isError=!0,this.$emit("error",e)},onLoadHandler(){if(this.loading=!1,this.isError=!1,this.$emit("load"),!this.fade)return this.removeBgColor();this.opacity=0,this.durationTime=0,setTimeout((()=>{this.durationTime=this.duration,this.opacity=1,setTimeout((()=>{this.removeBgColor()}),this.durationTime)}),50)},removeBgColor(){this.backgroundStyle={backgroundColor:"transparent"}}}},[["render",function(e,t,s,d,u,c){const h=y,f=E(o("u-icon"),A),g=p;return l(),i(g,{class:"u-image",onClick:c.onClick,style:r([c.wrapStyle,u.backgroundStyle])},{default:a((()=>[u.isError?n("",!0):(l(),i(h,{key:0,src:s.src,mode:s.mode,onError:c.onErrorHandler,onLoad:c.onLoadHandler,"lazy-load":s.lazyLoad,class:"u-image__image","show-menu-by-longpress":s.showMenuByLongpress,style:r({borderRadius:"circle"==s.shape?"50%":e.$u.addUnit(s.borderRadius)})},null,8,["src","mode","onError","onLoad","lazy-load","show-menu-by-longpress","style"])),s.showLoading&&u.loading?(l(),i(g,{key:1,class:"u-image__loading",style:r({borderRadius:"circle"==s.shape?"50%":e.$u.addUnit(s.borderRadius),backgroundColor:s.bgColor})},{default:a((()=>[e.$slots.loading?m(e.$slots,"loading",{key:0},void 0,!0):(l(),i(f,{key:1,name:s.loadingIcon,width:s.width,height:s.height},null,8,["name","width","height"]))])),_:3},8,["style"])):n("",!0),s.showError&&u.isError&&!u.loading?(l(),i(g,{key:2,class:"u-image__error",style:r({borderRadius:"circle"==s.shape?"50%":e.$u.addUnit(s.borderRadius)})},{default:a((()=>[e.$slots.error?m(e.$slots,"error",{key:0},void 0,!0):(l(),i(f,{key:1,name:s.errorIcon,width:s.width,height:s.height},null,8,["name","width","height"]))])),_:3},8,["style"])):n("",!0)])),_:3},8,["onClick","style"])}],["__scopeId","data-v-65a1f4d3"]]);const V=e({name:"u-card",emits:["click","head-click","body-click","foot-click"],props:{full:{type:Boolean,default:!1},title:{type:String,default:""},titleColor:{type:String,default:"#303133"},titleSize:{type:[Number,String],default:"30"},subTitle:{type:String,default:""},subTitleColor:{type:String,default:"#909399"},subTitleSize:{type:[Number,String],default:"26"},border:{type:Boolean,default:!0},index:{type:[Number,String,Object],default:""},margin:{type:String,default:"30rpx"},borderRadius:{type:[Number,String],default:"16"},headStyle:{type:Object,default:()=>({})},bodyStyle:{type:Object,default:()=>({})},footStyle:{type:Object,default:()=>({})},headBorderBottom:{type:Boolean,default:!0},footBorderTop:{type:Boolean,default:!0},thumb:{type:String,default:""},thumbWidth:{type:[String,Number],default:"60"},thumbCircle:{type:Boolean,default:!1},padding:{type:[String,Number],default:"30"},showHead:{type:Boolean,default:!0},showFoot:{type:Boolean,default:!0},boxShadow:{type:String,default:"none"}},data:()=>({}),methods:{click(){this.$emit("click",this.index)},headClick(){this.$emit("head-click",this.index)},bodyClick(){this.$emit("body-click",this.index)},footClick(){this.$emit("foot-click",this.index)}}},[["render",function(e,t,o,f,b,k){const w=y,C=g,x=p;return l(),i(x,{class:d(["u-card",{"u-border":o.border,"u-card-full":o.full,"u-card--border":o.borderRadius>0}]),onClick:u(k.click,["stop"]),style:r({"--radius":o.borderRadius+"rpx",margin:o.margin,boxShadow:o.boxShadow})},{default:a((()=>[o.showHead?(l(),i(x,{key:0,class:d(["u-card__head",{"u-border-bottom":o.headBorderBottom}]),style:r([{padding:o.padding+"rpx"},o.headStyle]),onClick:k.headClick},{default:a((()=>[e.$slots.head?m(e.$slots,"head",{key:1},void 0,!0):(l(),i(x,{key:0,class:"u-flex u-row-between"},{default:a((()=>[o.title?(l(),i(x,{key:0,class:"u-card__head--left u-flex u-line-1"},{default:a((()=>[o.thumb?(l(),i(w,{key:0,src:o.thumb,class:"u-card__head--left__thumb",mode:"aspectFill",style:r({height:o.thumbWidth+"rpx",width:o.thumbWidth+"rpx",borderRadius:o.thumbCircle?"100rpx":"6rpx"})},null,8,["src","style"])):n("",!0),s(C,{class:"u-card__head--left__title u-line-1",style:r({fontSize:o.titleSize+"rpx",color:o.titleColor})},{default:a((()=>[c(h(o.title),1)])),_:1},8,["style"])])),_:1})):n("",!0),o.subTitle?(l(),i(x,{key:1,class:"u-card__head--right u-line-1"},{default:a((()=>[s(C,{class:"u-card__head__title__text",style:r({fontSize:o.subTitleSize+"rpx",color:o.subTitleColor})},{default:a((()=>[c(h(o.subTitle),1)])),_:1},8,["style"])])),_:1})):n("",!0)])),_:1}))])),_:3},8,["style","class","onClick"])):n("",!0),s(x,{onClick:k.bodyClick,class:"u-card__body",style:r([{padding:o.padding+"rpx"},o.bodyStyle])},{default:a((()=>[m(e.$slots,"body",{},void 0,!0)])),_:3},8,["onClick","style"]),o.showFoot?(l(),i(x,{key:1,class:d(["u-card__foot",{"u-border-top":o.footBorderTop}]),onClick:k.footClick,style:r([{padding:e.$slots.foot?o.padding+"rpx":0},o.footStyle])},{default:a((()=>[m(e.$slots,"foot",{},void 0,!0)])),_:3},8,["onClick","style","class"])):n("",!0)])),_:3},8,["onClick","class","style"])}],["__scopeId","data-v-c52e22f9"]]);const U=e({name:"u-skeleton",props:{elColor:{type:String,default:"#e5e5e5"},bgColor:{type:String,default:"#ffffff"},animation:{type:Boolean,default:!1},borderRadius:{type:[String,Number],default:"10"},loading:{type:Boolean,default:!0}},data:()=>({windowWinth:750,windowHeight:1500,filletNodes:[],circleNodes:[],RectNodes:[],top:0,left:0}),methods:{selecterQueryInfo(){let e="";e=b(),e.selectAll(".u-skeleton").boundingClientRect().exec((e=>{this.windowHeight=e[0][0].height,this.windowWinth=e[0][0].width,this.top=e[0][0].bottom-e[0][0].height,this.left=e[0][0].left})),this.getRectEls(),this.getCircleEls(),this.getFilletEls()},getRectEls(){let e="";e=b(),e.selectAll(".u-skeleton-rect").boundingClientRect().exec((e=>{this.RectNodes=e[0]}))},getFilletEls(){let e="";e=b(),e.selectAll(".u-skeleton-fillet").boundingClientRect().exec((e=>{this.filletNodes=e[0]}))},getCircleEls(){let e="";e=b(),e.selectAll(".u-skeleton-circle").boundingClientRect().exec((e=>{this.circleNodes=e[0]}))}},mounted(){let e=k();this.windowHeight=e.windowHeight,this.windowWinth=e.windowWidth,this.selecterQueryInfo()}},[["render",function(e,t,o,s,c,h){const f=p;return o.loading?(l(),i(f,{key:0,style:r({width:c.windowWinth+"px",height:c.windowHeight+"px",backgroundColor:o.bgColor,position:"absolute",left:c.left+"px",top:c.top+"px",zIndex:9998,overflow:"hidden"}),onTouchmove:t[0]||(t[0]=u((()=>{}),["stop","prevent"]))},{default:a((()=>[(l(!0),w(C,null,x(c.RectNodes,((t,a)=>(l(),i(f,{key:e.$u.guid(),class:d([o.animation?"skeleton-fade":""]),style:r({width:t.width+"px",height:t.height+"px",backgroundColor:o.elColor,position:"absolute",left:t.left-c.left+"px",top:t.top-c.top+"px"})},null,8,["class","style"])))),128)),(l(!0),w(C,null,x(c.circleNodes,((t,a)=>(l(),i(f,{key:e.$u.guid(),class:d(o.animation?"skeleton-fade":""),style:r({width:t.width+"px",height:t.height+"px",backgroundColor:o.elColor,borderRadius:t.width/2+"px",position:"absolute",left:t.left-c.left+"px",top:t.top-c.top+"px"})},null,8,["class","style"])))),128)),(l(!0),w(C,null,x(c.filletNodes,((t,a)=>(l(),i(f,{key:e.$u.guid(),class:d(o.animation?"skeleton-fade":""),style:r({width:t.width+"px",height:t.height+"px",backgroundColor:o.elColor,borderRadius:o.borderRadius+"rpx",position:"absolute",left:t.left-c.left+"px",top:t.top-c.top+"px"})},null,8,["class","style"])))),128))])),_:1},8,["style"])):n("",!0)}],["__scopeId","data-v-dd9025dd"]]);const W=e({name:"u-mask",emits:["click"],props:{show:{type:Boolean,default:!1},zIndex:{type:[Number,String],default:""},customStyle:{type:Object,default:()=>({})},zoom:{type:Boolean,default:!0},duration:{type:[Number,String],default:300},maskClickAble:{type:Boolean,default:!0},blur:{type:[Number,String],default:0}},data:()=>({zoomStyle:{transform:""},scale:"scale(1.2, 1.2)"}),watch:{show(e){e&&this.zoom?this.zoomStyle.transform="scale(1, 1)":!e&&this.zoom&&(this.zoomStyle.transform=this.scale)}},computed:{maskStyle(){let e={backgroundColor:"rgba(0, 0, 0, 0.6)"};return this.show?e.zIndex=this.zIndex?this.zIndex:this.$u.zIndex.mask:e.zIndex=-1,e.transition=`all ${this.duration/1e3}s ease-in-out`,Object.keys(this.customStyle).length&&(e={...e,...this.customStyle}),e},filterStyle(){let{blur:e}=this,t={};return e&&(t.backdropFilter=`blur(${e}rpx)`),t}},methods:{click(){this.maskClickAble&&this.$emit("click")}}},[["render",function(e,t,o,s,n,c){const h=p;return l(),i(h,{class:d(["u-mask",{"u-mask-zoom":o.zoom,"u-mask-show":o.show}]),"hover-stop-propagation":"",style:r([c.maskStyle,n.zoomStyle,c.filterStyle]),onClick:c.click,onTouchmove:t[0]||(t[0]=u((()=>{}),["stop","prevent"]))},{default:a((()=>[m(e.$slots,"default",{},void 0,!0)])),_:3},8,["style","onClick","class"])}],["__scopeId","data-v-005d3602"]]),M=(e,t="GET",o={},l={})=>new Promise(((i,a)=>{l.Authorization=S("token"),_({url:e,method:t,data:o,header:l,success:e=>{401==e.data.code&&v({url:"/pages/login/login"}),i(e.data)},fail:e=>{a({code:500,msg:"获取数据失败"})}})})),D=M;const q=e({name:"u-swiper",emits:["click","change"],props:{list:{type:Array,default:()=>[]},title:{type:Boolean,default:!1},indicator:{type:Object,default:()=>({})},borderRadius:{type:[Number,String],default:8},interval:{type:[String,Number],default:3e3},mode:{type:String,default:"round"},height:{type:[Number,String],default:250},indicatorPos:{type:String,default:"bottomCenter"},effect3d:{type:Boolean,default:!1},effect3dPreviousMargin:{type:[Number,String],default:50},autoplay:{type:Boolean,default:!0},duration:{type:[Number,String],default:500},circular:{type:Boolean,default:!0},imgMode:{type:String,default:"aspectFill"},name:{type:String,default:"image"},bgColor:{type:String,default:"#f3f4f6"},current:{type:[Number,String],default:0},titleStyle:{type:Object,default:()=>({})}},watch:{list(e,t){e.length!==t.length&&(this.uCurrent=0)},current(e){this.uCurrent=e}},data(){return{uCurrent:this.current}},computed:{justifyContent(){return"topLeft"==this.indicatorPos||"bottomLeft"==this.indicatorPos?"flex-start":"topCenter"==this.indicatorPos||"bottomCenter"==this.indicatorPos?"center":"topRight"==this.indicatorPos||"bottomRight"==this.indicatorPos?"flex-end":void 0},titlePaddingBottom(){let e=0;return"none"==this.mode?"12rpx":(e=["bottomLeft","bottomCenter","bottomRight"].indexOf(this.indicatorPos)>=0&&"number"==this.mode?"60rpx":["bottomLeft","bottomCenter","bottomRight"].indexOf(this.indicatorPos)>=0&&"number"!=this.mode?"40rpx":"12rpx",e)},elCurrent(){return Number(this.current)}},methods:{listClick(e){this.$emit("click",e)},change(e){let t=e.detail.current;this.uCurrent=t,this.$emit("change",t)},animationfinish(e){}}},[["render",function(e,t,o,f,m,g){const b=y,k=p,S=B,_=R;return l(),i(k,{class:"u-swiper-wrap",style:r({borderRadius:`${o.borderRadius}rpx`})},{default:a((()=>[s(_,{current:g.elCurrent,onChange:g.change,onAnimationfinish:g.animationfinish,interval:o.interval,circular:o.circular,duration:o.duration,autoplay:o.autoplay,"previous-margin":o.effect3d?o.effect3dPreviousMargin+"rpx":"0","next-margin":o.effect3d?o.effect3dPreviousMargin+"rpx":"0",style:r({height:o.height+"rpx",backgroundColor:o.bgColor})},{default:a((()=>[(l(!0),w(C,null,x(o.list,((e,t)=>(l(),i(S,{class:"u-swiper-item",key:t},{default:a((()=>[s(k,{class:d(["u-list-image-wrap",[m.uCurrent!=t?"u-list-scale":""]]),onClick:u((e=>g.listClick(t)),["stop","prevent"]),style:r({borderRadius:`${o.borderRadius}rpx`,transform:o.effect3d&&m.uCurrent!=t?"scaleY(0.9)":"scaleY(1)",margin:o.effect3d&&m.uCurrent!=t?"0 20rpx":0})},{default:a((()=>[s(b,{class:"u-swiper-image",src:e[o.name]||e,mode:o.imgMode},null,8,["src","mode"]),o.title&&e.title?(l(),i(k,{key:0,class:"u-swiper-title u-line-1",style:r([{"padding-bottom":g.titlePaddingBottom},o.titleStyle])},{default:a((()=>[c(h(e.title),1)])),_:2},1032,["style"])):n("",!0)])),_:2},1032,["onClick","class","style"])])),_:2},1024)))),128))])),_:1},8,["current","onChange","onAnimationfinish","interval","circular","duration","autoplay","previous-margin","next-margin","style"]),s(k,{class:"u-swiper-indicator",style:r({top:"topLeft"==o.indicatorPos||"topCenter"==o.indicatorPos||"topRight"==o.indicatorPos?"12rpx":"auto",bottom:"bottomLeft"==o.indicatorPos||"bottomCenter"==o.indicatorPos||"bottomRight"==o.indicatorPos?"12rpx":"auto",justifyContent:g.justifyContent,padding:"0 "+(o.effect3d?"74rpx":"24rpx")})},{default:a((()=>["rect"==o.mode?(l(!0),w(C,{key:0},x(o.list,((e,t)=>(l(),i(k,{class:d(["u-indicator-item-rect",{"u-indicator-item-rect-active":t==m.uCurrent}]),key:t},null,8,["class"])))),128)):n("",!0),"dot"==o.mode?(l(!0),w(C,{key:1},x(o.list,((e,t)=>(l(),i(k,{class:d(["u-indicator-item-dot",{"u-indicator-item-dot-active":t==m.uCurrent}]),key:t},null,8,["class"])))),128)):n("",!0),"round"==o.mode?(l(!0),w(C,{key:2},x(o.list,((e,t)=>(l(),i(k,{class:d(["u-indicator-item-round",{"u-indicator-item-round-active":t==m.uCurrent}]),key:t},null,8,["class"])))),128)):n("",!0),"number"==o.mode?(l(),i(k,{key:3,class:"u-indicator-item-number"},{default:a((()=>[c(h(m.uCurrent+1)+"/"+h(o.list.length),1)])),_:1})):n("",!0)])),_:1},8,["style"])])),_:1},8,["style"])}],["__scopeId","data-v-8e0842f7"]]),Q=e({__name:"swiper1",setup(e,{expose:t}){let r=I([]),n=I(!0);return t({getData:()=>{n.value=!0,D("https://api.waifu.im/search","get",{limit:5,width:"<=3000",height:"<=1600"}).then((e=>{r.value=[];for(let t of e.images||[])r.value.push({image:t.url,title:t.image_id});n.value=!1}))}}),(e,t)=>{const n=E(o("u-swiper"),q),d=p;return l(),i(d,{class:"u-skeleton"},{default:a((()=>[s(n,{list:N(r),effect3d:!0,height:400},null,8,["list"])])),_:1})}}},[["__scopeId","data-v-a8891fe5"]]),Y=e({__name:"index",setup(e){let t=I(!1),r=I("爆照的老恐龙"),n=I();F((()=>{n.value.getData(),f(),setTimeout((function(){z()}),1e3)}));let d=I({}),u=I([]),c=I([]),h=I([]);const f=()=>{t.value=!0,D("https://api.waifu.im/tags").then((e=>{d.value=e,u.value=e.nsfw,c.value=e.versatile,h.value=[];for(let t of c.value)D("https://api.waifu.im/search","get",{included_tags:t,limit:6}).then((e=>{h.value.push({tab:t,list:e.images})}));t.value=!1}))};j((()=>{P((()=>{n.value&&n.value.getData()})),f()}));let m=I(!1),y=I();const g=e=>{if(console.log(r.value),"老恐龙是帅哥"==r.value){h.value=[];for(let e of u.value)D("https://api.waifu.im/search","get",{included_tags:e,limit:6}).then((t=>{h.value.push({tab:e,list:t.images})}))}else{h.value=[];for(let e of c.value)D("https://api.waifu.im/search","get",{included_tags:e,limit:6}).then((t=>{h.value.push({tab:e,list:t.images})}))}};let b=I([{iconPath:"home",selectedIconPath:"home-fill",text:"首页",customIcon:!1,pagePath:"/pages/home/index"},{iconPath:"photo",selectedIconPath:"photo-fill",text:"分类",customIcon:!1,pagePath:"/pages/sort/index"},{iconPath:"account",selectedIconPath:"account-fill",text:"我的",customIcon:!1,pagePath:"/pages/my/index"}]),k=I(0);return(e,d)=>{const u=E(o("u-search"),H),c=E(o("u-image"),O),f=p,S=E(o("u-card"),V),_=E(o("u-skeleton"),U),v=E(o("u-mask"),W),$=E(o("u-tabbar"),L);return l(),i(f,null,{default:a((()=>[s(f,{class:"u-page"},{default:a((()=>[s(u,{margin:"10rpx","show-action":!1,placeholder:"爆照的老恐龙",clearabled:!0,modelValue:N(r),"onUpdate:modelValue":d[0]||(d[0]=e=>T(r)?r.value=e:r=e),onSearch:g},null,8,["modelValue"]),s(Q,{ref_key:"swiper1Ref",ref:n},null,512),s(f,{class:"u-skeleton"},{default:a((()=>[(l(!0),w(C,null,x(N(h),((e,t)=>(l(),i(S,{key:e.tab,title:e.tab,"show-foot":!1,"sub-title":"查看更多"},{body:a((()=>[s(f,{class:"tap-pic"},{default:a((()=>[(l(!0),w(C,null,x(e.list,((e,t)=>(l(),i(f,{class:"pic-item"},{default:a((()=>[s(c,{width:"100%",height:"300rpx",src:e.url,onClick:t=>(e=>{m.value=!0,y.value=e})(e.url)},null,8,["src","onClick"])])),_:2},1024)))),256))])),_:2},1024)])),_:2},1032,["title"])))),128))])),_:1}),s(_,{loading:N(t),animation:!0,bgColor:"#FFF"},null,8,["loading"]),s(v,{show:N(m),onClick:d[2]||(d[2]=e=>T(m)?m.value=!1:m=!1)},{default:a((()=>[s(f,{class:"warp"},{default:a((()=>[s(f,{class:"rect",onClick:d[1]||(d[1]=e=>T(m)?m.value=!1:m=!1)},{default:a((()=>[s(c,{width:"100%",height:"100vh",mode:"aspectFit",src:N(y)},null,8,["src"])])),_:1})])),_:1})])),_:1},8,["show"])])),_:1}),s($,{modelValue:N(k),"onUpdate:modelValue":d[3]||(d[3]=e=>T(k)?k.value=e:k=e),list:N(b)},null,8,["modelValue","list"])])),_:1})}}},[["__scopeId","data-v-962f37c1"]]);export{Y as default};