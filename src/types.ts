export interface KickSearchUser {
  username: string;
  profilePic: string;
}

export interface KickSearchChannel {
  id: string;
  user_id: string;
  slug: string;
  user: KickSearchUser;
  isLive: boolean;
}

export interface KickSearch {
  channels: KickSearchChannel[];
}

export interface KickUser {
  username: string;
  profile_pic: string;
}

export interface KickChannel {
  id: number;
  slug: string;
  followersCount: number;
  playback_url: string;
  previous_livestreams: KickPreviousLivestream[];
  user: KickUser;
  livestream?: KickLivestream;
}

export interface KickLivestream {
  id: number;
  session_title: string;
  is_live: boolean;
  created_at: string;
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
  user: KickSearchUser;
}
