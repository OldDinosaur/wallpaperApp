<template>
	<view class="u-skeleton">
		<u-swiper :list="swiperList" :effect3d="true" :height='400'></u-swiper>
		<!-- <u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton> -->
	</view>
</template>

<script setup>
	import request from '@/utils/request.js'
	import {
		ref,
		defineExpose
	} from 'vue';
	let swiperList = ref([])
	let loading = ref(true)
	const getData = () => {
		loading.value = true
		request.request('https://api.waifu.im/search', 'get', {
			// 'included_tags': 'hentai',
			'limit': 5,
			'width': '<=3000',
			'height': '<=1600'
		}).then(res => {
			swiperList.value = []
			for (let item of res.images || []) {
				swiperList.value.push({
					image: item.url,
					title: item.image_id
				})
			}
			loading.value = false
		})
	}
	// 暴露方法
	defineExpose({
		getData // 暴露方法
	});
</script>

// <style lang="scss" scoped>
	// 	.wrap {
	// 		padding: 40rpx;
	// 	}
	// 
</style>