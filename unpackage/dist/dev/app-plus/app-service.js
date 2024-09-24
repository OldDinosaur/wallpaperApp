if (typeof Promise !== "undefined" && !Promise.prototype.finally) {
  Promise.prototype.finally = function(callback) {
    const promise = this.constructor;
    return this.then(
      (value) => promise.resolve(callback()).then(() => value),
      (reason) => promise.resolve(callback()).then(() => {
        throw reason;
      })
    );
  };
}
;
if (typeof uni !== "undefined" && uni && uni.requireGlobal) {
  const global = uni.requireGlobal();
  ArrayBuffer = global.ArrayBuffer;
  Int8Array = global.Int8Array;
  Uint8Array = global.Uint8Array;
  Uint8ClampedArray = global.Uint8ClampedArray;
  Int16Array = global.Int16Array;
  Uint16Array = global.Uint16Array;
  Int32Array = global.Int32Array;
  Uint32Array = global.Uint32Array;
  Float32Array = global.Float32Array;
  Float64Array = global.Float64Array;
  BigInt64Array = global.BigInt64Array;
  BigUint64Array = global.BigUint64Array;
}
;
if (uni.restoreGlobal) {
  uni.restoreGlobal(Vue, weex, plus, setTimeout, clearTimeout, setInterval, clearInterval);
}
(function(vue, shared) {
  "use strict";
  const ON_LOAD = "onLoad";
  const ON_PULL_DOWN_REFRESH = "onPullDownRefresh";
  function formatAppLog(type, filename, ...args) {
    if (uni.__log__) {
      uni.__log__(type, filename, ...args);
    } else {
      console[type].apply(console, [...args, filename]);
    }
  }
  function resolveEasycom(component, easycom) {
    return shared.isString(component) ? easycom : component;
  }
  const createHook = (lifecycle) => (hook, target = vue.getCurrentInstance()) => {
    !vue.isInSSRComponentSetup && vue.injectHook(lifecycle, hook, target);
  };
  const onLoad = /* @__PURE__ */ createHook(ON_LOAD);
  const onPullDownRefresh = /* @__PURE__ */ createHook(ON_PULL_DOWN_REFRESH);
  const _export_sfc = (sfc, props) => {
    const target = sfc.__vccOpts || sfc;
    for (const [key, val] of props) {
      target[key] = val;
    }
    return target;
  };
  const _sfc_main$b = {
    name: "u-icon",
    emits: ["click", "touchstart"],
    props: {
      // 图标类名
      name: {
        type: String,
        default: ""
      },
      // 图标颜色，可接受主题色
      color: {
        type: [String, null],
        default: ""
      },
      // 字体大小，单位rpx
      size: {
        type: [Number, String],
        default: "inherit"
      },
      // 是否显示粗体
      bold: {
        type: Boolean,
        default: false
      },
      // 点击图标的时候传递事件出去的index（用于区分点击了哪一个）
      index: {
        type: [Number, String],
        default: ""
      },
      // 触摸图标时的类名
      hoverClass: {
        type: String,
        default: ""
      },
      // 自定义扩展前缀，方便用户扩展自己的图标库
      customPrefix: {
        type: String,
        default: "uicon"
      },
      // 图标右边或者下面的文字
      label: {
        type: [String, Number],
        default: ""
      },
      // label的位置，只能右边或者下边
      labelPos: {
        type: String,
        default: "right"
      },
      // label的大小
      labelSize: {
        type: [String, Number],
        default: "28"
      },
      // label的颜色
      labelColor: {
        type: String,
        default: "#606266"
      },
      // label与图标的距离(横向排列)
      marginLeft: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginTop: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginRight: {
        type: [String, Number],
        default: "6"
      },
      // label与图标的距离(竖向排列)
      marginBottom: {
        type: [String, Number],
        default: "6"
      },
      // 图片的mode
      imgMode: {
        type: String,
        default: "widthFix"
      },
      // 自定义样式
      customStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 用于显示图片小图标时，图片的宽度
      width: {
        type: [String, Number],
        default: ""
      },
      // 用于显示图片小图标时，图片的高度
      height: {
        type: [String, Number],
        default: ""
      },
      // 用于解决某些情况下，让图标垂直居中的用途
      top: {
        type: [String, Number],
        default: 0
      },
      // 是否为DecimalIcon
      showDecimalIcon: {
        type: Boolean,
        default: false
      },
      // 背景颜色，可接受主题色，仅Decimal时有效
      inactiveColor: {
        type: String,
        default: "#ececec"
      },
      // 显示的百分比，仅Decimal时有效
      percent: {
        type: [Number, String],
        default: "50"
      }
    },
    computed: {
      customClass() {
        let classes = [];
        let { customPrefix, name } = this;
        let index = name.indexOf("-icon-");
        if (index > -1) {
          customPrefix = name.substring(0, index + 5);
          classes.push(name);
        } else {
          classes.push(`${customPrefix}-${name}`);
        }
        if (customPrefix === "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(customPrefix);
        }
        if (this.showDecimalIcon && this.inactiveColor && this.$u.config.type.includes(this.inactiveColor)) {
          classes.push("u-icon__icon--" + this.inactiveColor);
        } else if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        return classes;
      },
      iconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top)
        };
        if (this.showDecimalIcon && this.inactiveColor && !this.$u.config.type.includes(this.inactiveColor)) {
          style.color = this.inactiveColor;
        } else if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      // 判断传入的name属性，是否图片路径，只要带有"/"均认为是图片形式
      isImg() {
        return this.name.indexOf("/") !== -1;
      },
      imgStyle() {
        let style = {};
        style.width = this.width ? this.$u.addUnit(this.width) : this.$u.addUnit(this.size);
        style.height = this.height ? this.$u.addUnit(this.height) : this.$u.addUnit(this.size);
        return style;
      },
      decimalIconStyle() {
        let style = {};
        style = {
          fontSize: this.size == "inherit" ? "inherit" : this.$u.addUnit(this.size),
          fontWeight: this.bold ? "bold" : "normal",
          // 某些特殊情况需要设置一个到顶部的距离，才能更好的垂直居中
          top: this.$u.addUnit(this.top),
          width: this.percent + "%"
        };
        if (this.color && !this.$u.config.type.includes(this.color))
          style.color = this.color;
        return style;
      },
      decimalIconClass() {
        let classes = [];
        classes.push(this.customPrefix + "-" + this.name);
        if (this.customPrefix == "uicon") {
          classes.push("u-iconfont");
        } else {
          classes.push(this.customPrefix);
        }
        if (this.color && this.$u.config.type.includes(this.color))
          classes.push("u-icon__icon--" + this.color);
        else
          classes.push("u-icon__icon--primary");
        return classes;
      }
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      },
      touchstart() {
        this.$emit("touchstart", this.index);
      }
    }
  };
  function _sfc_render$7(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        style: vue.normalizeStyle([$props.customStyle]),
        class: vue.normalizeClass(["u-icon", ["u-icon--" + $props.labelPos]]),
        onClick: _cache[1] || (_cache[1] = (...args) => $options.click && $options.click(...args))
      },
      [
        $options.isImg ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          class: "u-icon__img",
          src: $props.name,
          mode: $props.imgMode,
          style: vue.normalizeStyle([$options.imgStyle])
        }, null, 12, ["src", "mode"])) : (vue.openBlock(), vue.createElementBlock("view", {
          key: 1,
          class: vue.normalizeClass(["u-icon__icon", $options.customClass]),
          style: vue.normalizeStyle([$options.iconStyle]),
          "hover-class": $props.hoverClass,
          onTouchstart: _cache[0] || (_cache[0] = (...args) => $options.touchstart && $options.touchstart(...args))
        }, [
          $props.showDecimalIcon ? (vue.openBlock(), vue.createElementBlock("text", {
            key: 0,
            style: vue.normalizeStyle([$options.decimalIconStyle]),
            class: vue.normalizeClass([$options.decimalIconClass, "u-icon__decimal"]),
            "hover-class": $props.hoverClass
          }, null, 14, ["hover-class"])) : vue.createCommentVNode("v-if", true)
        ], 46, ["hover-class"])),
        vue.createCommentVNode(' 这里进行空字符串判断，如果仅仅是v-if="label"，可能会出现传递0的时候，结果也无法显示，微信小程序不传值默认为null，故需要增加null的判断 '),
        $props.label !== "" && $props.label !== null ? (vue.openBlock(), vue.createElementBlock(
          "text",
          {
            key: 2,
            class: "u-icon__label",
            style: vue.normalizeStyle({
              color: $props.labelColor,
              fontSize: _ctx.$u.addUnit($props.labelSize),
              marginLeft: $props.labelPos == "right" ? _ctx.$u.addUnit($props.marginLeft) : 0,
              marginTop: $props.labelPos == "bottom" ? _ctx.$u.addUnit($props.marginTop) : 0,
              marginRight: $props.labelPos == "left" ? _ctx.$u.addUnit($props.marginRight) : 0,
              marginBottom: $props.labelPos == "top" ? _ctx.$u.addUnit($props.marginBottom) : 0
            })
          },
          vue.toDisplayString($props.label),
          5
          /* TEXT, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_0$3 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["render", _sfc_render$7], ["__scopeId", "data-v-5de67484"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/uni_modules/vk-uview-ui/components/u-icon/u-icon.vue"]]);
  const _sfc_main$a = {
    name: "u-search",
    emits: ["update:modelValue", "input", "change", "search", "custom", "clear", "focus", "blur"],
    props: {
      // 输入框的初始化内容
      value: {
        type: String,
        default: ""
      },
      modelValue: {
        type: String,
        default: ""
      },
      // 搜索框形状，round-圆形，square-方形
      shape: {
        type: String,
        default: "round"
      },
      // 搜索框背景色，默认值#f2f2f2
      bgColor: {
        type: String,
        default: "#f2f2f2"
      },
      // 占位提示文字
      placeholder: {
        type: String,
        default: "请输入关键字"
      },
      // 是否启用清除控件
      clearabled: {
        type: Boolean,
        default: true
      },
      // 是否自动聚焦
      focus: {
        type: Boolean,
        default: false
      },
      // 是否在搜索框右侧显示取消按钮
      showAction: {
        type: Boolean,
        default: true
      },
      // 右边控件的样式
      actionStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 取消按钮文字
      actionText: {
        type: String,
        default: "搜索"
      },
      // 输入框内容对齐方式，可选值为 left|center|right
      inputAlign: {
        type: String,
        default: "left"
      },
      // 是否启用输入框
      disabled: {
        type: Boolean,
        default: false
      },
      // 开启showAction时，是否在input获取焦点时才显示
      animation: {
        type: Boolean,
        default: false
      },
      // 边框颜色，只要配置了颜色，才会有边框
      borderColor: {
        type: String,
        default: "none"
      },
      // 搜索框高度，单位rpx
      height: {
        type: [Number, String],
        default: 64
      },
      // input输入框的样式，可以定义文字颜色，大小等，对象形式
      inputStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 输入框最大能输入的长度，-1为不限制长度(来自uniapp文档)
      maxlength: {
        type: [Number, String],
        default: "-1"
      },
      // 搜索图标的颜色，默认同输入框字体颜色
      searchIconColor: {
        type: String,
        default: ""
      },
      // 输入框字体颜色
      color: {
        type: String,
        default: "#606266"
      },
      // placeholder的颜色
      placeholderColor: {
        type: String,
        default: "#909399"
      },
      // 组件与其他上下左右元素之间的距离，带单位的字符串形式，如"30rpx"、"30rpx 20rpx"等写法
      margin: {
        type: String,
        default: "0"
      },
      // 左边输入框的图标，可以为uView图标名称或图片路径
      searchIcon: {
        type: String,
        default: "search"
      }
    },
    data() {
      return {
        keyword: "",
        showClear: false,
        // 是否显示右边的清除图标
        show: false,
        // 标记input当前状态是否处于聚焦中，如果是，才会显示右侧的清除控件
        focused: this.focus
        // 绑定输入框的值
        // inputValue: this.value
      };
    },
    watch: {
      keyword(nVal) {
        this.$emit("input", nVal);
        this.$emit("update:modelValue", nVal);
        this.$emit("change", nVal);
      },
      valueCom: {
        immediate: true,
        handler(nVal) {
          this.keyword = nVal;
        }
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      showActionBtn() {
        if (!this.animation && this.showAction)
          return true;
        else
          return false;
      },
      // 样式，根据用户传入的颜色值生成，如果不传入，默认为none
      borderStyle() {
        if (this.borderColor)
          return `1px solid ${this.borderColor}`;
        else
          return "none";
      }
    },
    methods: {
      // 目前HX2.6.9 v-model双向绑定无效，故监听input事件获取输入框内容的变化
      inputChange(e) {
        this.keyword = e.detail.value;
      },
      // 清空输入
      // 也可以作为用户通过this.$refs形式调用清空输入框内容
      clear() {
        this.keyword = "";
        this.$nextTick(() => {
          this.$emit("clear");
        });
      },
      // 确定搜索
      search(e) {
        this.$emit("search", e.detail.value);
        try {
          uni.hideKeyboard();
        } catch (e2) {
        }
      },
      // 点击右边自定义按钮的事件
      custom() {
        this.$emit("custom", this.keyword);
        try {
          uni.hideKeyboard();
        } catch (e) {
        }
      },
      // 获取焦点
      getFocus() {
        this.focused = true;
        if (this.animation && this.showAction)
          this.show = true;
        this.$emit("focus", this.keyword);
      },
      // 失去焦点
      blur() {
        setTimeout(() => {
          this.focused = false;
        }, 100);
        this.show = false;
        this.$emit("blur", this.keyword);
      },
      // 点击搜索框，只有disabled=true时才发出事件，因为禁止了输入，意味着是想跳转真正的搜索页
      clickHandler() {
        if (this.disabled)
          this.$emit("click");
      }
    }
  };
  function _sfc_render$6(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-search",
        onClick: _cache[6] || (_cache[6] = (...args) => $options.clickHandler && $options.clickHandler(...args)),
        style: vue.normalizeStyle({
          margin: $props.margin
        })
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: "u-content",
            style: vue.normalizeStyle({
              backgroundColor: $props.bgColor,
              borderRadius: $props.shape == "round" ? "100rpx" : "10rpx",
              border: $options.borderStyle,
              height: $props.height + "rpx"
            })
          },
          [
            vue.createElementVNode("view", { class: "u-icon-wrap" }, [
              vue.createVNode(_component_u_icon, {
                class: "u-clear-icon",
                size: 30,
                name: $props.searchIcon,
                color: $props.searchIconColor ? $props.searchIconColor : $props.color
              }, null, 8, ["name", "color"])
            ]),
            vue.createElementVNode("input", {
              "confirm-type": "search",
              onBlur: _cache[0] || (_cache[0] = (...args) => $options.blur && $options.blur(...args)),
              value: $options.valueCom,
              onConfirm: _cache[1] || (_cache[1] = (...args) => $options.search && $options.search(...args)),
              onInput: _cache[2] || (_cache[2] = (...args) => $options.inputChange && $options.inputChange(...args)),
              disabled: $props.disabled,
              onFocus: _cache[3] || (_cache[3] = (...args) => $options.getFocus && $options.getFocus(...args)),
              focus: $props.focus,
              maxlength: $props.maxlength,
              "placeholder-class": "u-placeholder-class",
              placeholder: $props.placeholder,
              "placeholder-style": `color: ${$props.placeholderColor}`,
              class: "u-input",
              type: "text",
              style: vue.normalizeStyle([{
                textAlign: $props.inputAlign,
                color: $props.color,
                backgroundColor: $props.bgColor
              }, $props.inputStyle])
            }, null, 44, ["value", "disabled", "focus", "maxlength", "placeholder", "placeholder-style"]),
            $data.keyword && $props.clearabled && $data.focused ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "u-close-wrap",
              onClick: _cache[4] || (_cache[4] = (...args) => $options.clear && $options.clear(...args))
            }, [
              vue.createVNode(_component_u_icon, {
                class: "u-clear-icon",
                name: "close-circle-fill",
                size: "34",
                color: "#c0c4cc"
              })
            ])) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        ),
        vue.createElementVNode(
          "view",
          {
            style: vue.normalizeStyle([$props.actionStyle]),
            class: vue.normalizeClass(["u-action", [$options.showActionBtn || $data.show ? "u-action-active" : ""]]),
            onClick: _cache[5] || (_cache[5] = vue.withModifiers((...args) => $options.custom && $options.custom(...args), ["stop", "prevent"]))
          },
          vue.toDisplayString($props.actionText),
          7
          /* TEXT, CLASS, STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0$2 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["render", _sfc_render$6], ["__scopeId", "data-v-3cb29fc1"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/uni_modules/vk-uview-ui/components/u-search/u-search.vue"]]);
  const _sfc_main$9 = {
    name: "u-image",
    emits: ["click", "error", "load"],
    props: {
      // 图片地址
      src: {
        type: [String, null],
        default: ""
      },
      // 裁剪模式
      mode: {
        type: String,
        default: "aspectFill"
      },
      // 宽度，单位任意
      width: {
        type: [String, Number],
        default: "100%"
      },
      // 高度，单位任意
      height: {
        type: [String, Number],
        default: "auto"
      },
      // 图片形状，circle-圆形，square-方形
      shape: {
        type: String,
        default: "square"
      },
      // 圆角，单位任意
      borderRadius: {
        type: [String, Number],
        default: 0
      },
      // 是否懒加载，微信小程序、App、百度小程序、字节跳动小程序
      lazyLoad: {
        type: Boolean,
        default: true
      },
      // 开启长按图片显示识别微信小程序码菜单
      showMenuByLongpress: {
        type: Boolean,
        default: true
      },
      // 加载中的图标，或者小图片
      loadingIcon: {
        type: String,
        default: "photo"
      },
      // 加载失败的图标，或者小图片
      errorIcon: {
        type: String,
        default: "error-circle"
      },
      // 是否显示加载中的图标或者自定义的slot
      showLoading: {
        type: Boolean,
        default: true
      },
      // 是否显示加载错误的图标或者自定义的slot
      showError: {
        type: Boolean,
        default: true
      },
      // 是否需要淡入效果
      fade: {
        type: Boolean,
        default: true
      },
      // 只支持网络资源，只对微信小程序有效
      webp: {
        type: Boolean,
        default: false
      },
      // 过渡时间，单位ms
      duration: {
        type: [String, Number],
        default: 500
      },
      // 背景颜色，用于深色页面加载图片时，为了和背景色融合
      bgColor: {
        type: String,
        default: "#f3f4f6"
      }
    },
    data() {
      return {
        // 图片是否加载错误，如果是，则显示错误占位图
        isError: false,
        // 初始化组件时，默认为加载中状态
        loading: true,
        // 不透明度，为了实现淡入淡出的效果
        opacity: 1,
        // 过渡时间，因为props的值无法修改，故需要一个中间值
        durationTime: this.duration,
        // 图片加载完成时，去掉背景颜色，因为如果是png图片，就会显示灰色的背景
        backgroundStyle: {}
      };
    },
    watch: {
      src: {
        immediate: true,
        handler(n) {
          if (!n) {
            this.isError = true;
            this.loading = false;
          } else {
            this.isError = false;
            this.loading = true;
          }
        }
      }
    },
    computed: {
      wrapStyle() {
        let style = {};
        style.width = this.$u.addUnit(this.width);
        style.height = this.$u.addUnit(this.height);
        style.borderRadius = this.shape == "circle" ? "50%" : this.$u.addUnit(this.borderRadius);
        style.overflow = this.borderRadius > 0 ? "hidden" : "visible";
        if (this.fade) {
          style.opacity = this.opacity;
          style.transition = `opacity ${Number(this.durationTime) / 1e3}s ease-in-out`;
        }
        return style;
      }
    },
    methods: {
      // 点击图片
      onClick() {
        this.$emit("click");
      },
      // 图片加载失败
      onErrorHandler(err) {
        this.loading = false;
        this.isError = true;
        this.$emit("error", err);
      },
      // 图片加载完成，标记loading结束
      onLoadHandler() {
        this.loading = false;
        this.isError = false;
        this.$emit("load");
        if (!this.fade)
          return this.removeBgColor();
        this.opacity = 0;
        this.durationTime = 0;
        setTimeout(() => {
          this.durationTime = this.duration;
          this.opacity = 1;
          setTimeout(() => {
            this.removeBgColor();
          }, this.durationTime);
        }, 50);
      },
      // 移除图片的背景色
      removeBgColor() {
        this.backgroundStyle = {
          backgroundColor: "transparent"
        };
      }
    }
  };
  function _sfc_render$5(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-image",
        onClick: _cache[2] || (_cache[2] = (...args) => $options.onClick && $options.onClick(...args)),
        style: vue.normalizeStyle([$options.wrapStyle, $data.backgroundStyle])
      },
      [
        !$data.isError ? (vue.openBlock(), vue.createElementBlock("image", {
          key: 0,
          src: $props.src,
          mode: $props.mode,
          onError: _cache[0] || (_cache[0] = (...args) => $options.onErrorHandler && $options.onErrorHandler(...args)),
          onLoad: _cache[1] || (_cache[1] = (...args) => $options.onLoadHandler && $options.onLoadHandler(...args)),
          "lazy-load": $props.lazyLoad,
          class: "u-image__image",
          "show-menu-by-longpress": $props.showMenuByLongpress,
          style: vue.normalizeStyle({
            borderRadius: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius)
          })
        }, null, 44, ["src", "mode", "lazy-load", "show-menu-by-longpress"])) : vue.createCommentVNode("v-if", true),
        $props.showLoading && $data.loading ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: "u-image__loading",
            style: vue.normalizeStyle({
              borderRadius: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius),
              backgroundColor: $props.bgColor
            })
          },
          [
            _ctx.$slots.loading ? vue.renderSlot(_ctx.$slots, "loading", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_u_icon, {
              key: 1,
              name: $props.loadingIcon,
              width: $props.width,
              height: $props.height
            }, null, 8, ["name", "width", "height"]))
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true),
        $props.showError && $data.isError && !$data.loading ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 2,
            class: "u-image__error",
            style: vue.normalizeStyle({
              borderRadius: $props.shape == "circle" ? "50%" : _ctx.$u.addUnit($props.borderRadius)
            })
          },
          [
            _ctx.$slots.error ? vue.renderSlot(_ctx.$slots, "error", { key: 0 }, void 0, true) : (vue.openBlock(), vue.createBlock(_component_u_icon, {
              key: 1,
              name: $props.errorIcon,
              width: $props.width,
              height: $props.height
            }, null, 8, ["name", "width", "height"]))
          ],
          4
          /* STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["render", _sfc_render$5], ["__scopeId", "data-v-6ff2fb1e"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/uni_modules/vk-uview-ui/components/u-image/u-image.vue"]]);
  const _sfc_main$8 = {
    name: "u-card",
    emits: ["click", "head-click", "body-click", "foot-click"],
    props: {
      // 与屏幕两侧是否留空隙
      full: {
        type: Boolean,
        default: false
      },
      // 标题
      title: {
        type: String,
        default: ""
      },
      // 标题颜色
      titleColor: {
        type: String,
        default: "#303133"
      },
      // 标题字体大小，单位rpx
      titleSize: {
        type: [Number, String],
        default: "30"
      },
      // 副标题
      subTitle: {
        type: String,
        default: ""
      },
      // 副标题颜色
      subTitleColor: {
        type: String,
        default: "#909399"
      },
      // 副标题字体大小，单位rpx
      subTitleSize: {
        type: [Number, String],
        default: "26"
      },
      // 是否显示外部边框，只对full=false时有效(卡片与边框有空隙时)
      border: {
        type: Boolean,
        default: true
      },
      // 用于标识点击了第几个
      index: {
        type: [Number, String, Object],
        default: ""
      },
      // 用于隔开上下左右的边距，带单位的写法，如："30rpx 30rpx"，"20rpx 20rpx 30rpx 30rpx"
      margin: {
        type: String,
        default: "30rpx"
      },
      // card卡片的圆角
      borderRadius: {
        type: [Number, String],
        default: "16"
      },
      // 头部自定义样式，对象形式
      headStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 主体自定义样式，对象形式
      bodyStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 底部自定义样式，对象形式
      footStyle: {
        type: Object,
        default() {
          return {};
        }
      },
      // 头部是否下边框
      headBorderBottom: {
        type: Boolean,
        default: true
      },
      // 底部是否有上边框
      footBorderTop: {
        type: Boolean,
        default: true
      },
      // 标题左边的缩略图
      thumb: {
        type: String,
        default: ""
      },
      // 缩略图宽高，单位rpx
      thumbWidth: {
        type: [String, Number],
        default: "60"
      },
      // 缩略图是否为圆形
      thumbCircle: {
        type: Boolean,
        default: false
      },
      // 给head，body，foot的内边距
      padding: {
        type: [String, Number],
        default: "30"
      },
      // 是否显示头部
      showHead: {
        type: Boolean,
        default: true
      },
      // 是否显示尾部
      showFoot: {
        type: Boolean,
        default: true
      },
      // 卡片外围阴影，字符串形式
      boxShadow: {
        type: String,
        default: "none"
      }
    },
    data() {
      return {};
    },
    methods: {
      click() {
        this.$emit("click", this.index);
      },
      headClick() {
        this.$emit("head-click", this.index);
      },
      bodyClick() {
        this.$emit("body-click", this.index);
      },
      footClick() {
        this.$emit("foot-click", this.index);
      }
    }
  };
  function _sfc_render$4(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: vue.normalizeClass(["u-card", { "u-border": $props.border, "u-card-full": $props.full, "u-card--border": $props.borderRadius > 0 }]),
        onClick: _cache[3] || (_cache[3] = vue.withModifiers((...args) => $options.click && $options.click(...args), ["stop"])),
        style: vue.normalizeStyle({
          "--radius": $props.borderRadius + "rpx",
          margin: $props.margin,
          boxShadow: $props.boxShadow
        })
      },
      [
        $props.showHead ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 0,
            class: vue.normalizeClass(["u-card__head", {
              "u-border-bottom": $props.headBorderBottom
            }]),
            style: vue.normalizeStyle([{ padding: $props.padding + "rpx" }, $props.headStyle]),
            onClick: _cache[0] || (_cache[0] = (...args) => $options.headClick && $options.headClick(...args))
          },
          [
            !_ctx.$slots.head ? (vue.openBlock(), vue.createElementBlock("view", {
              key: 0,
              class: "u-flex u-row-between"
            }, [
              $props.title ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 0,
                class: "u-card__head--left u-flex u-line-1"
              }, [
                $props.thumb ? (vue.openBlock(), vue.createElementBlock("image", {
                  key: 0,
                  src: $props.thumb,
                  class: "u-card__head--left__thumb",
                  mode: "aspectFill",
                  style: vue.normalizeStyle({
                    height: $props.thumbWidth + "rpx",
                    width: $props.thumbWidth + "rpx",
                    borderRadius: $props.thumbCircle ? "100rpx" : "6rpx"
                  })
                }, null, 12, ["src"])) : vue.createCommentVNode("v-if", true),
                vue.createElementVNode(
                  "text",
                  {
                    class: "u-card__head--left__title u-line-1",
                    style: vue.normalizeStyle({
                      fontSize: $props.titleSize + "rpx",
                      color: $props.titleColor
                    })
                  },
                  vue.toDisplayString($props.title),
                  5
                  /* TEXT, STYLE */
                )
              ])) : vue.createCommentVNode("v-if", true),
              $props.subTitle ? (vue.openBlock(), vue.createElementBlock("view", {
                key: 1,
                class: "u-card__head--right u-line-1"
              }, [
                vue.createElementVNode(
                  "text",
                  {
                    class: "u-card__head__title__text",
                    style: vue.normalizeStyle({
                      fontSize: $props.subTitleSize + "rpx",
                      color: $props.subTitleColor
                    })
                  },
                  vue.toDisplayString($props.subTitle),
                  5
                  /* TEXT, STYLE */
                )
              ])) : vue.createCommentVNode("v-if", true)
            ])) : vue.renderSlot(_ctx.$slots, "head", { key: 1 }, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true),
        vue.createElementVNode(
          "view",
          {
            onClick: _cache[1] || (_cache[1] = (...args) => $options.bodyClick && $options.bodyClick(...args)),
            class: "u-card__body",
            style: vue.normalizeStyle([{ padding: $props.padding + "rpx" }, $props.bodyStyle])
          },
          [
            vue.renderSlot(_ctx.$slots, "body", {}, void 0, true)
          ],
          4
          /* STYLE */
        ),
        $props.showFoot ? (vue.openBlock(), vue.createElementBlock(
          "view",
          {
            key: 1,
            class: vue.normalizeClass(["u-card__foot", {
              "u-border-top": $props.footBorderTop
            }]),
            onClick: _cache[2] || (_cache[2] = (...args) => $options.footClick && $options.footClick(...args)),
            style: vue.normalizeStyle([{ padding: _ctx.$slots.foot ? $props.padding + "rpx" : 0 }, $props.footStyle])
          },
          [
            vue.renderSlot(_ctx.$slots, "foot", {}, void 0, true)
          ],
          6
          /* CLASS, STYLE */
        )) : vue.createCommentVNode("v-if", true)
      ],
      6
      /* CLASS, STYLE */
    );
  }
  const __easycom_2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["render", _sfc_render$4], ["__scopeId", "data-v-797f62c7"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/uni_modules/vk-uview-ui/components/u-card/u-card.vue"]]);
  const _sfc_main$7 = {
    name: "u-badge",
    props: {
      // primary,warning,success,error,info
      type: {
        type: String,
        default: "error"
      },
      // default, mini
      size: {
        type: String,
        default: "default"
      },
      //是否是圆点
      isDot: {
        type: Boolean,
        default: false
      },
      // 显示的数值内容
      count: {
        type: [Number, String]
      },
      // 展示封顶的数字值
      overflowCount: {
        type: Number,
        default: 99
      },
      // 当数值为 0 时，是否展示 Badge
      showZero: {
        type: Boolean,
        default: false
      },
      // 位置偏移
      offset: {
        type: Array,
        default: () => {
          return [20, 20];
        }
      },
      // 是否开启绝对定位，开启了offset才会起作用
      absolute: {
        type: Boolean,
        default: true
      },
      // 字体大小
      fontSize: {
        type: [String, Number],
        default: "24"
      },
      // 字体演示
      color: {
        type: String,
        default: "#ffffff"
      },
      // badge的背景颜色
      bgColor: {
        type: String,
        default: ""
      },
      // 是否让badge组件的中心点和父组件右上角重合，配置的话，offset将会失效
      isCenter: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      // 是否将badge中心与父组件右上角重合
      boxStyle() {
        let style = {};
        if (this.isCenter) {
          style.top = 0;
          style.right = 0;
          style.transform = "translateY(-50%) translateX(50%)";
        } else {
          style.top = this.offset[0] + "rpx";
          style.right = this.offset[1] + "rpx";
          style.transform = "translateY(0) translateX(0)";
        }
        if (this.size == "mini") {
          style.transform = style.transform + " scale(0.8)";
        }
        return style;
      },
      // isDot类型时，不显示文字
      showText() {
        if (this.isDot)
          return "";
        else {
          if (this.count > this.overflowCount)
            return `${this.overflowCount}+`;
          else
            return this.count;
        }
      },
      // 是否显示组件
      show() {
        if (this.count == 0 && this.showZero == false)
          return false;
        else
          return true;
      }
    }
  };
  function _sfc_render$3(_ctx, _cache, $props, $setup, $data, $options) {
    return $options.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: vue.normalizeClass(["u-badge", [
          $props.isDot ? "u-badge-dot" : "",
          $props.size == "mini" ? "u-badge-mini" : "",
          $props.type ? "u-badge--bg--" + $props.type : ""
        ]]),
        style: vue.normalizeStyle([{
          top: $props.offset[0] + "rpx",
          right: $props.offset[1] + "rpx",
          fontSize: $props.fontSize + "rpx",
          position: $props.absolute ? "absolute" : "static",
          color: $props.color,
          backgroundColor: $props.bgColor
        }, $options.boxStyle])
      },
      vue.toDisplayString($options.showText),
      7
      /* TEXT, CLASS, STYLE */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_1 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["render", _sfc_render$3], ["__scopeId", "data-v-f84de764"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/uni_modules/vk-uview-ui/components/u-badge/u-badge.vue"]]);
  const _sfc_main$6 = {
    emits: ["update:modelValue", "input", "change"],
    props: {
      // 通过v-model绑定current值
      value: {
        type: [String, Number],
        default: 0
      },
      modelValue: {
        type: [String, Number],
        default: 0
      },
      // 显示与否
      show: {
        type: Boolean,
        default: true
      },
      // 整个tabbar的背景颜色
      bgColor: {
        type: String,
        default: "#ffffff"
      },
      // tabbar的高度，默认50px，单位任意，如果为数值，则为rpx单位
      height: {
        type: [String, Number],
        default: "50px"
      },
      // 非凸起图标的大小，单位任意，数值默认rpx
      iconSize: {
        type: [String, Number],
        default: 40
      },
      // 凸起的图标的大小，单位任意，数值默认rpx
      midButtonSize: {
        type: [String, Number],
        default: 90
      },
      // 激活时的演示，包括字体图标，提示文字等的演示
      activeColor: {
        type: String,
        default: "#303133"
      },
      // 未激活时的颜色
      inactiveColor: {
        type: String,
        default: "#606266"
      },
      // 是否显示中部的凸起按钮
      midButton: {
        type: Boolean,
        default: false
      },
      // 配置参数
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      // 切换前的回调
      beforeSwitch: {
        type: Function,
        default: null
      },
      // 是否显示顶部的横线
      borderTop: {
        type: Boolean,
        default: true
      },
      // 是否隐藏原生tabbar
      hideTabBar: {
        type: Boolean,
        default: true
      }
    },
    data() {
      return {
        // 由于安卓太菜了，通过css居中凸起按钮的外层元素有误差，故通过js计算将其居中
        midButtonLeft: "50%",
        pageUrl: ""
        // 当前页面URL
      };
    },
    created() {
      if (this.hideTabBar)
        uni.hideTabBar();
      let pages = getCurrentPages();
      if (pages.length > 0) {
        this.pageUrl = pages[pages.length - 1].route;
      }
    },
    computed: {
      valueCom() {
        return this.modelValue;
      },
      elIconPath() {
        return (index) => {
          let pagePath = this.list[index].pagePath;
          if (pagePath) {
            if (pagePath == this.pageUrl || pagePath == "/" + this.pageUrl) {
              return this.list[index].selectedIconPath;
            } else {
              return this.list[index].iconPath;
            }
          } else {
            return index == this.valueCom ? this.list[index].selectedIconPath : this.list[index].iconPath;
          }
        };
      },
      elColor() {
        return (index) => {
          let pagePath = this.list[index].pagePath;
          if (pagePath) {
            if (pagePath == this.pageUrl || pagePath == "/" + this.pageUrl)
              return this.activeColor;
            else
              return this.inactiveColor;
          } else {
            return index == this.valueCom ? this.activeColor : this.inactiveColor;
          }
        };
      }
    },
    mounted() {
      this.midButton && this.getMidButtonLeft();
    },
    methods: {
      async clickHandler(index) {
        if (this.beforeSwitch && typeof this.beforeSwitch === "function") {
          let beforeSwitch = this.beforeSwitch.bind(this.$u.$parent.call(this))(index);
          if (!!beforeSwitch && typeof beforeSwitch.then === "function") {
            await beforeSwitch.then((res) => {
              this.switchTab(index);
            }).catch((err) => {
            });
          } else if (beforeSwitch === true) {
            this.switchTab(index);
          }
        } else {
          this.switchTab(index);
        }
      },
      // 切换tab
      switchTab(index) {
        this.$emit("change", index);
        if (this.list[index].pagePath) {
          let url2 = this.list[index].pagePath;
          uni.switchTab({
            url: url2,
            fail: (err) => {
              if (err && err.errMsg && err.errMsg.indexOf("tabBar") > -1) {
                uni.navigateTo({ url: url2 });
              } else {
                formatAppLog("error", "at uni_modules/vk-uview-ui/components/u-tabbar/u-tabbar.vue:254", err);
              }
            }
          });
        } else {
          this.$emit("input", index);
          this.$emit("update:modelValue", index);
        }
      },
      // 计算角标的right值
      getOffsetRight(count, isDot) {
        if (isDot) {
          return -20;
        } else if (count > 9) {
          return -40;
        } else {
          return -30;
        }
      },
      // 获取凸起按钮外层元素的left值，让其水平居中
      getMidButtonLeft() {
        let windowWidth = this.$u.sys().windowWidth;
        this.midButtonLeft = windowWidth / 2 + "px";
      }
    }
  };
  function _sfc_render$2(_ctx, _cache, $props, $setup, $data, $options) {
    const _component_u_icon = resolveEasycom(vue.resolveDynamicComponent("u-icon"), __easycom_0$3);
    const _component_u_badge = resolveEasycom(vue.resolveDynamicComponent("u-badge"), __easycom_1);
    return $props.show ? (vue.openBlock(), vue.createElementBlock(
      "view",
      {
        key: 0,
        class: "u-tabbar",
        onTouchmove: _cache[0] || (_cache[0] = vue.withModifiers(() => {
        }, ["stop", "prevent"]))
      },
      [
        vue.createElementVNode(
          "view",
          {
            class: vue.normalizeClass(["u-tabbar__content safe-area-inset-bottom", {
              "u-border-top": $props.borderTop
            }]),
            style: vue.normalizeStyle({
              height: _ctx.$u.addUnit($props.height),
              backgroundColor: $props.bgColor
            })
          },
          [
            (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              null,
              vue.renderList($props.list, (item, index) => {
                return vue.openBlock(), vue.createElementBlock("view", {
                  class: vue.normalizeClass(["u-tabbar__content__item", {
                    "u-tabbar__content__circle": $props.midButton && item.midButton
                  }]),
                  key: index,
                  onClick: vue.withModifiers(($event) => $options.clickHandler(index), ["stop"]),
                  style: vue.normalizeStyle({
                    backgroundColor: $props.bgColor
                  })
                }, [
                  vue.createElementVNode(
                    "view",
                    {
                      class: vue.normalizeClass([
                        $props.midButton && item.midButton ? "u-tabbar__content__circle__button" : "u-tabbar__content__item__button"
                      ])
                    },
                    [
                      vue.createVNode(_component_u_icon, {
                        size: $props.midButton && item.midButton ? $props.midButtonSize : $props.iconSize,
                        name: $options.elIconPath(index),
                        "img-mode": "scaleToFill",
                        color: $options.elColor(index),
                        "custom-prefix": item.customIcon ? "custom-icon" : "uicon"
                      }, null, 8, ["size", "name", "color", "custom-prefix"]),
                      item.count ? (vue.openBlock(), vue.createBlock(_component_u_badge, {
                        key: 0,
                        count: item.count,
                        "is-dot": item.isDot,
                        offset: [-2, $options.getOffsetRight(item.count, item.isDot)]
                      }, null, 8, ["count", "is-dot", "offset"])) : vue.createCommentVNode("v-if", true)
                    ],
                    2
                    /* CLASS */
                  ),
                  vue.createElementVNode(
                    "view",
                    {
                      class: "u-tabbar__content__item__text",
                      style: vue.normalizeStyle({
                        color: $options.elColor(index)
                      })
                    },
                    [
                      vue.createElementVNode(
                        "text",
                        { class: "u-line-1" },
                        vue.toDisplayString(item.text),
                        1
                        /* TEXT */
                      )
                    ],
                    4
                    /* STYLE */
                  )
                ], 14, ["onClick"]);
              }),
              128
              /* KEYED_FRAGMENT */
            )),
            $props.midButton ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 0,
                class: vue.normalizeClass(["u-tabbar__content__circle__border", {
                  "u-border": $props.borderTop
                }]),
                style: vue.normalizeStyle({
                  backgroundColor: $props.bgColor,
                  left: $data.midButtonLeft
                })
              },
              null,
              6
              /* CLASS, STYLE */
            )) : vue.createCommentVNode("v-if", true)
          ],
          6
          /* CLASS, STYLE */
        ),
        vue.createCommentVNode(" 这里加上一个48rpx的高度,是为了增高有凸起按钮时的防塌陷高度(也即按钮凸出来部分的高度) "),
        vue.createElementVNode(
          "view",
          {
            class: "u-fixed-placeholder safe-area-inset-bottom",
            style: vue.normalizeStyle({
              height: `calc(${_ctx.$u.addUnit($props.height)} + ${$props.midButton ? 48 : 0}rpx)`
            })
          },
          null,
          4
          /* STYLE */
        )
      ],
      32
      /* HYDRATE_EVENTS */
    )) : vue.createCommentVNode("v-if", true);
  }
  const __easycom_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["render", _sfc_render$2], ["__scopeId", "data-v-d1ac5dd3"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/uni_modules/vk-uview-ui/components/u-tabbar/u-tabbar.vue"]]);
  const request = (url2, method = "GET", data = {}, header = {}) => {
    return new Promise((resolve, reject) => {
      header["Authorization"] = uni.getStorageSync("token");
      uni.request({
        url: url2,
        method,
        data,
        header,
        success: (res) => {
          if (res.data.code == 401) {
            uni.reLaunch({
              url: "/pages/login/login"
            });
          }
          resolve(res.data);
        },
        fail: (err) => {
          let result = { code: 500, msg: "获取数据失败" };
          reject(result);
        }
      });
    });
  };
  const uploadFile = (filePath) => {
    return new Promise((resolve, reject) => {
      let header = {};
      header["Authorization"] = uni.getStorageSync("token");
      uni.uploadFile({
        url: fileUrl,
        //仅为示例，非真实的接口地址
        filePath,
        name: "file",
        formData: {
          "user": "test"
        },
        header,
        success: (res) => {
          resolve(JSON.parse(res.data));
        },
        fail: (err) => {
          let result = {
            code: 500,
            msg: "获取数据失败"
          };
          reject(result);
        }
      });
    });
  };
  const form = (url2, param) => {
    return request(url2, "post", param, { "Content-Type": "application/x-www-form-urlencoded" });
  };
  const post = (url2, param) => {
    return request(url2, "post", param, { "Content-Type": "application/json" });
  };
  const loadPostData = (url2, param, ref) => {
    let res = post(url2, param);
    res.then((res2) => {
      if (res2.code !== 200) {
        return;
      }
      ref.value = res2.data || [];
    }).catch((err) => {
      formatAppLog("log", "at utils/request.js:76", err);
    });
  };
  const loadFormData = (url2, param, ref) => {
    let res = form(url2, param);
    res.then((res2) => {
      if (res2.code !== 200) {
        return;
      }
      ref.value = res2.data || [];
    }).catch((err) => {
      formatAppLog("log", "at utils/request.js:88", err);
    });
  };
  const loadPostCallback = (url2, param, callback) => {
    let res = post(url2, param);
    res.then((res2) => {
      if (res2.code !== 200) {
        return;
      }
      if (callback) {
        callback(res2);
      }
    }).catch((err) => {
      formatAppLog("log", "at utils/request.js:104", err);
    });
  };
  const request$1 = { uploadFile, request, form, post, loadPostData, loadFormData, loadPostCallback };
  const _sfc_main$5 = {
    name: "u-swiper",
    emits: ["click", "change"],
    props: {
      // 轮播图的数据,格式如：[{image: 'xxxx', title: 'xxxx'}，{image: 'yyyy', title: 'yyyy'}]，其中title字段可选
      list: {
        type: Array,
        default() {
          return [];
        }
      },
      // 是否显示title标题
      title: {
        type: Boolean,
        default: false
      },
      // 用户自定义的指示器的样式
      indicator: {
        type: Object,
        default() {
          return {};
        }
      },
      // 圆角值
      borderRadius: {
        type: [Number, String],
        default: 8
      },
      // 隔多久自动切换
      interval: {
        type: [String, Number],
        default: 3e3
      },
      // 指示器的模式，rect|dot|number|round
      mode: {
        type: String,
        default: "round"
      },
      // list的高度，单位rpx
      height: {
        type: [Number, String],
        default: 250
      },
      // 指示器的位置，topLeft|topCenter|topRight|bottomLeft|bottomCenter|bottomRight
      indicatorPos: {
        type: String,
        default: "bottomCenter"
      },
      // 是否开启缩放效果
      effect3d: {
        type: Boolean,
        default: false
      },
      // 3D模式的情况下，激活item与前后item之间的距离，单位rpx
      effect3dPreviousMargin: {
        type: [Number, String],
        default: 50
      },
      // 是否自动播放
      autoplay: {
        type: Boolean,
        default: true
      },
      // 自动轮播时间间隔，单位ms
      duration: {
        type: [Number, String],
        default: 500
      },
      // 是否衔接滑动，即到最后一张时接着滑动，是否自动切换到第一张
      circular: {
        type: Boolean,
        default: true
      },
      // 图片的裁剪模式 
      imgMode: {
        type: String,
        default: "aspectFill"
      },
      // 从list数组中读取的图片的属性名
      name: {
        type: String,
        default: "image"
      },
      // 背景颜色
      bgColor: {
        type: String,
        default: "#f3f4f6"
      },
      // 初始化时，默认显示第几项
      current: {
        type: [Number, String],
        default: 0
      },
      // 标题的样式，对象形式
      titleStyle: {
        type: Object,
        default() {
          return {};
        }
      }
    },
    watch: {
      // 如果外部的list发生变化，判断长度是否被修改，如果前后长度不一致，重置uCurrent值，避免溢出
      list(nVal, oVal) {
        if (nVal.length !== oVal.length)
          this.uCurrent = 0;
      },
      // 监听外部current的变化，实时修改内部依赖于此测uCurrent值，如果更新了current，而不是更新uCurrent，
      // 就会错乱，因为指示器是依赖于uCurrent的
      current(n) {
        this.uCurrent = n;
      }
    },
    data() {
      return {
        uCurrent: this.current
        // 当前活跃的swiper-item的index
      };
    },
    computed: {
      justifyContent() {
        if (this.indicatorPos == "topLeft" || this.indicatorPos == "bottomLeft")
          return "flex-start";
        if (this.indicatorPos == "topCenter" || this.indicatorPos == "bottomCenter")
          return "center";
        if (this.indicatorPos == "topRight" || this.indicatorPos == "bottomRight")
          return "flex-end";
      },
      titlePaddingBottom() {
        let tmp = 0;
        if (this.mode == "none")
          return "12rpx";
        if (["bottomLeft", "bottomCenter", "bottomRight"].indexOf(this.indicatorPos) >= 0 && this.mode == "number") {
          tmp = "60rpx";
        } else if (["bottomLeft", "bottomCenter", "bottomRight"].indexOf(this.indicatorPos) >= 0 && this.mode != "number") {
          tmp = "40rpx";
        } else {
          tmp = "12rpx";
        }
        return tmp;
      },
      // 因为uni的swiper组件的current参数只接受Number类型，这里做一个转换
      elCurrent() {
        return Number(this.current);
      }
    },
    methods: {
      listClick(index) {
        this.$emit("click", index);
      },
      change(e) {
        let current = e.detail.current;
        this.uCurrent = current;
        this.$emit("change", current);
      },
      // 头条小程序不支持animationfinish事件，改由change事件
      // 暂不监听此事件，因为不再给swiper绑定uCurrent属性
      animationfinish(e) {
      }
    }
  };
  function _sfc_render$1(_ctx, _cache, $props, $setup, $data, $options) {
    return vue.openBlock(), vue.createElementBlock(
      "view",
      {
        class: "u-swiper-wrap",
        style: vue.normalizeStyle({
          borderRadius: `${$props.borderRadius}rpx`
        })
      },
      [
        vue.createElementVNode("swiper", {
          current: $options.elCurrent,
          onChange: _cache[0] || (_cache[0] = (...args) => $options.change && $options.change(...args)),
          onAnimationfinish: _cache[1] || (_cache[1] = (...args) => $options.animationfinish && $options.animationfinish(...args)),
          interval: $props.interval,
          circular: $props.circular,
          duration: $props.duration,
          autoplay: $props.autoplay,
          "previous-margin": $props.effect3d ? $props.effect3dPreviousMargin + "rpx" : "0",
          "next-margin": $props.effect3d ? $props.effect3dPreviousMargin + "rpx" : "0",
          style: vue.normalizeStyle({
            height: $props.height + "rpx",
            backgroundColor: $props.bgColor
          })
        }, [
          (vue.openBlock(true), vue.createElementBlock(
            vue.Fragment,
            null,
            vue.renderList($props.list, (item, index) => {
              return vue.openBlock(), vue.createElementBlock("swiper-item", {
                class: "u-swiper-item",
                key: index
              }, [
                vue.createElementVNode("view", {
                  class: vue.normalizeClass(["u-list-image-wrap", [$data.uCurrent != index ? "u-list-scale" : ""]]),
                  onClick: vue.withModifiers(($event) => $options.listClick(index), ["stop", "prevent"]),
                  style: vue.normalizeStyle({
                    borderRadius: `${$props.borderRadius}rpx`,
                    transform: $props.effect3d && $data.uCurrent != index ? "scaleY(0.9)" : "scaleY(1)",
                    margin: $props.effect3d && $data.uCurrent != index ? "0 20rpx" : 0
                  })
                }, [
                  vue.createElementVNode("image", {
                    class: "u-swiper-image",
                    src: item[$props.name] || item,
                    mode: $props.imgMode
                  }, null, 8, ["src", "mode"]),
                  $props.title && item.title ? (vue.openBlock(), vue.createElementBlock(
                    "view",
                    {
                      key: 0,
                      class: "u-swiper-title u-line-1",
                      style: vue.normalizeStyle([{
                        "padding-bottom": $options.titlePaddingBottom
                      }, $props.titleStyle])
                    },
                    vue.toDisplayString(item.title),
                    5
                    /* TEXT, STYLE */
                  )) : vue.createCommentVNode("v-if", true)
                ], 14, ["onClick"])
              ]);
            }),
            128
            /* KEYED_FRAGMENT */
          ))
        ], 44, ["current", "interval", "circular", "duration", "autoplay", "previous-margin", "next-margin"]),
        vue.createElementVNode(
          "view",
          {
            class: "u-swiper-indicator",
            style: vue.normalizeStyle({
              top: $props.indicatorPos == "topLeft" || $props.indicatorPos == "topCenter" || $props.indicatorPos == "topRight" ? "12rpx" : "auto",
              bottom: $props.indicatorPos == "bottomLeft" || $props.indicatorPos == "bottomCenter" || $props.indicatorPos == "bottomRight" ? "12rpx" : "auto",
              justifyContent: $options.justifyContent,
              padding: `0 ${$props.effect3d ? "74rpx" : "24rpx"}`
            })
          },
          [
            $props.mode == "rect" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 0 },
              vue.renderList($props.list, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: vue.normalizeClass(["u-indicator-item-rect", { "u-indicator-item-rect-active": index == $data.uCurrent }]),
                    key: index
                  },
                  null,
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            $props.mode == "dot" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 1 },
              vue.renderList($props.list, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: vue.normalizeClass(["u-indicator-item-dot", { "u-indicator-item-dot-active": index == $data.uCurrent }]),
                    key: index
                  },
                  null,
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            $props.mode == "round" ? (vue.openBlock(true), vue.createElementBlock(
              vue.Fragment,
              { key: 2 },
              vue.renderList($props.list, (item, index) => {
                return vue.openBlock(), vue.createElementBlock(
                  "view",
                  {
                    class: vue.normalizeClass(["u-indicator-item-round", { "u-indicator-item-round-active": index == $data.uCurrent }]),
                    key: index
                  },
                  null,
                  2
                  /* CLASS */
                );
              }),
              128
              /* KEYED_FRAGMENT */
            )) : vue.createCommentVNode("v-if", true),
            $props.mode == "number" ? (vue.openBlock(), vue.createElementBlock(
              "view",
              {
                key: 3,
                class: "u-indicator-item-number"
              },
              vue.toDisplayString($data.uCurrent + 1) + "/" + vue.toDisplayString($props.list.length),
              1
              /* TEXT */
            )) : vue.createCommentVNode("v-if", true)
          ],
          4
          /* STYLE */
        )
      ],
      4
      /* STYLE */
    );
  }
  const __easycom_0 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["render", _sfc_render$1], ["__scopeId", "data-v-d9fea6b1"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/uni_modules/vk-uview-ui/components/u-swiper/u-swiper.vue"]]);
  const _sfc_main$4 = {
    __name: "swiper1",
    setup(__props, { expose }) {
      let swiperList = vue.ref([]);
      let loading = vue.ref(true);
      const getData = () => {
        loading.value = true;
        request$1.request("https://api.waifu.im/search", "get", {
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
        uni.previewImage({
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
              formatAppLog("log", "at pages/home/swiper1.vue:52", err.errMsg);
            }
          }
        });
      };
      const savePic = (src) => {
        uni.downloadFile({
          url: src,
          success(res) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                uni.showToast({
                  title: "保存成功",
                  icon: "succeed"
                });
              },
              fail(err) {
                uni.showToast({
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
        const _component_u_swiper = resolveEasycom(vue.resolveDynamicComponent("u-swiper"), __easycom_0);
        return vue.openBlock(), vue.createElementBlock("view", { class: "u-skeleton" }, [
          vue.createVNode(_component_u_swiper, {
            list: vue.unref(swiperList),
            effect3d: true,
            height: 400,
            onClick: showPic
          }, null, 8, ["list"]),
          vue.createCommentVNode(' <u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton> ')
        ]);
      };
    }
  };
  const swiper1 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-d448d23c"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/home/swiper1.vue"]]);
  const _sfc_main$3 = {
    __name: "index",
    setup(__props) {
      let loading = vue.ref(false);
      let keyword = vue.ref("爆照的老恐龙");
      let swiper1Ref = vue.ref();
      onPullDownRefresh(() => {
        swiper1Ref.value.getData();
        getAllTags();
        setTimeout(function() {
          uni.stopPullDownRefresh();
        }, 1e3);
      });
      let tags = vue.ref({});
      let nsfwList = vue.ref([]);
      let versatileList = vue.ref([]);
      let picList = vue.ref([]);
      const getAllTags = () => {
        loading.value = true;
        request$1.request("https://api.waifu.im/tags").then((res) => {
          tags.value = res;
          nsfwList.value = res.nsfw;
          versatileList.value = res.versatile;
          picList.value = [];
          for (let item of versatileList.value) {
            request$1.request("https://api.waifu.im/search", "get", {
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
      onLoad(() => {
        vue.nextTick(() => {
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
        uni.previewImage({
          current: index,
          // 当前显示图片索引
          urls: picList2,
          // 需要预览的图片http链接列表
          longPressActions: {
            itemList: ["保存图片"],
            success: function(data) {
              formatAppLog("log", "at pages/home/index.vue:104", data);
              if (data.tapIndex === 0) {
                savePic(item);
              }
            },
            fail: function(err) {
              formatAppLog("log", "at pages/home/index.vue:110", err.errMsg);
            }
          }
        });
      };
      const savePic = (src) => {
        uni.downloadFile({
          url: src,
          success(res) {
            uni.saveImageToPhotosAlbum({
              filePath: res.tempFilePath,
              success() {
                uni.showToast({
                  title: "保存成功",
                  icon: "succeed"
                });
              },
              fail(err) {
                uni.showToast({
                  title: "保存失败",
                  icon: "error"
                });
              }
            });
          }
        });
      };
      const searchClick = (val) => {
        formatAppLog("log", "at pages/home/index.vue:141", keyword.value);
        if (keyword.value == "老恐龙是帅哥") {
          picList.value = [];
          for (let item of nsfwList.value) {
            request$1.request("https://api.waifu.im/search", "get", {
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
            request$1.request("https://api.waifu.im/search", "get", {
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
      let list = vue.ref([
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
      let current = vue.ref(0);
      return (_ctx, _cache) => {
        const _component_u_search = resolveEasycom(vue.resolveDynamicComponent("u-search"), __easycom_0$2);
        const _component_u_image = resolveEasycom(vue.resolveDynamicComponent("u-image"), __easycom_1$1);
        const _component_u_card = resolveEasycom(vue.resolveDynamicComponent("u-card"), __easycom_2);
        const _component_u_tabbar = resolveEasycom(vue.resolveDynamicComponent("u-tabbar"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { class: "u-page" }, [
            vue.createCommentVNode(" 搜索框 "),
            vue.createVNode(_component_u_search, {
              margin: "10rpx",
              "show-action": false,
              placeholder: "爆照的老恐龙",
              clearabled: true,
              modelValue: vue.unref(keyword),
              "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(keyword) ? keyword.value = $event : keyword = $event),
              onSearch: searchClick
            }, null, 8, ["modelValue"]),
            vue.createCommentVNode(" 轮播图 "),
            vue.createVNode(
              swiper1,
              {
                ref_key: "swiper1Ref",
                ref: swiper1Ref
              },
              null,
              512
              /* NEED_PATCH */
            ),
            vue.createElementVNode("view", null, [
              vue.createCommentVNode(" 更多 "),
              (vue.openBlock(true), vue.createElementBlock(
                vue.Fragment,
                null,
                vue.renderList(vue.unref(picList), (item, index) => {
                  return vue.openBlock(), vue.createBlock(_component_u_card, {
                    key: item.tab,
                    title: item.tab,
                    "show-foot": false,
                    "sub-title": "查看更多"
                  }, {
                    body: vue.withCtx(() => [
                      vue.createElementVNode("view", { class: "tap-pic" }, [
                        (vue.openBlock(true), vue.createElementBlock(
                          vue.Fragment,
                          null,
                          vue.renderList(item.list, (pic, index1) => {
                            return vue.openBlock(), vue.createElementBlock("view", { class: "pic-item" }, [
                              vue.createVNode(_component_u_image, {
                                width: "100%",
                                height: "300rpx",
                                src: pic.url,
                                onClick: ($event) => showPic(pic.url, index1, item.list)
                              }, null, 8, ["src", "onClick"])
                            ]);
                          }),
                          256
                          /* UNKEYED_FRAGMENT */
                        ))
                      ])
                    ]),
                    _: 2
                    /* DYNAMIC */
                  }, 1032, ["title"]);
                }),
                128
                /* KEYED_FRAGMENT */
              ))
            ]),
            vue.createCommentVNode(' <u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton> '),
            vue.createCommentVNode(" APP中底部与自定义导航栏断开 "),
            vue.createElementVNode("view", { style: { "height": "100rpx" } })
          ]),
          vue.createVNode(_component_u_tabbar, {
            modelValue: vue.unref(current),
            "onUpdate:modelValue": _cache[1] || (_cache[1] = ($event) => vue.isRef(current) ? current.value = $event : current = $event),
            list: vue.unref(list)
          }, null, 8, ["modelValue", "list"])
        ]);
      };
    }
  };
  const PagesHomeIndex = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/home/index.vue"]]);
  const _sfc_main$2 = {
    __name: "index",
    setup(__props) {
      let list = vue.ref([
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
      let current = vue.ref(0);
      return (_ctx, _cache) => {
        const _component_u_tabbar = resolveEasycom(vue.resolveDynamicComponent("u-tabbar"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { class: "u-page text-area" }, [
            vue.createTextVNode(" 分类 "),
            vue.createCommentVNode(" APP中底部与自定义导航栏断开 "),
            vue.createElementVNode("view", { style: { "height": "100rpx" } })
          ]),
          vue.createVNode(_component_u_tabbar, {
            modelValue: vue.unref(current),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(current) ? current.value = $event : current = $event),
            list: vue.unref(list)
          }, null, 8, ["modelValue", "list"])
        ]);
      };
    }
  };
  const PagesSortIndex = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/sort/index.vue"]]);
  const _sfc_main$1 = {
    __name: "index",
    setup(__props) {
      let list = vue.ref([
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
      let current = vue.ref(0);
      return (_ctx, _cache) => {
        const _component_u_tabbar = resolveEasycom(vue.resolveDynamicComponent("u-tabbar"), __easycom_0$1);
        return vue.openBlock(), vue.createElementBlock("view", null, [
          vue.createElementVNode("view", { class: "u-page text-area" }, [
            vue.createTextVNode(" 我的 "),
            vue.createCommentVNode(" APP中底部与自定义导航栏断开 "),
            vue.createElementVNode("view", { style: { "height": "100rpx" } })
          ]),
          vue.createVNode(_component_u_tabbar, {
            modelValue: vue.unref(current),
            "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => vue.isRef(current) ? current.value = $event : current = $event),
            list: vue.unref(list)
          }, null, 8, ["modelValue", "list"])
        ]);
      };
    }
  };
  const PagesMyIndex = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/pages/my/index.vue"]]);
  __definePage("pages/home/index", PagesHomeIndex);
  __definePage("pages/sort/index", PagesSortIndex);
  __definePage("pages/my/index", PagesMyIndex);
  const _sfc_main = {};
  function _sfc_render(_ctx, _cache) {
    return null;
  }
  const App = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/App.vue"]]);
  const mixin = {
    data() {
      return {};
    },
    onLoad() {
      this.$u.getRect = this.$uGetRect;
    },
    methods: {
      // 查询节点信息
      // 目前此方法在支付宝小程序中无法获取组件跟接点的尺寸，为支付宝的bug(2020-07-21)
      // 解决办法为在组件根部再套一个没有任何作用的view元素
      $uGetRect(selector, all) {
        return new Promise((resolve) => {
          uni.createSelectorQuery().in(this)[all ? "selectAll" : "select"](selector).boundingClientRect((rect) => {
            if (all && Array.isArray(rect) && rect.length) {
              resolve(rect);
            }
            if (!all && rect) {
              resolve(rect);
            }
          }).exec();
        });
      },
      getParentData(parentName = "") {
        if (!this.parent)
          this.parent = false;
        this.parent = this.$u.$parent.call(this, parentName);
        if (this.parent) {
          Object.keys(this.parentData).map((key) => {
            this.parentData[key] = this.parent[key];
          });
          this.parentData.value = this.parent.modelValue;
        }
      },
      // 阻止事件冒泡
      preventEvent(e) {
        e && e.stopPropagation && e.stopPropagation();
      }
    },
    onReachBottom() {
      uni.$emit("uOnReachBottom");
    },
    beforeUnmount() {
      if (this.parent && uni.$u.test.array(this.parent.children)) {
        const childrenList = this.parent.children;
        childrenList.map((child, index) => {
          if (child === this) {
            childrenList.splice(index, 1);
          }
        });
      }
    }
  };
  function isArray(arr) {
    return Object.prototype.toString.call(arr) === "[object Array]";
  }
  function deepClone(obj) {
    if ([null, void 0, NaN, false].includes(obj))
      return obj;
    if (typeof obj !== "object" && typeof obj !== "function") {
      return obj;
    }
    var o = isArray(obj) ? [] : {};
    for (let i in obj) {
      if (obj.hasOwnProperty(i)) {
        o[i] = typeof obj[i] === "object" ? deepClone(obj[i]) : obj[i];
      }
    }
    return o;
  }
  function deepMerge(target = {}, source = {}) {
    target = deepClone(target);
    if (typeof target !== "object" || typeof source !== "object")
      return false;
    for (var prop in source) {
      if (!source.hasOwnProperty(prop))
        continue;
      if (prop in target) {
        if (typeof target[prop] !== "object") {
          target[prop] = source[prop];
        } else {
          if (typeof source[prop] !== "object") {
            target[prop] = source[prop];
          } else {
            if (target[prop].concat && source[prop].concat) {
              target[prop] = target[prop].concat(source[prop]);
            } else {
              target[prop] = deepMerge(target[prop], source[prop]);
            }
          }
        }
      } else {
        target[prop] = source[prop];
      }
    }
    return target;
  }
  function email(value) {
    return /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(value);
  }
  function mobile(value) {
    return /^1[23456789]\d{9}$/.test(value);
  }
  function url(value) {
    return /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w-.\/?%&=]*)?/.test(value);
  }
  function date(value) {
    if (!value)
      return false;
    if (number(value))
      value = +value;
    return !/Invalid|NaN/.test(new Date(value).toString());
  }
  function dateISO(value) {
    return /^\d{4}[\/\-](0?[1-9]|1[012])[\/\-](0?[1-9]|[12][0-9]|3[01])$/.test(value);
  }
  function number(value) {
    return /^(?:-?\d+|-?\d{1,3}(?:,\d{3})+)?(?:\.\d+)?$/.test(value);
  }
  function digits(value) {
    return /^\d+$/.test(value);
  }
  function idCard(value) {
    return /^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(
      value
    );
  }
  function carNo(value) {
    const xreg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}(([0-9]{5}[DF]$)|([DF][A-HJ-NP-Z0-9][0-9]{4}$))/;
    const creg = /^[京津沪渝冀豫云辽黑湘皖鲁新苏浙赣鄂桂甘晋蒙陕吉闽贵粤青藏川宁琼使领A-Z]{1}[A-Z]{1}[A-HJ-NP-Z0-9]{4}[A-HJ-NP-Z0-9挂学警港澳]{1}$/;
    if (value.length === 7) {
      return creg.test(value);
    } else if (value.length === 8) {
      return xreg.test(value);
    } else {
      return false;
    }
  }
  function amount(value) {
    return /^[1-9]\d*(,\d{3})*(\.\d{1,2})?$|^0\.\d{1,2}$/.test(value);
  }
  function chinese(value) {
    let reg = /^[\u4e00-\u9fa5]+$/gi;
    return reg.test(value);
  }
  function letter(value) {
    return /^[a-zA-Z]*$/.test(value);
  }
  function enOrNum(value) {
    let reg = /^[0-9a-zA-Z]*$/g;
    return reg.test(value);
  }
  function contains(value, param) {
    return value.indexOf(param) >= 0;
  }
  function range(value, param) {
    return value >= param[0] && value <= param[1];
  }
  function rangeLength(value, param) {
    return value.length >= param[0] && value.length <= param[1];
  }
  function landline(value) {
    let reg = /^\d{3,4}-\d{7,8}(-\d{3,4})?$/;
    return reg.test(value);
  }
  function empty(value) {
    switch (typeof value) {
      case "undefined":
        return true;
      case "string":
        if (value.replace(/(^[ \t\n\r]*)|([ \t\n\r]*$)/g, "").length == 0)
          return true;
        break;
      case "boolean":
        if (!value)
          return true;
        break;
      case "number":
        if (0 === value || isNaN(value))
          return true;
        break;
      case "object":
        if (null === value || value.length === 0)
          return true;
        for (var i in value) {
          return false;
        }
        return true;
    }
    return false;
  }
  function jsonString(value) {
    if (typeof value == "string") {
      try {
        var obj = JSON.parse(value);
        if (typeof obj == "object" && obj) {
          return true;
        } else {
          return false;
        }
      } catch (e) {
        return false;
      }
    }
    return false;
  }
  function array(value) {
    if (typeof Array.isArray === "function") {
      return Array.isArray(value);
    } else {
      return Object.prototype.toString.call(value) === "[object Array]";
    }
  }
  function object(value) {
    return Object.prototype.toString.call(value) === "[object Object]";
  }
  function code(value, len = 6) {
    return new RegExp(`^\\d{${len}}$`).test(value);
  }
  function func(value) {
    return typeof value === "function";
  }
  function promise(value) {
    return object(value) && func(value.then) && func(value.catch);
  }
  function image(value) {
    const newValue = value.split("?")[0];
    return new RegExp(/\.(jpeg|jpg|gif|png|svg|webp|jfif|bmp|dpg)$/).test(newValue);
  }
  function video(value) {
    const newValue = value.split("?")[0];
    return new RegExp(/\.(mp4|mpg|mpeg|dat|asf|avi|rm|rmvb|mov|wmv|flv|mkv|m3u8|3gp)$/).test(newValue);
  }
  function regExp(o) {
    return o && Object.prototype.toString.call(o) === "[object RegExp]";
  }
  function string(value) {
    return typeof value === "string";
  }
  const test = {
    email,
    mobile,
    url,
    date,
    dateISO,
    number,
    digits,
    idCard,
    carNo,
    amount,
    chinese,
    letter,
    enOrNum,
    contains,
    range,
    rangeLength,
    empty,
    isEmpty: empty,
    jsonString,
    landline,
    object,
    array,
    code,
    func,
    promise,
    video,
    image,
    regExp,
    string
  };
  class Request {
    // 设置全局默认配置
    setConfig(customConfig) {
      this.config = deepMerge(this.config, customConfig);
    }
    // 主要请求部分
    request(options = {}) {
      if (this.interceptor.request && typeof this.interceptor.request === "function") {
        let interceptorRequest = this.interceptor.request(options);
        if (interceptorRequest === false) {
          return new Promise(() => {
          });
        }
        this.options = interceptorRequest;
      }
      options.dataType = options.dataType || this.config.dataType;
      options.responseType = options.responseType || this.config.responseType;
      options.url = options.url || "";
      options.params = options.params || {};
      options.header = Object.assign({}, this.config.header, options.header);
      options.method = options.method || this.config.method;
      return new Promise((resolve, reject) => {
        options.complete = (response) => {
          uni.hideLoading();
          clearTimeout(this.config.timer);
          this.config.timer = null;
          if (this.config.originalData) {
            if (this.interceptor.response && typeof this.interceptor.response === "function") {
              let resInterceptors = this.interceptor.response(response);
              if (resInterceptors !== false) {
                resolve(resInterceptors);
              } else {
                reject(response);
              }
            } else {
              resolve(response);
            }
          } else {
            if (response.statusCode == 200) {
              if (this.interceptor.response && typeof this.interceptor.response === "function") {
                let resInterceptors = this.interceptor.response(response.data);
                if (resInterceptors !== false) {
                  resolve(resInterceptors);
                } else {
                  reject(response.data);
                }
              } else {
                resolve(response.data);
              }
            } else {
              reject(response);
            }
          }
        };
        options.url = test.url(options.url) ? options.url : this.config.baseUrl + (options.url.indexOf("/") == 0 ? options.url : "/" + options.url);
        if (this.config.showLoading && !this.config.timer) {
          this.config.timer = setTimeout(() => {
            uni.showLoading({
              title: this.config.loadingText,
              mask: this.config.loadingMask
            });
            this.config.timer = null;
          }, this.config.loadingTime);
        }
        uni.request(options);
      });
    }
    constructor() {
      this.config = {
        baseUrl: "",
        // 请求的根域名
        // 默认的请求头
        header: {},
        method: "POST",
        // 设置为json，返回后uni.request会对数据进行一次JSON.parse
        dataType: "json",
        // 此参数无需处理，因为5+和支付宝小程序不支持，默认为text即可
        responseType: "text",
        showLoading: true,
        // 是否显示请求中的loading
        loadingText: "请求中...",
        loadingTime: 800,
        // 在此时间内，请求还没回来的话，就显示加载中动画，单位ms
        timer: null,
        // 定时器
        originalData: false,
        // 是否在拦截器中返回服务端的原始数据，见文档说明
        loadingMask: true
        // 展示loading的时候，是否给一个透明的蒙层，防止触摸穿透
      };
      this.interceptor = {
        // 请求前的拦截
        request: null,
        // 请求后的拦截
        response: null
      };
      this.get = (url2, data = {}, header = {}) => {
        return this.request({
          method: "GET",
          url: url2,
          header,
          data
        });
      };
      this.post = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "POST",
          header,
          data
        });
      };
      this.put = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "PUT",
          header,
          data
        });
      };
      this.delete = (url2, data = {}, header = {}) => {
        return this.request({
          url: url2,
          method: "DELETE",
          header,
          data
        });
      };
    }
  }
  const http = new Request();
  function queryParams(data = {}, isPrefix = true, arrayFormat = "brackets") {
    let prefix = isPrefix ? "?" : "";
    let _result = [];
    if (["indices", "brackets", "repeat", "comma"].indexOf(arrayFormat) == -1)
      arrayFormat = "brackets";
    for (let key in data) {
      let value = data[key];
      if (["", void 0, null].indexOf(value) >= 0) {
        continue;
      }
      if (value.constructor === Array) {
        switch (arrayFormat) {
          case "indices":
            for (let i = 0; i < value.length; i++) {
              _result.push(key + "[" + i + "]=" + value[i]);
            }
            break;
          case "brackets":
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
            break;
          case "repeat":
            value.forEach((_value) => {
              _result.push(key + "=" + _value);
            });
            break;
          case "comma":
            let commaStr = "";
            value.forEach((_value) => {
              commaStr += (commaStr ? "," : "") + _value;
            });
            _result.push(key + "=" + commaStr);
            break;
          default:
            value.forEach((_value) => {
              _result.push(key + "[]=" + _value);
            });
        }
      } else {
        _result.push(key + "=" + value);
      }
    }
    return _result.length ? prefix + _result.join("&") : "";
  }
  class Router {
    constructor() {
      this.config = {
        type: "navigateTo",
        url: "",
        delta: 1,
        // navigateBack页面后退时,回退的层数
        params: {},
        // 传递的参数
        animationType: "pop-in",
        // 窗口动画,只在APP有效
        animationDuration: 300,
        // 窗口动画持续时间,单位毫秒,只在APP有效
        intercept: false
        // 是否需要拦截
      };
      this.route = this.route.bind(this);
    }
    // 判断url前面是否有"/"，如果没有则加上，否则无法跳转
    addRootPath(url2) {
      return url2[0] === "/" ? url2 : `/${url2}`;
    }
    // 整合路由参数
    mixinParam(url2, params) {
      url2 = url2 && this.addRootPath(url2);
      let query = "";
      if (/.*\/.*\?.*=.*/.test(url2)) {
        query = uni.$u.queryParams(params, false);
        return url2 += "&" + query;
      } else {
        query = uni.$u.queryParams(params);
        return url2 += query;
      }
    }
    // 对外的方法名称
    async route(options = {}, params = {}) {
      let mergeConfig = {};
      if (typeof options === "string") {
        mergeConfig.url = this.mixinParam(options, params);
        mergeConfig.type = "navigateTo";
      } else {
        mergeConfig = uni.$u.deepClone(options, this.config);
        mergeConfig.url = this.mixinParam(options.url, options.params);
      }
      if (params.intercept) {
        this.config.intercept = params.intercept;
      }
      mergeConfig.params = params;
      mergeConfig = uni.$u.deepMerge(this.config, mergeConfig);
      if (typeof uni.$u.routeIntercept === "function") {
        const isNext = await new Promise((resolve, reject) => {
          uni.$u.routeIntercept(mergeConfig, resolve);
        });
        isNext && this.openPage(mergeConfig);
      } else {
        this.openPage(mergeConfig);
      }
    }
    // 执行路由跳转
    openPage(config2) {
      const {
        url: url2,
        type,
        delta,
        animationType,
        animationDuration
      } = config2;
      if (config2.type == "navigateTo" || config2.type == "to") {
        uni.navigateTo({
          url: url2,
          animationType,
          animationDuration
        });
      }
      if (config2.type == "redirectTo" || config2.type == "redirect") {
        uni.redirectTo({
          url: url2
        });
      }
      if (config2.type == "switchTab" || config2.type == "tab") {
        uni.switchTab({
          url: url2
        });
      }
      if (config2.type == "reLaunch" || config2.type == "launch") {
        uni.reLaunch({
          url: url2
        });
      }
      if (config2.type == "navigateBack" || config2.type == "back") {
        uni.navigateBack({
          delta
        });
      }
    }
  }
  const route = new Router().route;
  if (!String.prototype.padStart) {
    String.prototype.padStart = function(maxLength, fillString = " ") {
      if (Object.prototype.toString.call(fillString) !== "[object String]")
        throw new TypeError(
          "fillString must be String"
        );
      let str = this;
      if (str.length >= maxLength)
        return String(str);
      let fillLength = maxLength - str.length, times = Math.ceil(fillLength / fillString.length);
      while (times >>= 1) {
        fillString += fillString;
        if (times === 1) {
          fillString += fillString;
        }
      }
      return fillString.slice(0, fillLength) + str;
    };
  }
  function timeFormat(dateTime = null, fmt = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let date2 = new Date(dateTime);
    let ret;
    let opt = {
      "y+": date2.getFullYear().toString(),
      // 年
      "m+": (date2.getMonth() + 1).toString(),
      // 月
      "d+": date2.getDate().toString(),
      // 日
      "h+": date2.getHours().toString(),
      // 时
      "M+": date2.getMinutes().toString(),
      // 分
      "s+": date2.getSeconds().toString()
      // 秒
      // 有其他格式化字符需求可以继续添加，必须转化成字符串
    };
    for (let k in opt) {
      ret = new RegExp("(" + k + ")").exec(fmt);
      if (ret) {
        fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, "0"));
      }
    }
    return fmt;
  }
  function timeFrom(dateTime = null, format = "yyyy-mm-dd") {
    if (!dateTime)
      dateTime = Number(/* @__PURE__ */ new Date());
    if (dateTime.toString().length == 10)
      dateTime *= 1e3;
    let timestamp = +new Date(Number(dateTime));
    let timer = (Number(/* @__PURE__ */ new Date()) - timestamp) / 1e3;
    let tips = "";
    switch (true) {
      case timer < 300:
        tips = "刚刚";
        break;
      case (timer >= 300 && timer < 3600):
        tips = parseInt(timer / 60) + "分钟前";
        break;
      case (timer >= 3600 && timer < 86400):
        tips = parseInt(timer / 3600) + "小时前";
        break;
      case (timer >= 86400 && timer < 2592e3):
        tips = parseInt(timer / 86400) + "天前";
        break;
      default:
        if (format === false) {
          if (timer >= 2592e3 && timer < 365 * 86400) {
            tips = parseInt(timer / (86400 * 30)) + "个月前";
          } else {
            tips = parseInt(timer / (86400 * 365)) + "年前";
          }
        } else {
          tips = timeFormat(timestamp, format);
        }
    }
    return tips;
  }
  function colorGradient(startColor = "rgb(0, 0, 0)", endColor = "rgb(255, 255, 255)", step = 10) {
    let startRGB = hexToRgb(startColor, false);
    let startR = startRGB[0];
    let startG = startRGB[1];
    let startB = startRGB[2];
    let endRGB = hexToRgb(endColor, false);
    let endR = endRGB[0];
    let endG = endRGB[1];
    let endB = endRGB[2];
    let sR = (endR - startR) / step;
    let sG = (endG - startG) / step;
    let sB = (endB - startB) / step;
    let colorArr = [];
    for (let i = 0; i < step; i++) {
      let hex = rgbToHex("rgb(" + Math.round(sR * i + startR) + "," + Math.round(sG * i + startG) + "," + Math.round(sB * i + startB) + ")");
      colorArr.push(hex);
    }
    return colorArr;
  }
  function hexToRgb(sColor, str = true) {
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    sColor = sColor.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        let sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      let sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      if (!str) {
        return sColorChange;
      } else {
        return `rgb(${sColorChange[0]},${sColorChange[1]},${sColorChange[2]})`;
      }
    } else if (/^(rgb|RGB)/.test(sColor)) {
      let arr = sColor.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      return arr.map((val) => Number(val));
    } else {
      return sColor;
    }
  }
  function rgbToHex(rgb) {
    let _this = rgb;
    let reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    if (/^(rgb|RGB)/.test(_this)) {
      let aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
      let strHex = "#";
      for (let i = 0; i < aColor.length; i++) {
        let hex = Number(aColor[i]).toString(16);
        hex = String(hex).length == 1 ? "0" + hex : hex;
        if (hex === "0") {
          hex += hex;
        }
        strHex += hex;
      }
      if (strHex.length !== 7) {
        strHex = _this;
      }
      return strHex;
    } else if (reg.test(_this)) {
      let aNum = _this.replace(/#/, "").split("");
      if (aNum.length === 6) {
        return _this;
      } else if (aNum.length === 3) {
        let numHex = "#";
        for (let i = 0; i < aNum.length; i += 1) {
          numHex += aNum[i] + aNum[i];
        }
        return numHex;
      }
    } else {
      return _this;
    }
  }
  function colorToRgba(color2, alpha = 0.3) {
    color2 = rgbToHex(color2);
    var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
    let sColor = color2.toLowerCase();
    if (sColor && reg.test(sColor)) {
      if (sColor.length === 4) {
        var sColorNew = "#";
        for (let i = 1; i < 4; i += 1) {
          sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
        }
        sColor = sColorNew;
      }
      var sColorChange = [];
      for (let i = 1; i < 7; i += 2) {
        sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
      }
      return "rgba(" + sColorChange.join(",") + "," + alpha + ")";
    } else {
      return sColor;
    }
  }
  const colorGradient$1 = {
    colorGradient,
    hexToRgb,
    rgbToHex,
    colorToRgba
  };
  function guid(len = 32, firstU = true, radix = null) {
    let chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
    let uuid = [];
    radix = radix || chars.length;
    if (len) {
      for (let i = 0; i < len; i++)
        uuid[i] = chars[0 | Math.random() * radix];
    } else {
      let r;
      uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
      uuid[14] = "4";
      for (let i = 0; i < 36; i++) {
        if (!uuid[i]) {
          r = 0 | Math.random() * 16;
          uuid[i] = chars[i == 19 ? r & 3 | 8 : r];
        }
      }
    }
    if (firstU) {
      uuid.shift();
      return "u" + uuid.join("");
    } else {
      return uuid.join("");
    }
  }
  let color = {
    primary: "#2979ff",
    primaryDark: "#2b85e4",
    primaryDisabled: "#a0cfff",
    primaryLight: "#ecf5ff",
    bgColor: "#f3f4f6",
    info: "#909399",
    infoDark: "#82848a",
    infoDisabled: "#c8c9cc",
    infoLight: "#f4f4f5",
    warning: "#ff9900",
    warningDark: "#f29100",
    warningDisabled: "#fcbd71",
    warningLight: "#fdf6ec",
    error: "#fa3534",
    errorDark: "#dd6161",
    errorDisabled: "#fab6b6",
    errorLight: "#fef0f0",
    success: "#19be6b",
    successDark: "#18b566",
    successDisabled: "#71d5a1",
    successLight: "#dbf1e1",
    mainColor: "#303133",
    contentColor: "#606266",
    tipsColor: "#909399",
    lightColor: "#c0c4cc",
    borderColor: "#e4e7ed"
  };
  function type2icon(type = "success", fill = false) {
    if (["primary", "info", "error", "warning", "success"].indexOf(type) == -1)
      type = "success";
    let iconName = "";
    switch (type) {
      case "primary":
        iconName = "info-circle";
        break;
      case "info":
        iconName = "info-circle";
        break;
      case "error":
        iconName = "close-circle";
        break;
      case "warning":
        iconName = "error-circle";
        break;
      case "success":
        iconName = "checkmark-circle";
        break;
      default:
        iconName = "checkmark-circle";
    }
    if (fill)
      iconName += "-fill";
    return iconName;
  }
  function randomArray(array2 = []) {
    return array2.sort(() => Math.random() - 0.5);
  }
  const addUnit = function(value = "auto", unit = "rpx") {
    value = String(value);
    return test.number(value) ? `${value}${unit}` : value;
  };
  function random(min, max) {
    if (min >= 0 && max > 0 && max >= min) {
      let gab = max - min + 1;
      return Math.floor(Math.random() * gab + min);
    } else {
      return 0;
    }
  }
  function trim$1(str, pos = "both") {
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    } else if (pos == "left") {
      return str.replace(/^\s*/, "");
    } else if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    } else if (pos == "all") {
      return str.replace(/\s+/g, "");
    } else {
      return str;
    }
  }
  function toast(title, duration = 1500) {
    uni.showToast({
      title,
      icon: "none",
      duration
    });
  }
  function getParent(name, keys) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        let data = {};
        if (Array.isArray(keys)) {
          keys.map((val) => {
            data[val] = parent[val] ? parent[val] : "";
          });
        } else {
          for (let i in keys) {
            if (Array.isArray(keys[i])) {
              if (keys[i].length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else if (keys[i].constructor === Object) {
              if (Object.keys(keys[i]).length) {
                data[i] = keys[i];
              } else {
                data[i] = parent[i];
              }
            } else {
              data[i] = keys[i] || keys[i] === false ? keys[i] : parent[i];
            }
          }
        }
        return data;
      }
    }
    return {};
  }
  function $parent(name = void 0) {
    let parent = this.$parent;
    while (parent) {
      if (parent.$options && parent.$options.name !== name) {
        parent = parent.$parent;
      } else {
        return parent;
      }
    }
    return false;
  }
  function os() {
    return uni.getSystemInfoSync().platform;
  }
  function sys() {
    return uni.getSystemInfoSync();
  }
  let timeout = null;
  function debounce(func2, wait = 500, immediate = false) {
    if (timeout !== null)
      clearTimeout(timeout);
    if (immediate) {
      var callNow = !timeout;
      timeout = setTimeout(function() {
        timeout = null;
      }, wait);
      if (callNow)
        typeof func2 === "function" && func2();
    } else {
      timeout = setTimeout(function() {
        typeof func2 === "function" && func2();
      }, wait);
    }
  }
  let timeoutArr = [];
  let flagArr = [];
  function throttle(fn, time = 500, isImmediate = true, timeoutName = "default") {
    if (!timeoutArr[timeoutName])
      timeoutArr[timeoutName] = null;
    if (isImmediate) {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        if (typeof fn === "function")
          fn();
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
        }, time);
      }
    } else {
      if (!flagArr[timeoutName]) {
        flagArr[timeoutName] = true;
        timeoutArr[timeoutName] = setTimeout(() => {
          flagArr[timeoutName] = false;
          if (typeof fn === "function")
            fn();
        }, time);
      }
    }
  }
  function trim(str, pos = "both") {
    str = String(str);
    if (pos == "both") {
      return str.replace(/^\s+|\s+$/g, "");
    }
    if (pos == "left") {
      return str.replace(/^\s*/, "");
    }
    if (pos == "right") {
      return str.replace(/(\s*$)/g, "");
    }
    if (pos == "all") {
      return str.replace(/\s+/g, "");
    }
    return str;
  }
  function addStyle(customStyle, target = "object") {
    if (test.empty(customStyle) || typeof customStyle === "object" && target === "object" || target === "string" && typeof customStyle === "string") {
      return customStyle;
    }
    if (target === "object") {
      customStyle = trim(customStyle);
      const styleArray = customStyle.split(";");
      const style = {};
      for (let i = 0; i < styleArray.length; i++) {
        if (styleArray[i]) {
          const item = styleArray[i].split(":");
          style[trim(item[0])] = trim(item[1]);
        }
      }
      return style;
    }
    let string2 = "";
    for (const i in customStyle) {
      const key = i.replace(/([A-Z])/g, "-$1").toLowerCase();
      string2 += `${key}:${customStyle[i]};`;
    }
    return trim(string2);
  }
  let version = "1.10.1";
  const config = {
    v: version,
    version,
    // 主题名称
    type: [
      "primary",
      "success",
      "info",
      "error",
      "warning"
    ]
  };
  const zIndex = {
    toast: 10090,
    noNetwork: 10080,
    // popup包含popup，actionsheet，keyboard，picker的值
    popup: 10075,
    mask: 10070,
    navbar: 980,
    topTips: 975,
    sticky: 970,
    indexListSticky: 965
  };
  function wranning(str) {
    {
      formatAppLog("warn", "at uni_modules/vk-uview-ui/index.js:26", str);
    }
  }
  const $u = {
    queryParams,
    route,
    timeFormat,
    date: timeFormat,
    // 另名date
    timeFrom,
    colorGradient: colorGradient$1.colorGradient,
    colorToRgba: colorGradient$1.colorToRgba,
    guid,
    color,
    sys,
    os,
    type2icon,
    randomArray,
    wranning,
    get: http.get,
    post: http.post,
    put: http.put,
    "delete": http.delete,
    hexToRgb: colorGradient$1.hexToRgb,
    rgbToHex: colorGradient$1.rgbToHex,
    test,
    random,
    deepClone,
    deepMerge,
    getParent,
    $parent,
    addUnit,
    trim: trim$1,
    type: ["primary", "success", "error", "warning", "info"],
    http,
    toast,
    config,
    // uView配置信息相关，比如版本号
    zIndex,
    debounce,
    throttle,
    addStyle
  };
  uni.$u = $u;
  const install = (Vue2) => {
    Vue2.mixin(mixin);
    Vue2.config.globalProperties.$u = $u;
  };
  const uView = {
    install
  };
  function createApp() {
    const app = vue.createVueApp(App);
    app.use(uView);
    return {
      app
    };
  }
  const { app: __app__, Vuex: __Vuex__, Pinia: __Pinia__ } = createApp();
  uni.Vuex = __Vuex__;
  uni.Pinia = __Pinia__;
  __app__.provide("__globalStyles", __uniConfig.styles);
  __app__._component.mpType = "app";
  __app__._component.render = () => {
  };
  __app__.mount("#app");
})(Vue, uni.VueShared);
