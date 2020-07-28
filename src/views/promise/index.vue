<template>
  <div>123</div>
</template>
<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({})
export default class Promise extends Vue {
  name: string = 'promise'

  created () {
    console.log(this.name)
  }
}
</script>
<style>
</style>
