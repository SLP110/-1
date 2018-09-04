import Vue from 'vue'
import App from './App'
import http from './common/js/http'
import wxApi from './common/js/wx.api';
import utils from './common/js/util';

Vue.config.productionTip = false
App.mpType = 'app'
Vue.prototype.$http = http;
Vue.prototype.$wx = wxApi;
Vue.prototype.$util = utils;

const app = new Vue(App)
app.$mount()
