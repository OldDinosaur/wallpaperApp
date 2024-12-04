<template>
	<!-- 	<u-section title="真实" :right="false"></u-section>
	<view class="ex-list">
		<view v-for="item in exList" :key="item.id" class="item" @click="orderTo(item)">
			{{item.title}}
			<u-icon name="arrow-right"></u-icon>
		</view>
	</view> -->
	<u-section title="正经" :right="false"></u-section>
	<view class="ex-list">
		<view v-for="item in ggList" :key="item.id" class="item" @click="orderTo(item)">
			{{item.title}}
			<u-icon name="arrow-right"></u-icon>
		</view>
	</view>
</template>

<script setup>
	import {
		ref,
		reactive,
	} from 'vue'
		const n1 = async () => {
		console.log('saa')
		const s1 = await new Promise((resolve, reactive) => resolve('s1'))
		console.log(s1)
		console.log(111)
	}
	const n2 = () => {
		console.log('sbb')
		new Promise((resolve, reactive) => resolve('s2')).then((res) => {
			console.log(res)
		})
		console.log(222)
	}
	n1()
	n2()
	let exList = reactive([{
		id: 0,
		title: 'test1'
	}, {
		id: 1,
		title: 'test2'
	}, {
		id: 3,
		title: 'test3'
	}, {
		id: 4,
		title: 'test4'
	}, {
		id: 5,
		title: 'test5'
	}])
	let ggList = reactive([{
		id: 0,
		title: '找工作',
		url: '/pages/home/example/tricks/index'
	}, {
		id: 1,
		title: '身高计算器',
		url: '/pages/home/example/tricks/index'
	}])
	const orderTo = (item) => {
		if (item.url) {
			uni.navigateTo({
				url: item.url,
				success: function(res) {
					// 通过eventChannel向被打开页面传送数据
					res.eventChannel.emit('acceptDataFromOpenerPage', {
						id: item.id,
						title: item.title
					})
				}
			})
		}

	}
</script>

<style lang="scss" scoped>
	.ex-list {
		padding: 20rpx;
		display: grid;
		grid-template-columns: repeat(3, 1fr);
		/* 创建三个平等宽度的列 */
		gap: 20rpx;

		/* 可选，定义列之间的间隙 */
		.item {
			// width: 30%;
			height: 100rpx;
			border-radius: 12rpx;
			box-shadow: 0 4rpx 12rpx 0 rgba(0, 0, 0, 0.1);
			display: flex;
			justify-content: space-evenly;
			align-items: center;
			font-weight: bold;
		}
	}
</style>