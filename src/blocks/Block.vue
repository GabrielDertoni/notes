<template>
  <v-row>
    <v-col cols="12" class="py-0">
      <v-row>
        <v-col class="py-0">
          <slot></slot>
        </v-col>
      </v-row>
      <v-expand-transition>
        <div v-show="selected">
          <slot name="buttons"></slot>
        </div>
      </v-expand-transition>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class Block extends Vue {
  @Prop({ default: false }) readonly selected!: boolean;
}
</script>