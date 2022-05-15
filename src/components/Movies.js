import React,{ useEffect, useState } from 'react'
//import Logo from '../logo.svg'
import Pagination from './Pagination'
import axios from 'axios'
import { Oval } from 'react-loader-spinner'

const Movies = () => {
    const[movies,setMovies] = useState([])
    const[page,setPage]=useState(1);
    const[hover,setHover]=useState('')
    const[favour,setfavour]=useState([])

    let add = (movie) =>{
      let newArray = [...favour,movie]
      setfavour([...newArray])
      console.log(newArray)
      localStorage.setItem("imdb",JSON.stringify(newArray))
    }

    let del = (movie)=>{
      let newArray = favour.filter((m)=> m.id!=movie.id)
      setfavour([...newArray])
      localStorage.setItem("imdb",JSON.stringify(newArray))
    }

    function Next(){
        setPage(page+1);
    }
    function Previous(){
        if(page>1)
        setPage(page-1);
    }
    useEffect(function(){
        axios.get(`https://api.themoviedb.org/3/trending/movie/week?api_key=e8f9a776362c918ca167cfb7e6085722&page=${page}`).then((res)=> {
          setMovies(res.data.results);
      let oldFav= localStorage.getItem("imbd");
      oldFav= JSON.parse(oldFav) || []
      setfavour([...oldFav])
    })
      },[page])
  
    return (
    <>
    <section>
      <div className='fw-bold text-center my-4'><h3>Trending movies</h3><hr className='w-50 mx-auto' /></div>
      {
          movies.length === 0 ?
         <div className='oval'><Oval height="100" width="100" color="gray" ariaLabel="loading" /></div> 
      :
      <div className='d-flex justify-content row'>
          {
              movies.map((movie)=>(
                <div className='col-md-3 col-sm-6'>
                <div class="card mb-3 mx-1 rounded-3"
                onMouseEnter={()=> {setHover(movie.id)}} onMouseLeave={()=> {setHover('')}}>
                  {
                    hover == movie.id && <>

                <div className='mt-1 text-white icon'>
                    {
                          !favour.find((m)=> m.id == movie.id) ? 
                    <i className="fa fa-heart p-1" style={{color:'red'}} onClick={()=> add(movie)}></i> :
                    <i className="fa fa-close p-1" onClick={()=> del(movie)}></i>

                  }
                  </div>
                    </>
                   
                  }
                <img src={`https://image.tmdb.org/t/p/w500/${movie.backdrop_path}`} className="card-img-top" alt="..." height='180px' />
                {/*<div className='d-flex position-absolute mt-2 ml-2 flex-row-reverse text-white'>
                <i className="fa fa-close"></i>&nbsp;
                <i class="fa fa-heart"></i>
                </div>*/}
                 <div className="card-body bg-dark text-light rounded-bottom ">
                  <h5 className="card-title text-center fon">{movie.title.substring(0,33)}</h5>
                  </div> 
                    </div>
                  </div>
              ))
          }
      </div>
    }
    </section>
   <Pagination pageProp={page} prev={Previous} next={Next} /> 
    </>
  )
}

export default Movies