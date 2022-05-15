import React from 'react'
import { Link } from 'react-router-dom'


const Pagination = ({pageProp,prev,next}) => {

  return (
    <section className="d-flex justify-content-center">
    <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item"><Link className="page-link" to="#" onClick={prev}>Previous</Link></li>
    <li className="page-item"><Link className="page-link" to="#">{pageProp}</Link></li>
    <li className="page-item"><Link className="page-link" to="#" onClick={next}>Next</Link></li>
  </ul>
</nav>
    </section>
  )
}

export default Pagination