<template>
  <div>
    <span id="system-status-signal">
      <span v-for="(signal, index) in signals" 
        :key="index" class="signal"
        v-bind:class="{ 'active': signal, ['signal-' + (index + 1)]: true }">
      </span>
    </span>
    <span id="system-status-connection">{{ connection }}</span>
  </div>
</template>


<script>
export default {
  name: 'StatusSignal',
  data() {
    return {
      signals: [1, 1, 1, 0],
      connection: 'Wifi'
    }
  },
  created() {
    setInterval(() => {
      this.setSignals()
      this.setConnect()
    }, 5000)
  },
  methods: {
    setSignals() {
      const signalLength = 4
      const cnt = Math.min(Math.floor(Math.random() * 10 + 1), 
        signalLength)
      const signals = [1, 1, 1, 1]
      for (let i = 0; i < signalLength; ++i) {
        signals[i] = i < cnt ? 1 : 0
      }
      this.signals = signals
    },

    setConnect() {
      const connect = navigator.connection
      if (!connect || connect.type === 'wifi') {
        this.connection = 'Wifi'
      }
      this.connection = connect.effectiveType
    }
  }
}
</script>