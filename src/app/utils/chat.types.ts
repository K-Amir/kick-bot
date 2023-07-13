export interface Channel {
  id: number;
  user_id: number;
  slug: string;
  is_banned: boolean;
  playback_url: string;
  name_updated_at: any;
  vod_enabled: boolean;
  subscription_enabled: boolean;
  followersCount: number;
  subscriber_badges: any[];
  banner_image: any;
  recent_categories: RecentCategory[];
  livestream: any;
  role: any;
  muted: boolean;
  follower_badges: any[];
  offline_banner_image: any;
  can_host: boolean;
  user: User;
  chatroom: Chatroom;
  ascending_links: any[];
  plan: any;
  verified: any;
  media: any[];
}

export interface RecentCategory {
  id: number;
  category_id: number;
  name: string;
  slug: string;
  tags: string[];
  description: any;
  deleted_at: any;
  viewers: number;
  banner: Banner;
  category: Category;
}

export interface Banner {
  responsive: string;
  url: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  icon: string;
}

export interface User {
  id: number;
  username: string;
  agreed_to_terms: boolean;
  email_verified_at: string;
  bio: any;
  country: any;
  state: any;
  city: any;
  instagram: any;
  twitter: any;
  youtube: any;
  discord: any;
  tiktok: any;
  facebook: any;
  profile_pic: string;
}

export interface Chatroom {
  id: number;
  chatable_type: string;
  channel_id: number;
  created_at: string;
  updated_at: string;
  chat_mode_old: string;
  chat_mode: string;
  slow_mode: boolean;
  chatable_id: number;
  followers_mode: boolean;
  subscribers_mode: boolean;
  emotes_mode: boolean;
  message_interval: number;
  following_min_duration: number;
}

export interface Thumbnail {
  src: string;
  srcset: string;
}

export interface Video {
  id: number;
  live_stream_id: number;
  slug: any;
  thumb: any;
  s3: any;
  trading_platform_id: any;
  created_at: string;
  updated_at: string;
  uuid: string;
  views: number;
  deleted_at: any;
}

export interface Messages {
  status: Status;
  data: Data;
}

export interface Status {
  error: boolean;
  code: number;
  message: string;
}

export interface Data {
  messages: Message[];
  cursor: string;
}

export interface Message {
  id: string;
  chat_id: number;
  user_id: number;
  content: string;
  type: string;
  metadata: any;
  created_at: string;
  sender: Sender;
}

export interface Sender {
  id: number;
  slug: string;
  username: string;
  identity: Identity;
}

export interface Identity {
  color: string;
  badges: Badge[];
}

export interface Badge {
  type: string;
  text: string;
  active: boolean;
}

export interface UserBackgroundColor {
  [key: string]: string;
}
