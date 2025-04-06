import { useState, useEffect } from 'react'
import Header from './components/Header'
import Banner from './components/Banner.jsx'
import MovieList from './components/MovieList.jsx'
import MovieSearch from './components/MovieSearch.jsx';
import { MovieProvider } from './context/MovieProvider.jsx';

function App() {

  const [trendingMovies, setTrendingMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [movieSearch, setMovieSearch] = useState([])

  const handleSearch = async (searchVal) => {
    setMovieSearch([])
    try {
      const url = `https://api.themoviedb.org/3/search/movie?query=${searchVal}&include_adult=false&language=vi&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWRkNTgyZDE4M2NlYWU1Yjc5MzgwYWNiZmVmNGE2NCIsIm5iZiI6MTc0MzE0MTMxNC4xMDQsInN1YiI6IjY3ZTYzOWMyNWYzZTBhYzE4ODAwNGJkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ynNDpUfdOmi_kbjUrhFPJIcm2oJzXhs3v1SlvaQVEs`,
        },
      };

      const searchMovie = await fetch(url, options)
      const data = await searchMovie.json();
      setMovieSearch(data.results)
      console.log(data)
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    const fetchMovie = async () => {
      const url_1 = "https://api.themoviedb.org/3/trending/movie/day?language=vi";
      const url_2 = "https://api.themoviedb.org/3/movie/top_rated?language=vi"

      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIwMWRkNTgyZDE4M2NlYWU1Yjc5MzgwYWNiZmVmNGE2NCIsIm5iZiI6MTc0MzE0MTMxNC4xMDQsInN1YiI6IjY3ZTYzOWMyNWYzZTBhYzE4ODAwNGJkNCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.7ynNDpUfdOmi_kbjUrhFPJIcm2oJzXhs3v1SlvaQVEs`,
        },
      };

      const [res_1, res_2] = await Promise.all([
        fetch(url_1, options),
        fetch(url_2, options)
      ])

      const data_1 = await res_1.json();
      const data_2 = await res_2.json();


      setTrendingMovies(data_1.results);
      setTopRatedMovies(data_2.results);
    }

    fetchMovie()
  }, []);

  return (
    <>
      <MovieProvider>
        <div className='bg-black'>
          <Header onSearch={handleSearch} />
          <Banner />
          {movieSearch.length > 0 ?
            (
              <MovieSearch title={`Kết quả tìm kiếm`} data={movieSearch} />
            ) : (
              <>
                <MovieList title={`Phim Hot`} data={trendingMovies} />
                <MovieList title={`Phim đề cử`} data={topRatedMovies} />
              </>
            )
          }
        </div>
      </MovieProvider>
    </>
  )
}

export default App
