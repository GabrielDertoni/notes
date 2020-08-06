import IBlock from "./Block";


export default class Text implements IBlock {
  public readonly type = "text";

  constructor(protected value = "") {}

  get data() {
    return {};
  }
}