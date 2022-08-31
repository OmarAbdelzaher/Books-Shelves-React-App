import React, { useState, useEffect } from 'react'

import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

import Book from '../components/Book';
import Search from '../components/Search';

import Alert from 'react-bootstrap/Alert';
import { useRef } from 'react';

export default function BookShelf() {
    const [currentlyReading, setCurrentlyReading] = useState([]);
    const [wantToRead, setWantToRead] = useState([]);
    const [read, setRead] = useState([]);
    
    const [show, setShow] = useState(false);
    
    const addBtn = useRef(null);

    function showModal (){
        setShow(true);
    };
    
    function hideModal(){
        setShow(false);
    };
    
    useEffect(() => {
        bindevent();
    } , [])

    function bindevent(){
        addBtn.current.addEventListener('click', () => {
            showModal();
        })
    }

    function updateBookShelf(book, shelf){
        if(shelf !== "none"){
            fetch(`https://openlibrary.org${book}.json`)
                .then(res => res.json())
                .then(book => {
                
                    let originalBook = {...book}

                    // originalBook.author_name = book.authors[0]
                    originalBook.cover_i = book.covers ? book.covers[0] : ""

                    let currently_reading = currentlyReading.filter(b => b.key !== book.key)
                    let want_to_read = wantToRead.filter(b => b.key !== book.key);
                    let read_book = read.filter(b => b.key !== book.key);
                    
                    setCurrentlyReading(currently_reading);
                    setWantToRead(want_to_read);
                    setRead(read_book);

                    switch(shelf){
                        case "currentlyReading":
                            setCurrentlyReading([...currentlyReading, originalBook]);
                            break;
                        case "wantToRead":
                            setWantToRead([...wantToRead, originalBook]);
                            break;
                        case "read":
                            setRead([...read, originalBook]);
                            break;
                        default:
                            break;
                    }
                })
        }
        else{
            let currently_reading = currentlyReading.filter(b => b.key !== book);
            let want_to_read = wantToRead.filter(b => b.key !== book);
            let read_book = read.filter(b => b.key !== book);

            setCurrentlyReading(currently_reading);
            setWantToRead(want_to_read);
            setRead(read_book);
        }
    }

    return (
        <>
            <div className='wrapper'>
                <div className='header'>
                    <h1>MyReads</h1>
                </div>
                <div className='shelf'>
                    <div className='currently-reading book-section'>
                        <h2>Currently Reading</h2>
                        <hr/>
                        <Row>
                            {
                                currentlyReading.length > 0 ? 
                                    currentlyReading.map((book, index) => {
                                    return (
                                        <Col xs={12} md={4} lg={3}>
                                            <Book book={book} key={index} handleUpdate={updateBookShelf}/>
                                        </Col>
                                        )
                                    }) : <Alert key="danger" variant="danger">No books in this shelf.</Alert>
                            }
                        </Row>
                    </div>
                    <div className='want-to-read book-section'>
                        <h2>Want to Read</h2>
                        <hr/>
                        <Row>
                            {
                                wantToRead.length > 0 ? 
                                    wantToRead.map((book,index) => {
                                    return(
                                        <Col xs={12} md={4} lg={3}>
                                            <Book book={book} key={index} handleUpdate={updateBookShelf}/>
                                        </Col>
                                    ) 
                                }): <Alert key="danger" variant="danger">No books in this shelf.</Alert>
                            }
                        </Row>
                    </div>
                    <div className='read book-section'>
                        <h2>Read</h2>
                        <hr/>
                        <Row>
                            {
                                read.length > 0 ?
                                    read.map((book,index) => {
                                    return(
                                        <Col xs={12} md={4} lg={3}>
                                            <Book book={book} key={index} handleUpdate={updateBookShelf}/>
                                        </Col>
                                    ) 
                                }) : <Alert key="danger" variant="danger">No books in this shelf.</Alert>
                            }
                        </Row>
                    </div>
                </div>
                <div className='addBtnDiv' ref={addBtn}>+</div>

                <Search show={show} handleClose={hideModal} handleUpdate={updateBookShelf}></Search>
            </div>
        </>
    )
}
