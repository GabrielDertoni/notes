<template>
  <v-btn
    color="rgba(0, 0, 0, .54)"
    block
    small
    outlined
    @click="$emit('click')"
  >
  <v-icon left>mdi-plus</v-icon>Outro
  </v-btn>
</template>
<script lang="ts">
import { Component, Vue, Emit } from 'vue-property-decorator'

@Component
export default class AddTextBtn extends Vue {
  
}
</script>