<template>
	<!-- 首页 -->
	<home v-if="value===0" />
	<!-- 分类 -->
	<sort v-if="value===1" />
	<!-- 我的 -->
	<my v-if="value===2" />
	<uv-tabbar :value="value" @change="change" fixed safeAreaInsetBottom>
		<uv-tabbar-item text="首页" icon="home">
		</uv-tabbar-item>
		<uv-tabbar-item text="分类" icon="photo"></uv-tabbar-item>
		<!-- <uv-tabbar-item text="直播" icon="play-right"></uv-tabbar-item> -->
		<uv-tabbar-item text="我的" icon="account"></uv-tabbar-item>
	</uv-tabbar>
</template>
<script setup>
	import { ref } from 'vue'
	import home from '../home/index.vue'
	import sort from '../sort/index.vue'
	import my from '../my/index.vue'
	let value = ref(0)
	function change(index){
		value.value = index
		if(value.value === 0){
			console.log(0)
		}
		if(value.value === 1){
			console.log(1)
		}
		if(value.value === 2){
			console.log(2)
		}
	}	
</script>