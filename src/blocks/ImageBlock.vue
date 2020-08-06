<template>
  <Block :selected="selected">
    <v-img
      @click="select()"
      :src="src"
      lazy-src="@/assets/default-img.png"
      :background-color="backgroundColor"
    />
    <template v-slot:buttons>
      <AddBtns v-on="$listeners"/>
    </template>
  </Block>
</template>
<script lang="ts">
import { Component, Vue, Prop, Mixins } from "vue-property-decorator";

import SelectableBlockMixin from "@/mixins/selectableBlockMixin";
import Block from "@/blocks/Block.vue";
import AddBtns from "@/components/AddBtns.vue";

@Component({
  components: {
    Block,
    AddBtns
  }
})
export default class ImageBlock extends Mixins(SelectableBlockMixin) {
  @Prop({ default: null }) readonly src!: string | null;
}
</script>