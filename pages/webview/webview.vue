<template>
	<view >
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
	onNavigationBarButtonTap((e)=>{
		if(e.type == 'home'){
			uni.navigateBack({
			    url: '/pages/home/video/index'
			});
		}
	})
</script>

<style>
</style>