// hooks/useHomeData.js
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { fetchAddlaunch } from '../redux/slice/addlaunch';
import { fetchFilterChannels, fetchLiveTvCategories } from '../redux/slice/liveTvCategories';
import { fetchMovies, fetchMoviesCategories, fetchCinema, fetchCinemaCategories, fetchGenreMovieCategories, fetchGenreCinemaCategories } from '../redux/slice/moviesSlice';
import { clearSeriesData, fetchFreeTvSeries, fetchFreeTvSeriesCategories } from '../redux/slice/freeTvSeriesSlice';
import { fetchMusic, fetchMusicCategories, MusicSelector } from '../redux/slice/musicSlice';
import { fetchDevotionalCategories, fetchDevotionallivecontent, fetchDevotionalSubCategories } from '../redux/slice/devotionalSlice';
import { fetchEducationalCategories, fetchEducationalcontent, fetchEducationalSubCategories } from '../redux/slice/educationSlice';
import { setSelectedCategoriesId, setSelectedMusicCategoriesId, setSelectedAppTVCategoriesId, setSelectedSerialCategoriesId } from '../redux/slice/commonAction';
import { fetchAppTv, fetchAppTvCategories } from '../redux/slice/appTvSlice';

export default function useHomeData() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchAddlaunch());
    dispatch(fetchLiveTvCategories()).then((res) => {
      const id = res.payload.data.results[0].id;
      dispatch(fetchFilterChannels({ id, page: 1 }));
    });

    dispatch(fetchCinemaCategories()).then((res) => {
      const id = res.payload.data.results[0].id;
      dispatch(setSelectedCategoriesId(id))
      dispatch(fetchGenreCinemaCategories(id));
      const detail = {
        id: id,
        page: 1
      }
      dispatch(fetchCinema(detail));
    });

    dispatch(fetchMoviesCategories()).then((res) => {
      const id = res.payload.data.results[0].id;
      dispatch(setSelectedCategoriesId(id))
      dispatch(fetchGenreMovieCategories(id));
      const detail = {
        id: id,
        page: 1
      }
      dispatch(fetchMovies(detail))
    });

    dispatch(fetchFreeTvSeriesCategories()).then((res) => {
      dispatch(clearSeriesData())
      const id = res.payload.data.results[0].id
      dispatch(setSelectedSerialCategoriesId(id))
      const data = {
        id,
        page: 1
      }
      dispatch(fetchFreeTvSeries(data))
    })


    dispatch(fetchAppTvCategories()).then((res) => {
      const id = res.payload.data.results[0].id;
      dispatch(setSelectedAppTVCategoriesId(id))
      const detail = {
        id: id,
        page: 1
      }
      dispatch(fetchAppTv(detail));
    });

    dispatch(fetchMusicCategories()).then((res) => {
      const id = res.payload.data.results[0].id;
      dispatch(setSelectedMusicCategoriesId(id))
      const detail = {
        id: id,
        page: 1
      }
      dispatch(fetchMusic(detail));
    });

    dispatch(fetchDevotionalCategories()).then((res) => {
      const id = res.payload.data.results[0].id;
      dispatch(fetchDevotionalSubCategories({ id, page: 1 })).then((res) => {
        const subId = res.payload.data.results[0].id;
        dispatch(fetchDevotionallivecontent({ cid: id, sid: subId, page: 1 }));
      });
    });

    dispatch(fetchEducationalCategories()).then((res) => {
      const id = res.payload.data.results[0].id;
      dispatch(fetchEducationalSubCategories({ id, page: 1 })).then((res) => {
        const subId = res.payload.data.results[0].id;
        dispatch(fetchEducationalcontent({ cid: id, sid: subId, page: 1 }));
      });
    });
  }, [dispatch]);
}
