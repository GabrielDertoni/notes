import IBlock from "./Block";

import api from "@/link-preview.json";

export default class LinkPreview implements IBlock {
  static async fetchFirst(src: string): Promise<LinkPreview> {
    const data = await LinkPreview.fetch(src);
    return new LinkPreview(
      src,
      false,
      data.title,
      data.description,
      data.image
    ); 
  }

  static async fetch(src: string): Promise<Record<string, string | undefined>> {
    const fetchURL = `${api.baseURL}/?key=${api.key}&q=${src}`;
    const data: Record<string, string | undefined> = await fetch(encodeURI(fetchURL)).then(response => response.json());
    return {
      src,
      ...data
    }
  }
  
  public title!: string;
  public description!: string;
  public imageURL!: string | null;
  public loading = false;
  public readonly type: string = "link_preview";

  constructor(protected src: string, fetchAfter = true, title?: string, description?: string, imageURL?: string) {
    this.loading = true;

    if (fetchAfter) {
      this.fetch(src).then(() => this.loading = false);
    } else {
      this.title = title ?? "";
      this.description = description ?? "";
      this.imageURL = imageURL ?? null;
    }
  }

  public async fetch(src: string): Promise<void> {
    const { title, description, image }: Record<string, string | undefined> = await LinkPreview.fetch(src);
    this.title = title ?? "";
    this.description = description ?? "";
    this.imageURL = image ?? null;
  }

  get data() {
    return {};
  }
}
