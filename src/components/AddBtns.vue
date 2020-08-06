<template>
  <v-row no-gutters>
    <v-col class="mr-1">
      <AddTextBtn @click="addBtn('add-text')"/>
    </v-col>
    <v-col class="mr-1">
      <AddBlockBtn @click="addBtn('add-block')"/>
    </v-col>
  </v-row>
</template>
<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

import AddTextBtn from "@/components/AddTextBtn.vue";
import AddBlockBtn from "@/components/AddBlockBtn.vue";

@Component({
  components: {
    AddTextBtn,
    AddBlockBtn
  }
})
export default class AddBtns extends Vue {
  public addBtn(event: string): void { this.$emit(event); }
}
</script>