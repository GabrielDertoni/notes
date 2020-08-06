import IBlock from "./Block";


export default class Text implements IBlock {
  public readonly type = "title";

  constructor(protected value = "") {}

  get data() {
    return {};
  }
}