import React, { Component } from 'react'

import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';

import Book from '../components/Book';
import Search from '../components/Search';

import Alert from 'react-bootstrap/Alert';

export default class BookShelf extends Component {
    constructor(){
        super();
        this.addBtn = React.createRef();

        this.state = {
            shelf : {
                currentlyReading: [],
                wantToRead: [],
                read: [],
            },
            show: false,
        }
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.updateBookShelf = this.updateBookShelf.bind(this);
    }

    showModal = () => {
        this.setState({ show: true });
    };
    
    hideModal = () => {
        this.setState({ show: false });
    };

    componentDidMount(){
        this.bindevent();
    }
     
    bindevent(){
        this.addBtn.current.addEventListener('click', () => {
            this.showModal();
        })
    }

    updateBookShelf(book, shelf){
        if(shelf !== "none"){
            fetch(`https://openlibrary.org${book}.json`).then(res => res.json()).then(book => {
                let originalBook = {...book}

                // originalBook.author_name = book.authors[0]
                originalBook.cover_i = book.covers ? book.covers[0] : ""
            
                this.state.shelf.currentlyReading = this.state.shelf.currentlyReading.filter(b => b.key !== book.key);
                this.state.shelf.wantToRead = this.state.shelf.wantToRead.filter(b => b.key !== book.key);
                this.state.shelf.read = this.state.shelf.read.filter(b => b.key !== book.key);
                
                this.setState({
                    shelf: {
                        ...this.state.shelf,
                        [shelf]: [...this.state.shelf[shelf], originalBook]
                    }
                })
            })
        }
        else{
            this.state.shelf.currentlyReading = this.state.shelf.currentlyReading.filter(b => b.key !== book);
            this.state.shelf.wantToRead = this.state.shelf.wantToRead.filter(b => b.key !== book);
            this.state.shelf.read = this.state.shelf.read.filter(b => b.key !== book);

            this.setState({
                shelf: {
                    ...this.state.shelf,
                }
            })
        }
    }

    render() {
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
                                    this.state.shelf.currentlyReading.length > 0 ? 
                                    this.state.shelf.currentlyReading.map((book, index) => {
                                        return (
                                            <Col xs={12} md={4} lg={3}>
                                                <Book book={book} key={index} handleUpdate={this.updateBookShelf}/>
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
                                    this.state.shelf.wantToRead.length > 0 ? 
                                    this.state.shelf.wantToRead.map((book,index) => {
                                        return(
                                            <Col xs={12} md={4} lg={3}>
                                                <Book book={book} key={index} handleUpdate={this.updateBookShelf}/>
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
                                    this.state.shelf.read.length > 0 ?
                                    this.state.shelf.read.map((book,index) => {
                                        return(
                                            <Col xs={12} md={4} lg={3}>
                                                <Book book={book} key={index} handleUpdate={this.updateBookShelf}/>
                                            </Col>
                                        ) 
                                    }) : <Alert key="danger" variant="danger">No books in this shelf.</Alert>
                                }
                            </Row>
                        </div>
                    </div>
                    <div className='addBtnDiv' ref={this.addBtn}>+</div>

                    <Search show={this.state.show} handleClose={this.hideModal} handleUpdate={this.updateBookShelf}></Search>
                </div>
            </>
        )}
}
