export interface Apod {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
  media_type: "image" | "video" | "iframe";
  thumbnail_url?: string;
  permalink?: string;
  credit?: string;
  copyright?: string;
  alt?: string;
  post_id?: number;
  basic_html_url?: string;
  requestedAt?: Date;
}
