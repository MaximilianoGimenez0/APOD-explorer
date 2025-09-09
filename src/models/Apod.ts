export interface Apod {
  title: string;
  explanation: string;
  url: string;
  hdurl?: string;
  date: string;
  media_type: "image" | "video";
  thumbnail_url?: string;
}
