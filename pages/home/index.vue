<template>
	<view>
		<view class="u-page">
			<!-- 搜索框 -->
			<u-search margin='10rpx' :show-action='false' placeholder="爆照的老恐龙" :clearabled="true" v-model="keyword"
				@search="searchClick"></u-search>
			<!-- 轮播图 -->
			<swiper1 ref="swiper1Ref" />
			<view >
				<!-- 更多 -->
				<u-card v-for="(item,index) in picList" :key="item.tab" :title="item.tab" :show-foot='false'
					sub-title="查看更多">
					<template v-slot:body>
						<view class="tap-pic ">
							<view class="pic-item" v-for="(pic,index) in item.list">
								<u-image width="100%" height="300rpx" :src="pic.url"
									@click="showPic(pic.url)"></u-image>
							</view>
						</view>
					</template>
				</u-card>
			</view>
			<!-- <u-skeleton :loading="loading" :animation="true" bgColor="#FFF"></u-skeleton> -->
			<!-- APP中底部与自定义导航栏断开 -->
			<view style="height: 100rpx;"></view>
			<!-- 点击图片显示并放大 -->
			<u-mask :show="show" @click="show = false">
				<view class="warp">
					<view class="rect" @click="show = false">
						<u-image width="100%" height="100vh" mode='aspectFit' :src="showSrc"></u-image>
					</view>
				</view>
			</u-mask>
		</view>
		<u-tabbar v-model="current" :list="list"></u-tabbar>
	</view>
</template>

<script setup>
	import request from '@/utils/request.js'
	import {
		onPullDownRefresh,
		onLoad
	} from '@dcloudio/uni-app';
	import swiper1 from './swiper1.vue'
	import {
		ref,
		reactive,
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
	let show = ref(false)
	let showSrc = ref()
	const showPic = (item) => {
		show.value = true
		showSrc.value = item
	}

	/* 搜索 */
	const searchClick = (val) => {
		console.log(keyword.value);
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