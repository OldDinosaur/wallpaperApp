<template>
	<view class="page">
		<!-- 1.找工作 -->
		<view v-if="id===0" class="item-0" :style="{filter:isLoad ? 'blur(10rpx)':'none' }">
			<view v-for="(i,index) in list" :id="index" class="" @click="lookFor(index)">
				<view :style="{color: (index == randomN && isLook) ?  '#19be6b' :'black'}">
					{{i}}
				</view>
			</view>
		</view>
		<u-button v-if="id===0" :ripple="true" type='primary' @click="createP">刷新</u-button>
		<view v-if="id===1" class="w-sg">
			<view class="w-sg-l">
				身高：
			</view>
			<u-input class="w-sg-r" placeholder="cm" v-model="sg" type="text" :border="true" clearable />
		</view>
		<view v-if="id===1">
			<view class="w-sg-b">
				计算结果：{{readH}}
			</view>
			<u-button :loading="sgLoad" v-if="id===1" :ripple="true" type='primary' @click="disHeight">计算</u-button>
		</view>
		<u-popup v-model="show" mode='center' border-radius="14">
			<view class="show">
				<view class="show-c">
					{{showTitle}}
				</view>
			</view>
		</u-popup>
	</view>
</template>

<script setup>
	import {
		onLoad,
	} from '@dcloudio/uni-app';
	import {
		reactive,
		ref
	} from 'vue';
	/*  1.找工作 */
	let id = ref(null)
	let num = ref(50)
	let randomN = ref()
	let list = ref([])
	let isLoad = ref(false)
	let isLook = ref(false)
	let show = ref(false)
	let showTitle = ref('')
	// 第一个参数必须与模板中的 ref 值匹配
	const toast = ref()
	onLoad(() => {
		// 获取上一个页面传过来的数据
		const pages = getCurrentPages(); // 无需import 
		const page = pages[pages.length - 1];
		const eventChannel = page.getOpenerEventChannel();
		eventChannel.on('acceptDataFromOpenerPage', (data) => {
			uni.setNavigationBarTitle({
				title: data.title || ''
			})
			id.value = data.id
			createP()
		})
	})
	/* 生成 */
	const createP = () => {
		isLook.value = false
		let arr = new Array(49).fill('工柞')
		randomN.value = Math.floor(Math.random() * 50);
		isLoad.value = true
		arr.splice(randomN.value, 0, '工作')
		list.value = arr
		setTimeout(() => {
			isLoad.value = false
		}, 200)
	}
	/* 找到 */
	const lookFor = (index) => {
		if (index == randomN.value) {
			isLook.value = true
			show.value = true
			showTitle.value = '恭喜你！找到工作了！！！'
		} else {
			isLook.value = false
			show.value = true
			showTitle.value = '很抱歉！再找找看~'
		}
	}
	/*  2.身高计算 */
	let sg = ref(null)
	let sgLoad = ref(false)
	let readH = ref(null)
	const disHeight = () => {
		if (sg.value * 1 < 185 && sg.value * 1 >= 180) {
			readH.value = '一八五'
		} else if (sg.value * 1 < 180 && sg.value * 1 >= 175) {
			readH.value = '一八零'
		} else if (sg.value * 1 < 175 && sg.value * 1 >= 170) {
			readH.value = '差不多一米八'
		} else if (sg.value * 1 < 170 && sg.value * 1 >= 165) {
			readH.value = '一米七'
		} else if (sg.value * 1 < 165 && sg.value * 1 >= 164) {
			readH.value = '差不多一米七'
		} else if (sg.value * 1 < 164 && sg.value * 1 >= 160) {
			readH.value = '应该一米七'
		} else if (sg.value * 1 < 160) {
			readH.value = '没必要吧'
		} else {
			readH.value = sg.value
		}
	}
</script>

<style scoped lang="scss">
	.page {
		padding: 20rpx;
	}

	.item-0 {
		display: grid;
		place-items: center;
		grid-template-columns: repeat(5, 1fr);
		/* 创建三个平等宽度的列 */
		gap: 20rpx;
		padding-top: 20rpx;
		padding-bottom: 40rpx;
	}

	.show {
		padding: 24rpx;
		text-align: center;

		.show-c {}
	}

	.w-sg {
		display: flex;
		justify-content: center;
		align-items: center;
		padding-bottom: 40rpx;
		padding-top: 180rpx;

		.w-sg-l {
			font-size: 36rpx;
			font-weight: bold;
			width: 120rpx;
		}

		.w-sg-r {
			width: 100%;
		}
	}

	.w-sg-b {
		font-size: 36rpx;
		font-weight: bold;
		padding-bottom: 40rpx;
	}
</style>