<template>
  <v-app>
    <v-app-bar
      id="app-bar"
      app
      color="white"
      light
      dense
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Notes</v-toolbar-title>
    </v-app-bar>

    <v-main>
      <BlockList/>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'

import BlockList from '@/components/BlockList.vue';
@Component({
  components: {
    BlockList
  }
})
export default class App extends Vue {
  public nBlocks = 1;

  public addTextBlock() {
    this.nBlocks++;
  }
}
</script>
<style lang="scss">
#app-bar::after {
  content: "";
  position: absolute;
  left: 0;
  right: 0;
  width: 100%;
  height: 2px;
  border-bottom: 2px solid rgba(0, 0, 0, .3);
}

.text-box:focus {
  outline: none;
}
</style>