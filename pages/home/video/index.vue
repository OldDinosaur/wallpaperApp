<template>
	<view class="">
		<u-grid :col="3">
			<u-grid-item v-for="item in list" :key="item.id" @click="orderTo(item)">
				<u-image mode="heightFix" height="200rpx" :src="item.icon" class="item-c" :lazy-load="true">
					<template v-slot:loading>
						<u-loading></u-loading>
					</template>
				</u-image>
				<view class="grid-text">{{item.title}}</view>
			</u-grid-item>
		</u-grid>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
	} from 'vue'
	let list = reactive([{
			id: 0,
			title: 'AGE动漫',
			icon: '	https://www.agedm.org/favicon.ico',
			url: '/pages/webview/webview?url=' + encodeURIComponent('https://www.agedm.org/')
		},
		{
			id: 1,
			title: '咕咕番',
			icon: 'https://www.gugu3.com/upload/site/20240809-1/7128d3562abaed14571d6227e1240aab.png',
			url: '/pages/webview/webview?url=' + encodeURIComponent('https://www.gugu3.com/')
		},
		{
			id: 2,
			title: 'iKun',
			icon: 'https://www.ikunyy.com/template/007/img/favicon.ico',
			url: '/pages/webview/webview?url=' + encodeURIComponent('https://www.ikunyy.com/')
		},
		{
			id: 3,
			title: '大米星球',
			icon: 'https://f746f90.sdljwomen.com/storage/images/2024-04-23/f1/347aea16ffa9a312dd85f769cda603d5.webp',
			url: '/pages/webview/webview?url=' + encodeURIComponent('https://dmq9x7.wiki/')
		},
		{
			id: 4,
			title: '菜狗',
			icon: 'https://www.dddog.cn/movie/img/ico.png',
			url: '/pages/webview/webview?url=' + encodeURIComponent('https://www.dddog.cn/movie/')
		},


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
</script>

<style scoped>
	.item-c {
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 20rpx;
	}
</style>