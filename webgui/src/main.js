import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'
import App from './App.vue'

Vue.use(VueResource)
    //vue req same as $ jquery
Vue.http.options.emulateJSON = true;
Vue.use(ElementUI)

new Vue({
    el: '#app',
    render: h => h(App)
})