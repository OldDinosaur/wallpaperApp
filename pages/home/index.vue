<template>
	<view class="home">
		<u-section title="技术" :right="false"></u-section>
		<text class="t-icon-shipin"></text>
		<u-grid :col="3">
			<u-grid-item v-for="item in interviewList" :key="item.id" @click="orderTo(item)">
				<text class="t-icon" :class="item.icon"></text>
				<!-- <view class="grid-text">{{item.title}}</view> -->
			</u-grid-item>
		</u-grid>
		<u-section title="实例" :right="false"></u-section>
		<u-grid :col="3">
			<u-grid-item v-for="item in exampleList" :key="item.id" @click="orderTo(item)">
				<text class="t-icon" :class="item.icon"></text>
				<!-- <view class="grid-text">{{item.title}}</view> -->
			</u-grid-item>
		</u-grid>
		<u-section title="其他" :right="false"></u-section>
		<u-grid :col="3">
			<u-grid-item v-for="item in orderList" :key="item.id" @click="orderTo(item)">
				<text class="t-icon" :class="item.icon"></text>
				<!-- <view class="grid-text">{{item.title}}</view> -->
			</u-grid-item>
		</u-grid>
		<u-tabbar v-model="current" :list="list"></u-tabbar>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
	} from 'vue'
	// const n1 = async ()=>{
	// 	console.log('saa')
	// 	const s1  = await new Promise((resolve,reactive)=>resolve('s1'))
	// 	console.log(s1)
	// 	console.log(111)
	// } 	
	// const n2 =  ()=>{
	// 	console.log('sbb')
	// 	 new Promise((resolve,reactive)=>resolve('s2')).then((res)=>{
	// 		 console.log(res)
	// 	 })
	// 	console.log(222)
	// }			  
	// n1()
	// n2()
	/* mock测试，h5中可以，安卓不行 */
	uni.request({
		url: '/test/test', 
		method: 'GET',
	}).then(res => {
		console.log(res.data); // 这里将会输出模拟的数据
	}).catch(err => {
		console.error(err);
	})


	/* 技术 */
	let interviewList = reactive([{
			id: 0,
			title: 'HTML',
			icon: 't-icon-html'
		},
		{
			id: 1,
			title: 'JS',
			icon: 't-icon-js',
			url: '/pages/home/interview/js-int/index'
		},
		{
			id: 2,
			title: 'CSS',
			icon: 't-icon-css'
		},
		{
			id: 3,
			title: 'VUE',
			icon: 't-icon-Vue'
		},
		{
			id: 4,
			title: '算法',
			icon: 't-icon-suanfaku',
			url: '/pages/home/interview/sf-int/index'
		},
		{
			id: 5,
			title: 'nodejs',
			icon: 't-icon-Nodejs'
		},
		{
			id: 6,
			title: '浏览器',
			icon: 't-icon-liulanqi1'
		},
		{
			id: 7,
			title: '其他',
			icon: 't-icon-qitafuwu'
		}
	])
	/* 实例 */
	let exampleList = reactive([{
		id: 0,
		title: '其他',
		icon: 't-icon-qitafuwu',
		url: '/pages/home/example/index'
	}])
	/* 其他 */
	let orderList = reactive([{
			id: 0,
			title: '壁纸',
			icon: 't-icon-tupian1',
			url: '/pages/home/wall/index'
		},
		{
			id: 1,
			title: '视频',
			icon: 't-icon-shipin',
			url: '/pages/home/video/index'
			// url: '/pages/webview/webview?url=' + encodeURIComponent('https://www.agedm.org/')
		},
		{
			id: 2,
			title: '其他',
			icon: 't-icon-qitafuwu'
		}
	])

	const orderTo = (item) => {
		if (item.url) {
			uni.navigateTo({
				url: item.url,
				success: function(res) {
					// 通过eventChannel向被打开页面传送数据
					res.eventChannel.emit('acceptDataFromOpenerPage', {
						tab: item.tab
					})
				}
			})
		}

	}
	//底部tap
	let list = ref([{
			iconPath: "home",
			selectedIconPath: "home-fill",
			text: '首页',
			customIcon: false,
			pagePath: "/pages/home/index"
		},
		{
			iconPath: "photo",
			selectedIconPath: "photo-fill",
			text: '分类',
			customIcon: false,
			pagePath: "/pages/sort/index"
		},
		{
			iconPath: "account",
			selectedIconPath: "account-fill",
			text: '我的',
			customIcon: false,
			pagePath: "/pages/my/index"
		},
	])
	let current = ref(0)
</script>

<style scoped lang="scss">
	.home {
		overflow: auto;
	}

	.t-icon {
		width: 80rpx;
		height: 80rpx;
	}

	.grid-text {
		font-size: 28rpx;
		margin-top: 4rpx;
		color: $u-type-info;
	}
</style>