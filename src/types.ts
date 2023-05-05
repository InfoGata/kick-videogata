export interface KickUser {
  username: string;
  profilePic: string;
}

export interface KickSearchChannel {
  id: string;
  user_id: string;
  slug: string;
  user: KickUser;
  isLive: boolean;
}

export interface KickSearch {
  channels: KickSearchChannel[];
}

export interface KickChannel {
  id: number;
  slug: string;
  followersCount: number;
  previous_livestreams: KickPreviousLivestream[];
  user: KickUser;
}

export interface KickPreviousLivestream {
  id: number;
  slug: string;
  created_at: string;
  duration: number;
  views: number;
  thumbnail: KickThumbnail;
  session_title: string;
  video: KickPreviousVideo;
}

export interface KickThumbnail {
  src: string;
}

export interface KickPreviousVideo {
  id: number;
  uuid: string;
}

export interface KickVideo {
  id: number;
  uuid: string;
  create_at: string;
  views: number;
  livestream: KickVideoLivestream;
  source: string;
}

export interface KickVideoLivestream {
  id: number;
  slug: string;
  duration: number;
  session_title: string;
  channel: KickVideoChannel;
}

export interface KickVideoChannel {
  id: number;
  slug: string;
  followersCount: number;
  user: KickUser;
}
