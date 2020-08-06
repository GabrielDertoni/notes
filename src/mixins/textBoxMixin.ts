import { Component, Vue, Prop, Emit } from "vue-property-decorator";

@Component
export default class TextBoxMixin extends Vue {
  @Prop({ default: "" }) readonly value!: string;

  public text = "";

  mounted() {
    this.text = this.value;
  }

  @Emit()
  input() {
    return this.text;
  }
}