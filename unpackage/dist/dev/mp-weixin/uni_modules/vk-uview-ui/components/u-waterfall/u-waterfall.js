"use strict";
const common_vendor = require("../../../../common/vendor.js");
const _sfc_main = {
  name: "u-waterfall",
  emits: ["update:modelValue", "input"],
  props: {
    value: {
      // 瀑布流数据
      type: Array,
      default: function() {
        return [];
      }
    },
    modelValue: {
      // 瀑布流数据
      type: Array,
      default: function() {
        return [];
      }
    },
    // 每次向结构插入数据的时间间隔，间隔越长，越能保证两列高度相近，但是对用户体验越不好
    // 单位ms
    addTime: {
      type: [Number, String],
      default: 200
    },
    // id值，用于清除某一条数据时，根据此idKey名称找到并移除，如数据为{idx: 22, name: 'lisa'}
    // 那么该把idKey设置为idx
    idKey: {
      type: String,
      default: "id"
    }
  },
  data() {
    return {
      leftList: [],
      rightList: [],
      tempList: [],
      children: []
    };
  },
  watch: {
    copyFlowList(nVal, oVal) {
      let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
      this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
      this.splitData();
    }
  },
  mounted() {
    this.tempList = this.cloneData(this.copyFlowList);
    this.splitData();
  },
  computed: {
    valueCom() {
      return this.modelValue;
    },
    // 破坏flowList变量的引用，否则watch的结果新旧值是一样的
    copyFlowList() {
      return this.cloneData(this.valueCom);
    }
  },
  methods: {
    async splitData() {
      if (!this.tempList.length)
        return;
      let leftRect = await this.$uGetRect("#u-left-column");
      let rightRect = await this.$uGetRect("#u-right-column");
      let item = this.tempList[0];
      if (!item)
        return;
      if (leftRect.height < rightRect.height) {
        this.leftList.push(item);
      } else if (leftRect.height > rightRect.height) {
        this.rightList.push(item);
      } else {
        if (this.leftList.length <= this.rightList.length) {
          this.leftList.push(item);
        } else {
          this.rightList.push(item);
        }
      }
      this.tempList.splice(0, 1);
      if (this.tempList.length) {
        setTimeout(() => {
          this.splitData();
        }, this.addTime);
      }
    },
    // 复制而不是引用对象和数组
    cloneData(data) {
      return JSON.parse(JSON.stringify(data));
    },
    // 清空数据列表
    clear() {
      this.leftList = [];
      this.rightList = [];
      this.$emit("input", []);
      this.$emit("update:modelValue", []);
      this.tempList = [];
    },
    // 清除某一条指定的数据，根据id实现
    remove(id) {
      let index = -1;
      index = this.leftList.findIndex((val) => val[this.idKey] == id);
      if (index != -1) {
        this.leftList.splice(index, 1);
      } else {
        index = this.rightList.findIndex((val) => val[this.idKey] == id);
        if (index != -1)
          this.rightList.splice(index, 1);
      }
      index = this.value.findIndex((val) => val[this.idKey] == id);
      if (index != -1) {
        this.$emit("input", this.valueCom.splice(index, 1));
        this.$emit("update:modelValue", this.valueCom.splice(index, 1));
      }
    },
    // 修改某条数据的某个属性
    modify(id, key, value) {
      let index = -1;
      index = this.leftList.findIndex((val) => val[this.idKey] == id);
      if (index != -1) {
        this.leftList[index][key] = value;
      } else {
        index = this.rightList.findIndex((val) => val[this.idKey] == id);
        if (index != -1)
          this.rightList[index][key] = value;
      }
      index = this.valueCom.findIndex((val) => val[this.idKey] == id);
      if (index != -1) {
        let data = this.cloneData(this.valueCom);
        data[index][key] = value;
        this.$emit("input", data);
        this.$emit("update:modelValue", data);
      }
    }
  }
};
function _sfc_render(_ctx, _cache, $props, $setup, $data, $options) {
  return {
    a: common_vendor.r("left", {
      leftList: $data.leftList
    }),
    b: common_vendor.r("right", {
      rightList: $data.rightList
    })
  };
}
const Component = /* @__PURE__ */ common_vendor._export_sfc(_sfc_main, [["render", _sfc_render], ["__scopeId", "data-v-059d5f61"], ["__file", "C:/Users/蜗牛/Documents/HBuilderProjects/wallP/uni_modules/vk-uview-ui/components/u-waterfall/u-waterfall.vue"]]);
wx.createComponent(Component);
