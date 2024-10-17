<template>
	<view>
		<web-view :src="url"></web-view>
	</view>
</template>

<script setup>
	import {
		onPullDownRefresh,
		onLoad,
		onNavigationBarButtonTap
	} from '@dcloudio/uni-app';
	import {
		ref
	} from 'vue';
	let url = ref('')
	/* 界面显示 */
	onLoad((option) => {
		url.value = decodeURIComponent(option.url);
	})
	/*回到首页 */
	onNavigationBarButtonTap((e) => {
		if (e.type == 'home') {
			let pages = getCurrentPages()
			let page = pages[pages.length - 1];
			// #ifdef APP-PLUS
			let currentWebview = page.$getAppWebview();
			let children = currentWebview.children()
			if (children.length === 0) {
				uni.navigateBack()
			} else {
				children[0].close()
				setTimeout(() => {
					uni.navigateBack()
				}, 80)
			}
			// #endif
		}
	})
</script>

<style>
</style>