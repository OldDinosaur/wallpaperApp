<template>
	<view>
		<view class="u-page text-area">
			<!-- APP中底部与自定义导航栏断开 -->
			关于：数据均来自网路提供，如有侵权，请联系开发者(1850110843@qq.com)删除。
			<view style="height: 100rpx;"></view>
		</view>
		<u-tabbar v-model="current" :list="list"></u-tabbar>
	</view>
</template>
<script setup>
	import {
		ref
	} from 'vue'
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
<style>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
</style>
