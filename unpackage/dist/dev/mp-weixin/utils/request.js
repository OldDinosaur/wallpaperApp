"use strict";
const common_vendor = require("../common/vendor.js");
const request = (url, method = "GET", data = {}, header = {}) => {
  return new Promise((resolve, reject) => {
    header["Authorization"] = common_vendor.index.getStorageSync("token");
    common_vendor.index.request({
      url,
      method,
      data,
      header,
      success: (res) => {
        if (res.data.code == 401) {
          common_vendor.index.reLaunch({
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
    header["Authorization"] = common_vendor.index.getStorageSync("token");
    common_vendor.index.uploadFile({
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
const form = (url, param) => {
  return request(url, "post", param, { "Content-Type": "application/x-www-form-urlencoded" });
};
const post = (url, param) => {
  return request(url, "post", param, { "Content-Type": "application/json" });
};
const loadPostData = (url, param, ref) => {
  let res = post(url, param);
  res.then((res2) => {
    if (res2.code !== 200) {
      return;
    }
    ref.value = res2.data || [];
  }).catch((err) => {
    console.log(err);
  });
};
const loadFormData = (url, param, ref) => {
  let res = form(url, param);
  res.then((res2) => {
    if (res2.code !== 200) {
      return;
    }
    ref.value = res2.data || [];
  }).catch((err) => {
    console.log(err);
  });
};
const loadPostCallback = (url, param, callback) => {
  let res = post(url, param);
  res.then((res2) => {
    if (res2.code !== 200) {
      return;
    }
    if (callback) {
      callback(res2);
    }
  }).catch((err) => {
    console.log(err);
  });
};
const request$1 = { uploadFile, request, form, post, loadPostData, loadFormData, loadPostCallback };
exports.request = request$1;
