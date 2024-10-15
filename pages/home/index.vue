<template>
	<view class="">
		<u-section title="面试题" :right="false"></u-section>
		<text class="t-icon-shipin"></text>
		<u-grid :col="3">
			<u-grid-item v-for="item in interviewList" :key="item.id" @click="orderTo(item)">
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

	/* 面试题 */
	let interviewList = reactive([{
			id: 0,
			title: 'HTML',
			icon: 't-icon-html'
		},
		{
			id: 1,
			title: 'JS',
			icon: 't-icon-js'
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
			icon: 't-icon-suanfaku'
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