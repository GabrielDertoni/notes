import IBlock from "./Block";

export default class Image implements IBlock {
  public readonly type = "image";

  constructor(protected src?: string) {}

  get data() {
    return {}
  }
}