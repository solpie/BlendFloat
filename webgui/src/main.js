import Vue from 'vue'
import ElementUI from 'element-ui'
import VueResource from 'vue-resource'
import 'element-ui/lib/theme-default/index.css'

Vue.use(VueResource)
    //vue req same as $ jquery
Vue.http.options.emulateJSON = true;
Vue.use(ElementUI)
import App from './App.vue'
import SettingPanel from './panel/Setting.vue'
import ZBrushPanel from './panel/ZBrush.vue'
Vue.component('SettingPanel', SettingPanel)
Vue.component('ZBrushPanel', ZBrushPanel)
let vm = new Vue({
        el: '#app',
        render: h => h(App)
    })
    // import app from './App.js'
    // app.init(vm)
    // vm.render = h => h(App)
    // render: h => h(App)