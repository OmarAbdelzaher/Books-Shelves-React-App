import React from 'react'
import DropDown from './DropDown';
import { Link } from 'react-router-dom';
import "./Book.css"

export default function Book(props) {    
    return (
        <div className='card'>
        <div className='card-img-top'>
            <Link to={`/book/${ props.book.key.split("/")[2] }`}>
                <img src={ props.book.cover_i ? `https://covers.openlibrary.org/b/id/${props.book.cover_i}.jpg` : "https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg"} alt={props.book.title} className="book-cover"/>    
            </Link>
            <DropDown handleUpdate={props.handleUpdate} bookId={props.book}/>
        </div>
        <div className='card-body'>
            <h6 className='card-text'>{props.book.title}</h6>
            <div className='card-text'>{props.book.author_name}</div>
        </div>
    </div>
  )
}
