const ApiConstant = {
  //common api
  Login: "api/07890119/auth/freetvlogin/",
  LoginWithMacID: "api/07890119/auth/freetvautologin/",
  otp: 'api/07890119/auth/freetvotplogin/',
  hometabs: 'api/07890119/vods/hometabs/',
  // add's url
  bootupadview: 'api/07890119/advertisement/BootupView/',
  DevotionalView: 'api/07890119/advertisement/DevotionalView/',
  MusicViewAdView: 'api/07890119/advertisement/MusicView/?app_type=FREETVMOB&add_type=Music',
  EducationView: 'api/07890119/advertisement/EducationView/',
  LiveAddView: 'api/07890119/advertisement/LiveAddView/',
  HomeAddView: 'api/07890119/advertisement/HomeAddView/',
  LivePreviewAddView: 'api/07890119/advertisement/LivePreviewAddView/',

  categories: 'api/07890119/livetv/categories/',
  addFavouriteChannel: 'api/07890119/partner/favouriteslist/', // staging server. 
  Ottapp: 'api/07890119/settings/ottapp/', //'api/07890119/settings/favouriteapp/',
  getContinueWatchView: 'api/07890119/livetv/getContinueWatchView/?user=', // all continue channel list
  ContinueWatchView: "api/07890119/livetv/newContinueWatchView2/",
  Cimemacategories: 'api/07890119/vods/categories/',
  SerachMovies: 'api/07890119/vods/moviescatgensearch/',  //  new search api
  SerachCinema: 'api/07890119/vods/cinemacatgensearch/', //  new search api
  moviescategories: 'api/07890119/vods/moviescategories/',
  MovieFilter: 'api/07890119/vods/moviesfilter/',  // 'api/07890119/vods/categoryfilter/',
  CinemaFilter: 'api/07890119/vods/categoryfilter/',
  Music: 'api/07890119/radio/categories/',
  MusicFilter: 'api/07890119/radio/musiccontentfilter/',  //'api/07890119/radio/channels/', 
  SerachMusic: 'api/07890119/radio/musicsearchfilter/', //  new search api
  FreeTvSeries: 'api/07890119/tvserial/category/',
  FreeTvSeriesFilter: 'api/07890119/tvserial/categoryfilter/',
  SearchSeries: 'api/07890119/tvserial/serialtitlefilter/', //  new search api
  FreeTvSeriesEpisode: 'api/07890119/tvserial/episodelist/',
  AppTvCategories: 'api/07890119/livetv/apptvcategories/',
  addFavouriteAppTV: 'api/07890119/partner/apptvfavouriteslist/',
  AppTvFilter: 'api/07890119/livetv/apptvcontent/',
  SerachAppTv: 'api/07890119/livetv/apptvtitlefilter2/',
  EducationCategories: 'api/07890119/education/educationcat/',
  EducationLanguage: 'api/07890119/education/educationlanguage/',
  educationBoard: 'api/07890119/education/educationboard/',
  educationFilter: 'api/07890119/education/educationallcontent/', // api/07890119/education/educationallcontent/4/
  educationEpisode: 'api/07890119/education/subcontent/',
  devotional: 'api/07890119/devotional/categories/',
  devotionalSubCategories: 'api/07890119/devotional/subcategories/',
  devotionallivecontent: 'api/07890119/devotional/devotionalcontent/',
  devotionalSarchivecontent: 'api/07890119/devotional/devotionalarchivecontent/',
  searchDevotional: 'api/07890119/devotional/devotionaltitlefilter/',
  genreCinema: 'api/07890119/vods/cinemagenrefilter1/',
  genereFilter: 'api/07890119/vods/genrefilter/',
  generCinemaFilter: 'api/07890119/vods/cinemagenrefilter/',
  userProfile: 'api/07890119/auth/freetvprofileapi/',
  educational: 'api/07890119/education/categories/',
  educationalSubCategories: 'api/07890119/education/subcategories/',
  searchEducational: 'api/07890119/education/educationtitlefilter/',
  educationallivecontent: 'api/07890119/education/educationcontent/',
  helpVideos: 'api/07890119/settings/helpvideosview/',
  activatepartnerview: 'api/07890119/settings/activatepartnerview/',
  advertismentqrview: 'api/07890119/settings/advertismentqrview/',
  partnerchannellist: 'api/07890119/partner/partnerchannellist11/',
  LiveTVLanguage: 'api/07890119/livetv/channelslanguage/',
  ChannelSearch: 'api/07890119/livetv/channelsearch',
  languageData: 'api/07890119/partner/partnerlanguagesearch/',
  musicLanguage: 'api/07890119/radio/musiclanguage/',
  musicLanguageFilter: 'api/07890119/radio/languagesearch/',
  getfavouriteslist: 'api/07890119/partner/getfavouriteslist3/',
  usercacheclear: 'api/07890119/auth/usercacheclear/',

  
  AppTvCategories: `api/07890119/livetv/apptvcategories/`,  // staging server
  addFavouriteAppTV: `api/07890119/partner/apptvfavouriteslist/`,
  AppTvFilter: `api/07890119/livetv/apptvcontent/`, // steging server
  SerachAppTv: `api/07890119/livetv/apptvtitlefilter2/`,
};
export const SUCCESS = "success";
export const FAILURE = "failure";
export default ApiConstant;
