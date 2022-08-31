import React, { Component } from 'react'
import "./Book.css"
import DropDown from './DropDown';
import { Link } from 'react-router-dom';

export default class Book extends Component {
    constructor(props){
        super();
        this.state = {
            book: props.book,
        }
    }

    render() {
        return (
            <div className='card' >
                <div className='card-img-top'>
                    <Link to={`/book/${this.state.book.key.split("/")[2]}`}>
                        <img src={ this.state.book.cover_i ? `https://covers.openlibrary.org/b/id/${this.state.book.cover_i}.jpg` : "https://dl.acm.org/specs/products/acm/releasedAssets/images/cover-default--book.svg"} alt={this.state.book.title} className="book-cover"/>    
                    </Link>
                    <DropDown handleUpdate={this.props.handleUpdate} bookId={this.state.book.key}/>
                </div>
                <div className='card-body'>
                    <h6 className='card-text'>{this.state.book.title}</h6>
                    <div className='card-text'>{this.state.book.author_name}</div>
                </div>
            </div>
        )
    }
}
