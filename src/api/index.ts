// urls
export const API_BASE_URL       = "http://104.248.20.170"
export const API_PROJECT_URL    = `${API_BASE_URL}/Projects?_limit=-1`
export const API_CONTACT_URL    = `${API_BASE_URL}/Contact`
export const API_ABOUT_URL      = `${API_BASE_URL}/about`
export const API_AWARDS_URL     = `${API_BASE_URL}/exhibitions-and-awards`
export const API_MANIFESTO_URL  = `${API_BASE_URL}/manifesto`
export const API_INFO_URL       = `${API_BASE_URL}/info`
export const API_WITH_US_URL    = `${API_BASE_URL}/they-work-with-us`
export const API_HOME_IMAGE_URL = `${API_BASE_URL}/home-images`


export interface IApiProject {
  id: number
  description?: string
  title?: string
  published_at?: string
  created_at?: string
  updated_at?: string
  date?: string
  exhibition_links?: IApiExhibition_links [],
  images?: IApiImage[]
}

export interface IApiExhibition_links {
  type?: string
  id?: number
  exhibition_title?: string
  exhibition_link?: string
  date?: string
  partenariat_description?: string
}

declare type ImageExt = ".png" | ".jpg" | ".gif"

export interface IApiImage {
  id?: number
  name?: string
  alternativeText?: string
  caption?: string
  width?: number
  height?: number
  formats?: {
    large?: IApiImageSize,
    small?: IApiImageSize,
    medium?: IApiImageSize,
    thumbnail?: IApiImageSize
  },
  hash?: string
  ext?: ImageExt
  mime?: string
  size?: number
  url?: string
  previewUrl?: null
  provider?: string
  provider_metadata?: null
  created_at?: string
  updated_at?: string
}

export interface IApiImageSize {
  ext?: ImageExt,
  url?: string,
  hash?: string,
  mime?: string,
  name?: string,
  path?: null | string,
  size?: number,
  width?: number,
  height?: number
}


export interface IApiContact {
  id: number
  Address: string
  City: string
  Postal_Code: number
  Country: string
  mail: string
  published_at: string
  created_at: string
  updated_at: string
  links:
    {
      id: number
      name: string
      url: string
    }[]
}

export interface IApiAbout {
  id: number,
  description: string,
  created_at: string,
  updated_at: string,
  published_at: string,
  images: IApiImage[ ]
}

export interface IApiExhibitionsAndAwards {
  id: number,
  published_at: string,
  created_at: string,
  updated_at: string,
  events: {
      id: number,
      name: string,
      link: string,
      date: string,
      location: string
    }[]
}

export interface IApiManifesto {
  id: number,
  description: string,
  published_at: string,
  created_at: string,
  updated_at: string,
  images: IApiImage[]
}

export interface IApiInfo {
  id: number,
  published_at: string,
  created_at: string,
  updated_at: string,
  infos: string,
  activated: boolean
}

export interface IApiTheyWorkWithUs {
  id: number,
  created_at: string,
  updated_at: string,
  partner: {
    id: number,
    name: string,
    url: string
  }[]
}

export interface IApiHomeImage {
  id: number,
  Link: string,
  published_at: string,
  created_at: string,
  updated_at: string,
  Image: IApiImage,
}
