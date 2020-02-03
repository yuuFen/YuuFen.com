import Vue from 'vue';

import StatusTime from './status/StatusTime'
import StatusSignal from './status/StatusSignal'

import Slider from './dashboard/Slider'
import SliderPage from './dashboard/SliderPage'
import AppGroup from './dashboard/AppGroup'
import App from './dashboard/App'




Vue.component('m-status-time', StatusTime)
Vue.component('m-status-signal', StatusSignal)

Vue.component('m-slider', Slider)
Vue.component('m-slider-page', SliderPage)
Vue.component('m-app-group', AppGroup)
Vue.component('m-app', App)
