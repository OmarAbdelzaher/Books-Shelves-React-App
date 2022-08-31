import React from 'react'
import Book from './Book'

import "./Search.css"

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'

import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import debounce from 'lodash.debounce';

import { useState, useCallback } from 'react';

const Search = ({ handleClose, show, handleUpdate}) => {
    
    const [booksList, setBooksList] = useState([]);
    
    async function getBooks(queryString){

        await fetch(`http://openlibrary.org/search.json?q=${queryString}}`)
        .then(response => response.json())
        .then(data => {
            setBooksList(data.docs);
        })
    }

    const changeHandler = event => {
        getBooks(event.target.value);
    };

    const debouncedChangeHandler = useCallback(debounce(changeHandler, 200), []);

    const showHideClassName = show ? "modal display-block" : "modal display-none";

    return (
      <div className={showHideClassName}>
        <section className="modal-main">
            <div className='search-books input-group'>
                <FontAwesomeIcon onClick={handleClose} icon={faArrowLeft} className="back-icon input-group-text"/>
                <input type='text' onChange={debouncedChangeHandler} placeholder='Search by title or author' className="form-control search-input"/>
            </div>
            <Container>
                <Row className='search-books-results'>
                    {
                        booksList.map((book, index) => {
                            return(
                                <Col xs={6} md={4} lg={3}>
                                    <Book book={book} key={index} handleUpdate={handleUpdate}/>
                                </Col>
                            )
                        })
                    }
                </Row>
            </Container>
        </section>
      </div>
    );
  };

export default Search;