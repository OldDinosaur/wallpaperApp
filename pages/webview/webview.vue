<template>
	<web-view :src="url"></web-view>

</template>

<script setup>
	import {
		onPullDownRefresh,
		onLoad,
	} from '@dcloudio/uni-app';
	import {
		ref
	} from 'vue';
	let url = ref('')
	/* 界面显示 */
	onLoad((option) => {
	   url.value = decodeURIComponent(option.url);
	})
</script>

<style>
</style>