import React,{ useEffect, useState } from 'react'
import axios from 'axios'

const Banner = () => {
  const[movies,setMovies] = useState([])
    useEffect(function(){
        axios.get("https://api.themoviedb.org/3/trending/movie/week?api_key=e8f9a776362c918ca167cfb7e6085722").then((res)=> setMovies(res.data.results[0]))
    },[])

  return (
    <section className='hero mt-5'>
   <div className="card text-white">
  <div><img src={`https://image.tmdb.org/t/p/w500/${movies.backdrop_path}`} className="card-img" alt="background" height="450px" /></div>
  <div className="card-img-overlay d-flex flex-column-reverse">
    <h5 className="card-title text-center fw-bold">{movies.title}</h5>
  </div>
</div> 
</section>
  )
}

export default Banner