<template>
  <div class="layout">
    layout
    <router-view />
  </div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class layout extends Vue {
  created () {
    console.log(this, 'aaa')
  }
}
</script>
<style lang="less" scoped>
.layout {
  color: @text-color;
}
</style>
