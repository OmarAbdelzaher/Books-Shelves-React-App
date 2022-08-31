import React, { useState, useEffect } from 'react'

import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

import Book from '../components/Book';
import Search from '../components/Search';

import Alert from 'react-bootstrap/Alert';
import { useRef } from 'react';

export default function BookShelf() {
    const [currentlyReading, setCurrentlyReading] = useState(JSON.parse(localStorage.getItem('currentlyReading')));
    const [wantToRead, setWantToRead] = useState(JSON.parse(localStorage.getItem('wantToRead')));
    const [read, setRead] = useState(JSON.parse(localStorage.getItem('read')));
    
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
    
    // Local Storage

    useEffect(() => {
        localStorage.setItem('currentlyReading', JSON.stringify(currentlyReading));
        localStorage.setItem('wantToRead', JSON.stringify(wantToRead));
        localStorage.setItem('read', JSON.stringify(read));
    }, [currentlyReading, wantToRead, read])


    function filterShelves(bookId){
        setCurrentlyReading(currentlyReading.filter((book) => book.key !== bookId))
        setWantToRead(wantToRead.filter((book) => book.key !== bookId))
        setRead(read.filter((book) => book.key !== bookId))
    }

    function updateBookShelf(book, shelf){
        if(shelf !== "none"){
            if(shelf === "currentlyReading"){
                filterShelves(book.key)
                setCurrentlyReading([...currentlyReading.filter((b) => b.key !== book.key), book])
            }
            if(shelf === "wantToRead"){
                filterShelves(book.key)
                setWantToRead([...wantToRead.filter((b) => b.key !== book.key), book])
            }
            if(shelf === "read"){
                filterShelves(book.key)
                setRead([...read.filter((b) => b.key !== book.key), book])
            }
        }
        else{
            filterShelves(book.key)
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
