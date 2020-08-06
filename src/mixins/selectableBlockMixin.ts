import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class SelectableBlockMixin extends Vue {
  @Prop({ default: false }) readonly selected!: boolean;
  @Prop({ default: () => ({}) }) readonly on!: Record<string, Function>;

  public select(): void { this.$emit("select"); }
  public deselect(): void { this.$emit("deselect"); }

  public addBtn(event: string): void { this.$emit(event); }

  mounted() {
    Object.keys(this.on).forEach(key => {
      this.$on(key, this.on[key]);
    });
  }

  get backgroundColor(): string {
    if (this.selected) return "#0000001A";
    else return "transparent";
  }
}