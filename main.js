import App from './App'

// 引入 uView UI
import uView from './uni_modules/vk-uview-ui';

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
const app = createApp(App);
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
	...App
})
app.use(uView)
app.$mount()
// #endif

// #ifdef VUE3
import {
	createSSRApp
} from 'vue'
export function createApp() {
	const app = createSSRApp(App)
	// 使用 uView UI
	app.use(uView)
	return {
		app
	}
}
// #endif