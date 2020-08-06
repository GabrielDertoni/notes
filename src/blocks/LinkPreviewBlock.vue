<template>
  <Block :selected="selected">
    <v-card outlined dense :href="src ? src : ''" target="_blank">
      <div class="d-flex flex-no-wrap">
        <v-avatar
          class="ma-3"
          size="70"
          tile
        >
          <v-img contain :src="imageURL"></v-img>
        </v-avatar>
        <div class="preview-content">
          <v-card-title class="pb-1 pt-2 px-1">{{ title }}</v-card-title>
          <v-card-text class="preview-text pb-0 px-1">{{ descriptionSummary }}</v-card-text>
          <v-card-text class="preview-text pb-2 pt-1 px-1 text-decoration-underline font-weight-bold">{{ src }}</v-card-text>
        </div>
      </div>
    </v-card>
    
    <template v-slot:buttons>
      <AddBtns v-on="$listeners"/>
    </template>
  </Block>
</template>
<script lang="ts">
import { Component, Mixins, Prop } from "vue-property-decorator";

import LinkPreview from '@/entities/LinkPreview';

import Block from "@/blocks/Block.vue";
import SelectableBlockMixin from '@/mixins/selectableBlockMixin';
import AddBtns from "@/components/AddBtns.vue";

@Component({
  components: {
    Block,
    AddBtns
  }
})
export default class LinkPreviewBlock extends Mixins(SelectableBlockMixin) {
  @Prop({ default: null }) readonly src!: string | null;
  @Prop({ default: "" }) readonly title!: string;
  @Prop({ default: "" }) readonly description!: string;
  @Prop({ default: null }) readonly imageURL!: string | null;

  get descriptionSummary() {
    const maxChars = 100;
    if (this.description.length < maxChars)
      return this.description;
    else
      return this.description.slice(0, maxChars-3) + "...";
  }
}
</script>
<style lang="scss">
.preview-text {
  font-size: 0.8em !important;
  line-height: 1.2em !important;
}
</style>