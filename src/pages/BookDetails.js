import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "./BookDetails.css"

export default function BookDetails () {
    const [book, setBook] = useState({})
    let params = useParams();

    useEffect(() => {
        fetch(`https://openlibrary.org/works/${params.id}.json`)
            .then(res => res.json())
            .then(book => {
                book.cover_i = book.covers ? book.covers[0] : ""
                setBook(book)
        })
    } , [])

    return (
        <div className="book-details">
            <div className="book-cover-2">
                <img src={ book.cover_i ? `https://covers.openlibrary.org/b/id/${book.cover_i}.jpg` : "https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg"} alt={book.title} className="book-cover"/>
            </div>
            <div className="book-info">
               <h1>{book.title}</h1>
                {/* <h2>{book.author_name}</h2> */}
                {/* <h3>{book.publish_date}</h3> */}
                {/* <p>{book.description}</p> */}
            </div>
        </div>
        );
}

