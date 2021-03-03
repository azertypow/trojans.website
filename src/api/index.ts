export interface IApiProjects {
  id: number
  description: string
  title: string
  published_at: string
  created_at: string
  updated_at: string
  exhibition_links: IApiExhibition_links [],
  images: IApiImage[]
}

export interface IApiExhibition_links {
  id: number
  exhibition_title: string
  exhibition_link: string
  date: string
  partenariat_description: string
}

declare type ImageExt = ".png" | ".jpg" | ".gif"

export interface IApiImage {
  id: number
  name: string
  alternativeText: string
  caption: string
  width: number
  height: number
  formats: {
    large: IApiImageSize,
    small: IApiImageSize,
    medium: IApiImageSize,
    thumbnail: IApiImageSize
  },
  hash: string
  ext: ImageExt
  mime: string
  size: number
  url: string
  previewUrl: null
  provider: string
  provider_metadata: null
  created_at: string
  updated_at: string
}

export interface IApiImageSize {
  ext: ImageExt,
  url: string,
  hash: string,
  mime: string,
  name: string,
  path: null | string,
  size: number,
  width: number,
  height: number
}
