import { KickChannel, KickSearch, KickVideo } from "./types";

const searchChannels = async (
  request: SearchRequest
): Promise<SearchChannelResult> => {
  const url = "https://kick.com/api/search";
  const urlWithQuery = `${url}?searched_word=${request.query}`;
  const response = await application.networkRequest(urlWithQuery);
  const json: KickSearch = await response.json();
  const channels = json.channels.map(
    (c): Channel => ({
      name: c.user.username,
      apiId: c.slug,
      images: [{ url: c.user.profilePic }],
      isLive: c.isLive,
    })
  );

  return {
    items: channels,
  };
};

const getChannelVideos = async (
  request: ChannelVideosRequest
): Promise<ChannelVideosResult> => {
  const url = `https://kick.com/api/v1/channels/${request.apiId}`;
  const response = await application.networkRequest(url);
  const json: KickChannel = await response.json();
  const videos = json.previous_livestreams.map(
    (p): Video => ({
      apiId: p.video.uuid,
      title: p.session_title,
      duration: p.duration / 1000,
      images: [{ url: p.thumbnail.src }],
      views: p.views,
      channelName: json.user.username,
      channelApiId: json.slug,
      uploadDate: p.created_at,
    })
  );

  return {
    items: videos,
    channel: {
      name: json.user.username,
      images: [{ url: json.user.profile_pic }],
      apiId: json.slug,
    },
    isLive: json.livestream?.is_live,
  };
};

const getVideo = async (request: GetVideoRequest): Promise<Video> => {
  const url = `https://kick.com/api/v1/video/${request.apiId}`;
  const response = await application.networkRequest(url);
  const json: KickVideo = await response.json();

  return {
    title: json.livestream.session_title,
    sources: [
      {
        source: json.source,
        type: "application/x-mpegURL",
      },
    ],
    channelName: json.livestream.channel.user.username,
    channelApiId: json.livestream.channel.slug,
  };
};

const getLiveVideo = async (request: GetLiveVideoRequest): Promise<Video> => {
  const url = `https://kick.com/api/v1/channels/${request.channelApiId}`;
  const response = await application.networkRequest(url);
  const json: KickChannel = await response.json();

  return {
    channelName: json.user.username,
    channelApiId: json.slug,
    title: json.livestream?.session_title || "",
    sources: [
      {
        source: json.playback_url,
        type: "application/x-mpegURL",
      },
    ],
  };
};

const getUserChannels = async (
  request: UserChannelRequest
): Promise<SearchChannelResult> => {
  const url = "https://kick.com/api/v2/channels/followed?cursor=0";
  const response = await application.networkRequest(url);
  console.log(response);
  const json = await response.json();
  console.log(json);
  return {
    items: [],
  };
};

const searchAll = async (request: SearchRequest): Promise<SearchAllResult> => {
  const channelsPromise = searchChannels(request);
  const [channels] = await Promise.all([channelsPromise]);
  return { channels };
};

application.onSearchAll = searchAll;
application.onSearchChannels = searchChannels;
application.onGetChannelVideos = getChannelVideos;
application.onGetVideo = getVideo;
application.onGetLiveVideo = getLiveVideo;

const init = async () => {
  const isLoggedIn = await application.isLoggedIn();
  console.log(isLoggedIn);
  if (isLoggedIn) {
    application.onGetUserChannels = getUserChannels;
  }
};

application.onPostLogin = init;
init();
