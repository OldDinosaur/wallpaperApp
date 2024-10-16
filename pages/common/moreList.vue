<template>
	<view class="wrap">
		<u-waterfall v-model="flowList" ref="uWaterfall1" idKey='image_id'>
			<template v-slot:left="{leftList}">
				<view class="demo-warter" v-for="(item, index) in leftList" :key="index">
					<!-- 警告：微信小程序中需要hx2.8.11版本才支持在template中结合其他组件，比如下方的lazy-load组件 -->
					<u-lazy-load threshold="-450" border-radius="10" :image="item.url" :index="index" @click="showPic(item.url)"></u-lazy-load>
					<view class="demo-tag">
						<!-- 	<view class="demo-tag-owner">
							自营
						</view> -->
						<view class="demo-tag-text">
							{{item.artist ? item.artist.name : '未知' }}
						</view>
					</view>
					<view class="demo-shop">
						{{item.shop}}
					</view>
				</view>
			</template>
			<template v-slot:right="{rightList}">
				<view class="demo-warter" v-for="(item, index) in rightList" :key="index">
					<u-lazy-load threshold="-450" border-radius="10" :image="item.url" :index="index" @click="showPic(item.url)"></u-lazy-load>
					<view class="demo-tag">
						<!-- <view class="demo-tag-owner">
							自营
						</view> -->
						<view class="demo-tag-text">
							{{item.artist ? item.artist.name : '未知' }}
						</view>
					</view>
					<view class="demo-shop">
						{{item.shop}}
					</view>
				</view>
			</template>
		</u-waterfall>
		<u-back-top :scroll-top="scrollTop"></u-back-top>
		<u-loadmore bg-color="rgb(240, 240, 240)" :status="loadStatus" @loadmore="addRandomData"></u-loadmore>
	</view>
</template>

<script setup>
	import request from '@/utils/request.js'
	import {
		onLoad,
		onPageScroll,
		onReachBottom,
		onNavigationBarButtonTap
	} from '@dcloudio/uni-app';
	import {
		ref
	} from 'vue';
	/*回到首页 */
	onNavigationBarButtonTap((e)=>{
		if(e.type == 'home'){
			uni.navigateBack({
			    url: '/pages/home/index'
			});
		}
	})
	
	
	const uWaterfall1 = ref(null);
	let tab = ref(null)
	let scrollTop = ref(0)
	onPageScroll((e) => {
		scrollTop.value = e.scrollTop;
	})
	onLoad(() => {
		// 获取上一个页面传过来的数据
		const pages = getCurrentPages(); // 无需import 
		const page = pages[pages.length - 1];
		const eventChannel = page.getOpenerEventChannel();
		eventChannel.on('acceptDataFromOpenerPage', (data) => {
			uni.setNavigationBarTitle({
				title: data.tab || '更多'
			})
			tab.value = data.tab
			addRandomData()
		})
	})
	let loadStatus = ref('loadmore')
	let flowList = ref([])
	let list = ref([])
	onReachBottom(() => {
		loadStatus.value = 'loading';
		setTimeout(() => {
			addRandomData();
			loadStatus.value = 'loadmore';
		}, 1000)
	})
	/* 获取数据 */
	const addRandomData = () => {
		request.request('https://api.waifu.im/search', 'get', {
			'included_tags': tab.value,
			'limit': 10,
		}).then(res => {
			console.log(res);
			for (let pic of res.images) {
				flowList.value.push(pic)
			}
		})
	}
	/* 点击显示图片 */
	const showPic = (item) => {
		uni.previewImage({
			current: 1, // 当前显示图片索引
			urls: [item], // 需要预览的图片http链接列表
			longPressActions: {
				itemList: ['保存图片'],
				success: function(data) {
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
</script>
<style lang="scss" scoped>
	.demo-warter {
		border-radius: 8px;
		margin: 5px;
		background-color: #ffffff;
		padding: 8px;
		position: relative;
	}

	.u-close {
		position: absolute;
		top: 32rpx;
		right: 32rpx;
	}

	.demo-image {
		width: 100%;
		border-radius: 4px;
	}

	.demo-title {
		font-size: 30rpx;
		margin-top: 5px;
		color: $u-main-color;
	}

	.demo-tag {
		display: flex;
		margin-top: 5px;
	}

	.demo-tag-owner {
		background-color: $u-type-error;
		color: #FFFFFF;
		display: flex;
		align-items: center;
		padding: 4rpx 14rpx;
		border-radius: 50rpx;
		font-size: 20rpx;
		line-height: 1;
	}

	.demo-tag-text {
		border: 1px solid $u-type-primary;
		color: $u-type-primary;
		margin-left: 10px;
		border-radius: 50rpx;
		line-height: 1;
		padding: 4rpx 14rpx;
		display: flex;
		align-items: center;
		border-radius: 50rpx;
		font-size: 20rpx;
	}

	.demo-price {
		font-size: 30rpx;
		color: $u-type-error;
		margin-top: 5px;
	}

	.demo-shop {
		font-size: 22rpx;
		color: $u-tips-color;
		margin-top: 5px;
	}
</style>