import Mock from 'mockjs';
Mock.mock("/test/test", "get", {
	// 属性 list 的值是一个数组，随机生成 1 到 10 个元素
	"list|1-10": [{
		// 随机生成1-100之间的任意整数
		"id|1-100": 1,
	}, ],
	code: 200,
	message: 'ok',
})

Mock.mock("/data/list", "get", {
	// 属性 list 的值是一个数组，随机生成 1 到 10 个元素
	"list|1-10": [{
		// 随机生成1-10个★
		"string|1-10": "★",
		// 随机生成1-100之间的任意整数
		"number|1-100": 1,
	}, ],
	code: 200,
	message: 'ok',
})

