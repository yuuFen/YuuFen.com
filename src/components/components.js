import Vue from 'vue'

import StatusTime from './status/StatusTime'
import StatusSignal from './status/StatusSignal'

import Slider from './dashboard/Slider'
import SliderPage from './dashboard/SliderPage'
import AppGroup from './dashboard/AppGroup'
import App from './dashboard/App'

import InApp from './dashboard/InApp'
import Wechat from './app/Wechat'
import Album from './app/Album'
import Zhifubao from './app/Zhifubao'
import Comment from './app/Comment'

import InkMsgContainer from './message/InkMsgContainer'
import MsgContainer from './message/MsgContainer'
import Msg from './message/Msg'
import BottomInput from './message/BottomInput'

Vue.component('m-status-time', StatusTime)
Vue.component('m-status-signal', StatusSignal)

Vue.component('m-slider', Slider)
Vue.component('m-slider-page', SliderPage)
Vue.component('m-app-group', AppGroup)
Vue.component('m-app', App)

Vue.component('m-inapp', InApp)
Vue.component('m-app-wechat', Wechat)
Vue.component('m-app-album', Album)
Vue.component('m-app-zhifubao', Zhifubao)
Vue.component('m-app-comment', Comment)

Vue.component('m-ink-msg-container', InkMsgContainer)
Vue.component('m-msg-container', MsgContainer)
Vue.component('m-msg', Msg)
Vue.component('m-bottom-input', BottomInput)
