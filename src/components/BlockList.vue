<template>
  <v-container fluid class="block-list">
    <template v-for="(block, index) in blocks">
      <component
        :is="getBlockComponentName(block.type)"
        :key="index"
        v-bind="block"
        :selected="selected === index"
        v-on="getEventHandlers(index)"
        :ref="`block-${index}`"
      ></component>
      <!-- <TextBlock
        v-if="block.type === 'text'"
        :key="index"
        v-bind="block"
        :selected="selected === index"
        v-on="getEventHandlers(index)"
        :ref="`block-${index}`"
      />
      <ImageBlock
        v-else-if="block.type === 'image'"
        :key="index"
        v-bind="block"
        :selected="selected === index"
        v-on="getEventHandlers(index)"
        :ref="`block-${index}`"
      />
      <TitleBlock
        v-else-if="block.type === 'title'"
        :key="index"
        v-bind="block"
        :selected="selected === index"
        v-on="getEventHandlers(index)"
        :ref="`block-${index}`"
      />
      <LinkPreviewBlock
        v-else-if="block.type === 'link_preview'"
        :key="index"
        v-bind="block"
        :selected="selected === index"
        v-on="getEventHandlers(index)"
        :ref="`block-${index}`"
      /> -->
    </template>
  </v-container>
</template>
<script lang="ts">
import { Component, Vue, Watch } from "vue-property-decorator";
import VueConstructor from "vue";

import IBlock from "@/entities/Block";
import Title from "@/entities/Title";
import Text from "@/entities/Text";
import Image from "@/entities/Image";
import LinkPreview from "@/entities/LinkPreview";

import ImageBlock from "@/blocks/ImageBlock.vue";
import TextBlock from "@/blocks/TextBlock.vue";
import TitleBlock from "@/blocks/TitleBlock.vue";
import LinkPreviewBlock from "@/blocks/LinkPreviewBlock.vue";

@Component({
  components: {
    ImageBlock,
    TextBlock,
    TitleBlock,
    LinkPreviewBlock
  }
})
export default class BlockList extends Vue {
  public blocks: Array<IBlock> = [];
  public selected = 0;
  public scrollBlockQueue: Array<number> = [];

  // Lifecicle.
  public mounted(): void {
    document.body.addEventListener("keydown", ev => {
      const key = ev.key;
      if ((key === "Backspace" || key === "Delete") && this.selected < this.blocks.length)
        this.delete(this.selected);
      else if (key === "ArrowUp" && this.selected > 0)
        this.selected--;
      else if (key === "ArrowDown" && this.selected <= this.blocks.length)
        this.selected++;
      
    });

    this.blocks.push(new Title());
    this.blocks.push(new LinkPreview("https://google.com"));
    this.blocks.push(new Text());
  }

  public updated(): void {
    for (let index; (index = this.scrollBlockQueue.pop()) != undefined;)
      this.scrollTo(index);
  }

  public scrollTo(index: number) {
    const blocks = this.$refs[`block-${index}`] as Vue[] | undefined;
    if (blocks && blocks[0])
      this.$vuetify.goTo(blocks[0], {
        offset: 100
      });
  }

  public queueScroll(index: number) {
    this.scrollBlockQueue.unshift(index);
  }

  public getBlockObject(type: string): IBlock {
    switch (type) {
      case "title":
        return new Title();
      
      case "text":
        return new Text();
      
      case "image":
        return new Image();
      
      case "link_preview":
        return new LinkPreview("");
      
      default:
        return new Text();
    }
  }

  public getBlockComponentName(type: string): string {
    switch (type) {
      case "title":
        return "TitleBlock";
      
      case "text":
        return "TextBlock";
      
      case "image":
        return "ImageBlock";
      
      case "link_preview":
        return "LinkPreviewBlock";
      
      default:
        return "TextBlock";
    }
  }

  public getBlock(index: number): Vue | undefined {
    if (index < this.blocks.length) {
      const component = this.$refs[`block-${index}`] as Vue[] | undefined;
      if (component) return component[0];
    }
    return undefined;
  }
  
  public insertBlock(index: number, type: string) {
    this.blocks.splice(index + 1, 0, this.getBlockObject(type));
    this.selected = index + 1;

    this.queueScroll(this.selected);
  }

  public turnInto(index: number, transformFn: Function) {
    VueConstructor.set(this.blocks, index, transformFn(this.blocks[index]));
  }

  public select(index: number): void { this.selected = index; }
  public delete(index: number): void {
    if (index < this.blocks.length) {
      const block = this.getBlock(index) as any;
      if ((this.blocks[index].type === "text" && block && block.text === "") || this.blocks[index].type !== "text") {
        this.blocks.splice(index, 1);
        if (this.selected === index)
          this.selected--;
        
        if (index === this.blocks.length) {
          this.insertBlock(index, "text");
          this.selected -= 2;
        }
      }
    }
  }

  public getEventHandlers(index: number): Record<string, Function> {
    return {
      'add-text': () => this.insertBlock(index, "text"),
      'add-block': () => this.insertBlock(index, "image"),
      'turn-into': (payload: Function) => this.turnInto(index, payload),
      'select': () => this.select(index)
    }
  }
}
</script>