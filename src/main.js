import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

Vue.config.productionTip = false

import Vuetify from 'vuetify'
import vuetify from '@/plugins/vuetify'
Vue.use(Vuetify);

new Vue({
	vuetify,
  	router,
  	store,
  	render: h => h(App)
}).$mount('#app')
