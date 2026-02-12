import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';
import { Request } from '../../services';
import ApiConstant from '../../utils/apiConstant';

const initialState = {
  cinemaCategoriesData: null,
  moviesCategoriesData: null,
  movieData: [],
  moviePage: 1,
  movieCount: 0,
  totalMovieCount: 0,
  movieNextPage: true,
  searchMovieData: [],
  searchMovieCount: 0,
  searchMoviePage: 1,
  totalSearchMovieCount: 1,
  searchMovieNextPage: true,
  cinemaData: [],
  cinemaPage: 1,
  cinemaCount: 0,
  totalCinemaCount: 0,
  cinemaNextPage: true,
  selectedCategoriesId: null,
  searchCinemaData: [],
  searchCinemaPage: 1,
  SearchCinemaCount: 0,
  totalSearchCinemaCount: 1,
  searchCinemaNextPage: true,
  genreCategories: [],
  loading: 'idle',
  error: null,
};

export const fetchCinemaCategories = createAsyncThunk('CineemaCategoriesSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.Cimemacategories);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
},);

export const fetchMoviesCategories = createAsyncThunk('MoviesCategoriesSlice', async (_, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.moviescategories);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
},);

export const fetchGenreCinemaCategories = createAsyncThunk('GenreCategoriesSlice', async (id, thunkAPI) => {
  try {
    const response = await Request.get(ApiConstant.genreCinema + id);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
},);

export const fetchGenreCategoriesData = createAsyncThunk('GenreCategoryDataSlice', async (detail, thunkAPI) => {
  const { id, page } = detail
  try {
    const response = await Request.get(`${ApiConstant.genereFilter + id}?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
},);

export const fetchGenreCinemaCategoriesData = createAsyncThunk('GenreCinemaCategoryDataSlice', async (detail, thunkAPI) => {
  const { cid, gid, page } = detail
  try {
    // const response = await Request.get(`${ApiConstant.generCinemaFilter}${cid}/${gid}?page=${page}`);
    const response = await Request.get(`${ApiConstant.SerachCinema}/${cid}/${gid}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
},);

export const fetchMovies = createAsyncThunk('MoviesSlice', async (detail, thunkAPI) => {
  const { id, page } = detail
  try {
    // const response = await Request.get(`${ApiConstant.MovieFilter + id}?page=${page}`);
    const response = await Request.get(`${ApiConstant.MovieFilter + id}?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
},);


export const fetchCinema = createAsyncThunk('CinemaSlice', async (detail, thunkAPI) => {
  const { id, page } = detail
  try {
    const response = await Request.get(`${ApiConstant.CinemaFilter}${id}/?page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
});

export const fetchSearchMovies = createAsyncThunk('SearchMoviesSlice', async (detail, thunkAPI) => {
  const { name, page } = detail
  try {
    const response = await Request.get(ApiConstant.SerachMovies + name);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
},
);

export const fetchSearchCinema = createAsyncThunk('SearchCinemaSlice', async (detail, thunkAPI) => {
  const { name, page, cid, gid } = detail
  try {
    const response = await Request.get(`${ApiConstant.SerachCinema}${cid}/${gid}/?title=${name}&page=${page}`);
    return { data: response };
  } catch (error) {
    return thunkAPI.rejectWithValue('failed');
  }
},
);

export const onMoviesSlice = createSlice({
  name: 'MovieSlice',
  initialState,
  reducers: {
    MoviesAction(state, action) {
      state.cinemaCategoriesData = action?.payload;
    },
    clearMoviesData(state) {
      state.movieData = [];
      state.moviePage = 1;
      state.movieCount = 0;
      state.totalMovieCount = 0;
      state.movieNextPage = true;
    },
    clearCinemaData(state) {
      state.cinemaData = [];
      state.cinemaPage = 1;
      state.cinemaCount = 0;
      state.totalCinemaCount = 0;
      state.cinemaNextPage = true;
    },
    clearSearchMoviesData(state) {
      state.searchMovieData = [];
      state.searchMovieCount = 0
    },
    clearSearchData(state) {
      state.searchCinemaData = [],
        state.searchCinemaPage = 1,
        state.SearchCinemaCount = 0,
        state.totalSearchCinemaCount = 1,
        state.searchCinemaNextPage = true
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCinemaCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCinemaCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const movie = action.payload?.data;
        state.cinemaCategoriesData = movie.results;
      })
      .addCase(fetchCinemaCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })

      .addCase(fetchMoviesCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMoviesCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const movie = action.payload?.data;
        state.moviesCategoriesData = movie.results;
      })
      .addCase(fetchMoviesCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })

      .addCase(fetchGenreCinemaCategories.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchGenreCinemaCategories.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const movie = action.payload?.data;
        state.genreCategories = movie.results;
      })
      .addCase(fetchGenreCinemaCategories.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })

      .addCase(fetchGenreCategoriesData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchGenreCategoriesData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        //   const movieList = action.payload?.data;
        //   state.movieCount = movieList.count
        //   state.totalMovieCount = movieList.movies_total_count
        //   // state.movieData = [...state.movieData, ...movieList.results];
        //   state.movieData = movieList.results;

        //   // state.moviePage = movieList.current_page_number + 1;
        //   if (!movieList.next) {
        //     state.movieNextPage = false
        //   }
        // })

        const movieList = action.payload?.data;
        state.movieCount = movieList.count
        state.totalMovieCount = movieList.movies_total_count
        state.movieData = [...state.movieData, ...movieList.results];
        state.moviePage = movieList.current_page_number + 1;
        if (!movieList.next) {
          state.movieNextPage = false
        }
      })
      .addCase(fetchGenreCategoriesData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })

      .addCase(fetchGenreCinemaCategoriesData.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchGenreCinemaCategoriesData.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const cinemaList = action.payload?.data;
        state.cinemaCount = cinemaList.count
        state.totalCinemaCount = cinemaList.cinema_total_count
        // state.cinemaData = [...state.cinemaData, ...cinemaList.results];
        state.cinemaData = cinemaList.results;

        state.cinemaPage = cinemaList.current_page_number + 1;
        if (!cinemaList.next) {
          state.cinemaNextPage = false
        }
      })
      .addCase(fetchGenreCinemaCategoriesData.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })


      .addCase(fetchMovies.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchMovies.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        // const movieList = action.payload?.data;
        // state.movieCount = movieList.count
        // state.totalMovieCount = movieList.movies_total_count
        // // state.movieData = [...state.movieData, ...movieList.results];
        // state.movieData = movieList.results;

        // // state.moviePage = movieList.current_page_number + 1;
        // if (!movieList.next) {
        //   state.movieNextPage = false
        // }
        const movieList = action.payload?.data;
        state.movieCount = movieList.count
        state.totalMovieCount = movieList.movies_total_count
        state.movieData = [...state.movieData, ...movieList.results];
        state.moviePage = movieList.current_page_number + 1;
        if (!movieList.next) {
          state.movieNextPage = false
        }
      })


      // })
      .addCase(fetchMovies.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })


      .addCase(fetchCinema.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchCinema.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const cinemaList = action.payload?.data;
        state.cinemaCount = cinemaList.count
        state.totalCinemaCount = cinemaList.cinema_total_count
        state.cinemaData = [...state.cinemaData, ...cinemaList.results];
        // state.cinemaData = cinemaList.results;

        state.cinemaPage = cinemaList.current_page_number + 1;
        if (!cinemaList.next) {
          state.cinemaNextPage = false
        }
      })
      .addCase(fetchCinema.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })


      .addCase(fetchSearchMovies.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSearchMovies.fulfilled, (state, action) => {
        state.loading = 'succeeded';
        const searchMovieList = action.payload?.data;
        if (!searchMovieList) return;

        state.searchMovieCount = searchMovieList.count;
        state.totalMovieCount = searchMovieList.cinema_total_count;
        state.searchMoviePage = searchMovieList.current_page_number + 1;
        state.searchMovieNextPage = !!searchMovieList.next;

        if (searchMovieList.current_page_number === 1) {
          // First page, replace data
          state.searchMovieData = searchMovieList.results;
        } else {
          // Next pages, append data
          state.searchMovieData = [...state.searchCinemaData, ...searchMovieList.results];
        }
      })
      // state.searchMovieCount = movieList.count
      // state.searchMovieData = movieList.results;
      // })
      .addCase(fetchSearchMovies.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })


      .addCase(fetchSearchCinema.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchSearchCinema.fulfilled, (state, action) => {
        state.loading = 'succeeded';

        const searchCinemaList = action.payload?.data;

        if (!searchCinemaList) return;

        state.SearchCinemaCount = searchCinemaList.count;
        state.totalCinemaCount = searchCinemaList.cinema_total_count;
        state.searchCinemaPage = searchCinemaList.current_page_number + 1;
        state.searchCinemaNextPage = !!searchCinemaList.next;

        if (searchCinemaList.current_page_number === 1) {
          // First page, replace data
          state.searchCinemaData = searchCinemaList.results;
        } else {
          // Next pages, append data
          state.searchCinemaData = [...state.searchCinemaData, ...searchCinemaList.results];
        }
      })
      .addCase(fetchSearchCinema.rejected, (state, action) => {
        state.loading = 'failed';
        state.error = action.error.message ?? 'Login failed';
      })
  },
});


export const { MoviesAction, clearMoviesData, clearSearchMoviesData, clearCinemaData } = onMoviesSlice.actions;
export const MoviesSelector = ((state) => state.MoviesReducer)
export default onMoviesSlice.reducer;
