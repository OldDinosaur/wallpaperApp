<template>
	<view class="u-skeleton">
		<u-swiper :list="swiperList" :effect3d="true" :height='400' @click="showPic"></u-swiper>
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
	
	/* 点击显示图片 */
	const showPic = (index) => {
		let picList = []
		for (let item of swiperList.value) {
			picList.push(item.image)
		}
		uni.previewImage({
			current: index, // 当前显示图片索引
			urls: picList, // 需要预览的图片http链接列表
			longPressActions: {
				itemList: ['保存图片'],
				success: function(data) {
					if (data.tapIndex === 0) {
						savePic(swiperList.value[index].image)
					}
				},
				fail: function(err) {
					console.log(err.errMsg);
				}
			}
		});
	}
	/* 保存图片 */
	const savePic = (src) => {
		uni.downloadFile({
			url: src,
			success(res) {
				uni.saveImageToPhotosAlbum({
					filePath: res.tempFilePath,
					success() {
						uni.showToast({
							title: '保存成功',
							icon: "succeed"
						})
					},
					fail(err) {
						uni.showToast({
							title: '保存失败',
							icon: "error"
						})
					}
				})
			}
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