import "./DropDown.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import { useRef } from "react"

export default function DropDown({handleUpdate, bookId}) {
    
    const myDropDown = useRef(null);

    function handleMenuClick() {
        myDropDown.current.classList.toggle("show");
    }

    function handleSelection(target){
        myDropDown.current.classList.remove("show");
        
        if(target.innerText === "Currently Reading"){
            handleUpdate(bookId, "currentlyReading");
        }
        if(target.innerText === "Want to Read"){
            handleUpdate(bookId, "wantToRead");
        }
        if(target.innerText === "Read"){
            handleUpdate(bookId, "read");
        }

        if(target.innerText === "None"){
            handleUpdate(bookId, "none");
        }
    }
    
    // Close the dropdown menu if the user clicks outside of it
    window.onclick = function(event) {
        if (!event.target.matches('.dropbtn') && event.target.nodeName !== "path" && event.target.nodeName !== "svg") {
            var dropdowns = document.getElementsByClassName("dropdown-content");
            for (let i = 0; i < dropdowns.length; i++) {
                var openDropdown = dropdowns[i];
                if (openDropdown.classList.contains('show')) {
                    openDropdown.classList.remove('show');
                }
            }
        }
    }

    return (
        <div className="dropdown">
            <div className="dropbtn" onClick={(e) => handleMenuClick(e.target)}>
                <FontAwesomeIcon icon={faCaretDown} className="caret-down"/>
            </div>
            <div id="myDropdown" className="dropdown-content" ref={myDropDown}>
                {
                    ["Currently Reading", "Want to Read", "Read", "None"].map((item,index) => {
                        return (
                            <span key={index} value={item} onClick={(e) => handleSelection(e.target)}>{item}</span>
                        )
                    })
                }
            </div>
        </div>
    )
}
