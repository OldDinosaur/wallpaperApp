
// request.js
const request = (url, method = 'GET', data = {}, header = {}) => {
    return new Promise((resolve, reject) => {
        header["Authorization"] = uni.getStorageSync("token");
        uni.request({
            url:  url,
            method: method,
            data: data,
            header: header,
            success: (res) => {
                if (res.data.code == 401) {
                    uni.reLaunch({
                        url: "/pages/login/login"
                    })
                }
                resolve(res.data)
            },
            fail: (err) => {
                let result = { code: 500, msg: "获取数据失败" };
                reject(result)
            }
        })
    })
}

const uploadFile = (filePath) => {
	return new Promise((resolve, reject) => {
        let header={};  
		header["Authorization"] = uni.getStorageSync("token");

		uni.uploadFile({
			url: fileUrl, //仅为示例，非真实的接口地址
			filePath: filePath,
			name: 'file',
			formData: {
				'user': 'test'
			},
			header: header,
			success: (res) => {
				resolve(JSON.parse(res.data))
			},
			fail: (err) => {
				let result = {
					code: 500,
					msg: "获取数据失败"
				};
				reject(result)
			}
		});


	})
}

// request.js

const form = (url, param) => {
    return request(url, "post", param, { 'Content-Type': 'application/x-www-form-urlencoded' })
}

const post = (url, param) => {
    return request(url, "post", param, { 'Content-Type': 'application/json' })
}

// request.js

const loadPostData = (url, param, ref) => {
    let res = post(url, param);
    res.then((res) => {
        if (res.code !== 200) {
            return;
        }
        ref.value = res.data || [];
    }).catch((err) => {
        console.log(err);
    })
}

const loadFormData = (url, param, ref) => {
    let res = form(url, param);
    res.then((res) => {
        if (res.code !== 200) {
            return;
        }
        ref.value = res.data || [];
    }).catch((err) => {
        console.log(err);
    })
}

// request.js

const loadPostCallback = (url, param, callback) => {
    let res = post(url, param);
    res.then((res) => {
        if (res.code !== 200) {
            return;
        }
        if (callback) {
            callback(res);
        }
    }).catch((err) => {
        console.log(err);
    })
}

// request.js

export default { uploadFile,request, form, post, loadPostData, loadFormData, loadPostCallback };



