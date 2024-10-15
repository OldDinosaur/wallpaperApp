<template>
	<view>
		<view class="u-page">
			<!-- 搜索框 -->
			<u-search margin='10rpx' :show-action='false' placeholder="爆照的老恐龙" :clearabled="true" v-model="keyword"
				@search="searchClick"></u-search>
			<!-- 轮播图 -->
			<swiper1 ref="swiper1Ref" />
			<view>
				<!-- 更多 -->
				<u-card v-for="(item,index) in picList" :key="item.tab" :title="item.tab" :show-foot='false'
					sub-title="查看更多" @head-click="checkMore(item)">
					<template v-slot:body>
						<view class="tap-pic ">
							<view class="pic-item" v-for="(pic,index1) in item.list">
								<u-image width="100%" height="300rpx" :src="pic.url"
									@click="showPic(pic.url,index1,item.list)"></u-image>
							</view>
						</view>
					</template>
				</u-card>
			</view>
			<!-- <u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton> -->
			<!-- APP中底部与自定义导航栏断开 -->
			<view style="height: 100rpx;"></view>
		</view>
	</view>
</template>

<script setup>
	import request from '@/utils/request.js'
	import {
		onPullDownRefresh,
		onLoad,
	} from '@dcloudio/uni-app';
	import swiper1 from './swiper1.vue'
	import {
		ref,
		reactive,
		defineExpose,
		nextTick
	} from 'vue'

	let loading = ref(false)
	let keyword = ref('爆照的老恐龙')
	let swiper1Ref = ref()
	// 下拉刷新
	onPullDownRefresh(() => {
		swiper1Ref.value.getData()
		getAllTags()
		setTimeout(function() {
			uni.stopPullDownRefresh();
		}, 1000);
	})
	/* 获取所有标签及其图片 */
	let tags = ref({})
	let nsfwList = ref([])
	let versatileList = ref([])
	let picList = ref([])
	const getAllTags = () => {
		loading.value = true
		request.request('https://api.waifu.im/tags').then(res => {
			tags.value = res //nsfw  versatile
			nsfwList.value = res.nsfw
			versatileList.value = res.versatile
			//获取versatile类型的图片
			picList.value = []
			for (let item of versatileList.value) {
				request.request('https://api.waifu.im/search', 'get', {
					'included_tags': item,
					'limit': 6,
				}).then(res => {
					picList.value.push({
						tab: item,
						list: res.images
					})
				})
			}
			loading.value = false
		})
	}
	/* 界面显示 */
	onLoad(() => {
		nextTick(() => {
			if (swiper1Ref.value) {
				swiper1Ref.value.getData()
			}
		})
		getAllTags()
	})
	/* 点击显示图片 */
	const showPic = (item, index, list) => {
		let picList = []
		for (let item of list) {
			picList.push(item.url)
		}
		uni.previewImage({
			current: index, // 当前显示图片索引
			urls: picList, // 需要预览的图片http链接列表
			longPressActions: {
				itemList: ['保存图片'],
				success: function(data) {
					console.log(data);
					if (data.tapIndex === 0) {
						savePic(item)
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

	/* 搜索 */
	const searchClick = (val) => {
		if (keyword.value == '老恐龙是帅哥') {
			//获取versatile类型的图片
			picList.value = []
			for (let item of nsfwList.value) {
				request.request('https://api.waifu.im/search', 'get', {
					'included_tags': item,
					'limit': 6,
				}).then(res => {
					picList.value.push({
						tab: item,
						list: res.images
					})
				})
			}
		} else {
			picList.value = []
			for (let item of versatileList.value) {
				request.request('https://api.waifu.im/search', 'get', {
					'included_tags': item,
					'limit': 6,
				}).then(res => {
					picList.value.push({
						tab: item,
						list: res.images
					})
				})
			}
		}
	} 
	
	
	/* 查看更多 */
	const checkMore = (item)=>{
		uni.navigateTo({
		  url: '/pages/common/moreList',
		  success: function(res) {
		    // 通过eventChannel向被打开页面传送数据
		    res.eventChannel.emit('acceptDataFromOpenerPage', {tab:item.tab })
		  }
		})
	}
</script>

<style>
	.u-page {
		height: calc(100vh - 100rpx) !important;
		/* overflow: auto; */
	}

	.content {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
	}

	.tap-pic {
		width: 100%;
		height: 100%;
		display: flex;
		overflow-x: scroll;
		white-space: nowrap;
	}

	.pic-item {
		flex: 0 0 auto;
		width: 250rpx;
		margin-right: 10rpx;
		overflow: hidden;
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

	.warp {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 100%;
	}

	.rect {
		width: 100%;
		overflow: hidden;
		/* height: auto; */
	}
</style>