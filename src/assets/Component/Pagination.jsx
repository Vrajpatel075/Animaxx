import React from 'react'
import "./Pagination.css"
import { FaAngleLeft,FaAnglesLeft,FaAngleRight,FaAnglesRight } from "react-icons/fa6";


const Pagination = ({limit,totalPosts,page,setPage})=> {
let pages =[];
for( let i = 1; i <= Math.ceil(totalPosts/limit); i++){
    pages.push(i)
}

    return (
    <>
    <ul className='pagination'>
        <li className='pagination_icon'>
            <a href="#" className='pagination_link' onClick={()=>setPage(1)}><FaAnglesLeft/></a>
        </li>
        <li className='pagination_icon'>
            <a href="#" className='pagination_link' onClick={()=>setPage(page>1?page-1:1)}><FaAngleLeft/></a>
        </li>
        {pages.map((p) => (
            <li 
            key={p} 
             className={`pagination_icon ${page == p ? "pagination_icon--active" : ""}`}
            onClick={()=>setPage(p)}>
          <a href="#" className="pagination_link " >{p}</a>
          </li>
        ))}
        <li className='pagination_icon'>
            <a href="#" className='pagination_link' onClick={()=>setPage(page < pages.length ? page + 1 : pages.length)}><FaAngleRight/></a>
        </li>
        <li className='pagination_icon'>
            <a href="#" className='pagination_link' onClick={()=>setPage(pages.length)}><FaAnglesRight/></a>
        </li>
    </ul>
    </>
  )
}

export default Pagination