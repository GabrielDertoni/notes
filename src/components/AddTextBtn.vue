<template>
  <v-btn
    color="rgba(0, 0, 0, .54)"
    block
    small
    outlined
    @click="$emit('click')"
  >
  <v-icon left>mdi-text</v-icon>Texto
  </v-btn>
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component
export default class AddTextBtn extends Vue {
  
}
</script>
<style lang="scss">
</style>