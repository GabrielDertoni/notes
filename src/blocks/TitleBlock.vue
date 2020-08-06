<template>
  <Block :selected="selected">
    <v-text-field
      @focus="select()"
      class="title-block"
      solo
      flat
      hide-details
      v-model="text"
      placeholder="Something"
    />
    <template v-slot:buttons>
      <AddBtns v-on="$listeners"/>
    </template>
  </Block>
</template>
<script lang="ts">
import { Component, Mixins } from "vue-property-decorator";

import TextBoxMixin from "@/mixins/textBoxMixin";
import SeletableBlockMixin from "@/mixins/selectableBlockMixin";
import Block from "@/blocks/Block.vue";
import AddBtns from "@/components/AddBtns.vue";

@Component({
  components: {
    Block,
    AddBtns
  }
})
export default class TitleBlock extends Mixins(TextBoxMixin, SeletableBlockMixin) {
}
</script>
<style lang="scss">
.title-block {
  input {
    font-size: 2em;
    font-weight: bold;
    max-height: unset !important;
  }
}
</style>