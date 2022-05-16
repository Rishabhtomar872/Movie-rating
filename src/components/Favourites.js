import React, { useEffect, useState } from 'react'
import Pagination from './Pagination'

const Favourites = () => {
  let genreids = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation', 35: 'Comedy', 80: 'Crime', 99: 'Documentary', 18: 'Drama', 10751: 'Family', 14: 'Fantasy', 36: 'History',
    27: 'Horror', 10402: 'Music', 9648: 'Mystery', 10749: 'Romance', 878: 'Sci-Fi', 10770: 'TV', 53: 'Thriller', 10752: 'War', 37: 'Western'
  }

  const [curGenre, setCurGenre] = useState('All Genres');
  const[favour,setfavour]=useState([]);
  const[genre,setgenre]=useState([]);
  const [rating, setRating] = useState(0)
  const [popularity, setPopularity] = useState(0)
  const [search, setSearch] = useState("")
  const [rows, setRows] = useState(5)
  const [curPage, setCurPage] = useState(1)

  useEffect(()=>{
    let oldFav= localStorage.getItem("imdb");
      oldFav= JSON.parse(oldFav) || []
      setfavour([...oldFav])
  },[])
//genre
useEffect(()=>{
  let temp = favour.map((movie)=> genreids[movie.genre_ids[0]])
  console.log(temp)
  temp = new Set(temp)
  setgenre(['All Genres',...temp])
},[favour])

  let del = (movie)=>{
    let newArray = favour.filter((m)=> m.id!=movie.id)
    setfavour([...newArray])
    localStorage.setItem("imdb",JSON.stringify(newArray))
  }

  let filteredMovies = []

  filteredMovies = curGenre == "All Genres" ? favour : favour.filter((movie) => genreids[movie.genre_ids[0]] == curGenre)

  if (rating == 1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objA.vote_average - objB.vote_average
    })
  } else if (rating == -1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objB.vote_average - objA.vote_average
    })
  }

  if (popularity == 1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objA.popularity - objB.popularity
    })
  } else if (popularity == -1) {
    filteredMovies = filteredMovies.sort(function (objA, objB) {
      return objB.popularity - objA.popularity
    })
  }

  filteredMovies = filteredMovies.filter((movie) =>
    movie.title.toLowerCase().includes(search.toLowerCase())
  )

  let maxPage = Math.ceil(filteredMovies.length / rows);
  let si = (curPage - 1) * rows
  let ei = Number(si) + Number(rows)

  filteredMovies = filteredMovies.slice(si, ei);

  let goBack = () => {
    if (curPage > 1) {
      setCurPage(curPage - 1)
    }
  }

  let goAhead = () => {
    if (curPage < maxPage) {
      setCurPage(curPage + 1)
    }
  }

  return (
    <>
    <div className='mt-5'>
      <div className='mt-2 py-4 d-flex justify-content-center'>
      {
            genre.map((genre)=>

            <button type="button" className={curGenre == genre ? 'btn btn-info mx-1 rounded-pill' : 'btn btn-primary rounded-pill mx-1' } onClick={() => {
              setCurGenre(genre); setCurPage(1)
            }}>{genre}</button>
            )
      }

    {/*<button type="button" className="btn btn-primary mx-1">Action</button>
    <button type="button" className="btn btn-primary mx-1">Drama</button>
    <button type="button" className="btn btn-primary mx-1">Animation</button>
    <button type="button" className="btn btn-primary mx-1">Sci-Fi</button>*/}
    </div>
    <div className=' d-flex flex-row justify-content-center'>
      <input type="text" value={search} onChange={(e)=> setSearch(e.target.value)} placeholder='search' className='mx-1' />
      <input type="number" value={rows} onChange={(e)=> setRows(e.target.value)} placeholder='rows' className="mx-1" />
    </div>
    <div className='my-3 table-responsive'>
    <table className="table">
  <thead className='bg-light'>
    <tr>
      <th scope="col">Name</th>
      <th scope="col"><i className='fa fa-arrow-circle-o-up px-1 p mx-1' onClick={()=>{ setRating(-1); setPopularity(0)}}></i>Rating<i className='fa fa-arrow-circle-o-down mx-1' onClick={()=>{ setRating(1); setPopularity(0)}}></i></th>
      <th scope="col"><i className='fa fa-arrow-circle-o-up mx-1' onClick={()=>{ setPopularity(-1); setRating(0)}}></i>Popularity<i className='fa fa-arrow-circle-o-down mx-1' onClick={()=>{ setPopularity(1); setRating(0)}}></i></th>
      <th scope="col">Genres</th>
      <th scope="col">Remove</th>
    </tr>
  </thead>
  <tbody>
    {filteredMovies.map((movie)=>(

    <tr key={movie.id}>
      <th scope="row" className='py-4'><img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} height='100px' width='150px' className='p-1'/>{movie.title}</th>
      <td className='px-5 py-5'>{movie.vote_average}</td>
      <td className='px-4 py-5'>{movie.popularity}</td>
      <td className='py-5'><span className='rounded-pill bg-info p-1 text-white gen'>{genreids[movie.genre_ids[0]]}</span></td>
      <td className='py-4'>
        <button type='submit' className='bg-danger text-white rounded-pill my-3 p-1' onClick={()=> del(movie)}>Delete</button>
      </td>
    </tr>
    ))}
  </tbody>
</table>
    </div>
    <div className='mt-3'>
      <Pagination pageProp={curPage} prev={goBack} next={goAhead} />
    </div>
    </div>
    </>
  )
}

export default Favourites
