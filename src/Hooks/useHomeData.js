// hooks/useHomeData.js
import { useEffect } from 'react';
import { useAppDispatch } from '../redux/hooks';
import { AddlaunchSelector, fetchAddlaunch } from '../redux/slice/addlaunch';
import { CategoriesSelector, fetchFilterChannels, fetchLiveTvCategories } from '../redux/slice/liveTvCategories';
import { fetchCinema, fetchCinemaCategories, fetchGenreCinemaCategories, MoviesSelector } from '../redux/slice/moviesSlice';
import { fetchMovies, fetchMoviesCategories, fetchGenreCategories, MoviesSelectors } from '../redux/slice/moviesSlice';
import { fetchFreeTvSeries, fetchFreeTvSeriesCategories, fetchGenreCategories, FreeTvSeriesSelector } from '../redux/slice/freeTvSeriesSlice';
import { fetchMusic, fetchMusicCategories, MusicSelector } from '../redux/slice/musicSlice';
import { DevotionalSelector, fetchDevotionalCategories, fetchDevotionallivecontent, fetchDevotionalSubCategories } from '../redux/slice/devotionalSlice';
import { EducationSelector, fetchEducationalCategories, fetchEducationalcontent, fetchEducationalSubCategories } from '../redux/slice/educationSlice';
import { setSelectedCategoriesId, setSelectedMusicCategoriesId, selectedAppTVCategoriesId, setSelectedAppTVCategoriesId } from '../redux/slice/commonAction';
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
      // dispatch(fetchGenreCategories(id));
      const detail = {
            id: id,
            page: 1
        }
      dispatch(fetchMovies(detail))
    });

    dispatch(fetchFreeTvSeries()).then((res) => {
      const id = res.payload.data.results[0].id;
      dispatch(setSelectedCategoriesId(id))
      // dispatch(fetchGenreCategories(id));
      const detail = {
            id: id,
            page: 1
        }
      dispatch(fetchFreeTvSeries(detail))
    });


      dispatch(fetchAppTvCategories()).then((res) => {
      const id = res.payload.data.results[0].id;
      console.log('object===================id=========:', id);

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
