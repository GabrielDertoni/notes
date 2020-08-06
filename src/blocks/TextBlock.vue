<template>
  <Block :selected="selected">
    <v-textarea
      class="text-block"
      rows="1"
      auto-grow
      row-height="1"
      no-resize
      solo
      flat
      dense
      hide-details
      light
      color="black"
      @focus="select()"
      @keypress.enter.exact.prevent="enter()"
      @keyup.delete="!text && $emit('delete')"
      :placeholder="selected ? 'Type something here...' : ''"
      :background-color="backgroundColor"
      v-model="text"
      :value="value"
      ref="textarea"
    ></v-textarea>
    <template v-slot:buttons>
      <AddBtns v-on="$listeners"/>
    </template>
  </Block>
</template>
<script lang="ts">
import { Component, Vue, Mixins, Watch } from "vue-property-decorator";

import TextBoxMixin from "@/mixins/textBoxMixin";
import SelectableBlockMixin from "@/mixins/selectableBlockMixin";
import Block from "@/blocks/Block.vue";
import AddBtns from "@/components/AddBtns.vue";

import LinkPreview from "@/entities/LinkPreview";
import { validURL } from "@/helpers";

@Component({
  components: {
    Block,
    AddBtns
  }
})
export default class TextBlock extends Mixins(TextBoxMixin, SelectableBlockMixin) {
  @Watch('selected', { immediate: true })
  onSelectedChange(val: boolean): void {
    if (val)
      this.focus();
    else
      this.blur();
  }

  public focus() {
    const textarea = this.$refs.textarea as any
    textarea?.focus();
  }

  public blur() {
    const textarea = this.$refs.textarea as any
    textarea?.blur();
  }

  public enter() {
    if (validURL(this.text)) {
      LinkPreview.fetchFirst(this.text).then((preview: LinkPreview) => {
        console.log("FINISHED FETCH");
        this.$emit('turn-into', () => preview);
      });
    }
    
    this.$emit('add-text');
  }

  mounted() {
    if (this.selected)
      this.focus();
    else
      this.blur();
  }
}
</script>
<style lang="scss">
.text-block {
  textarea {
    line-height: 1.3em;
  }
}
</style>