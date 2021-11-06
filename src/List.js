import React from "react";
import {FaEdit,FaTrash,FaImdb} from "react-icons/fa"
import { SiImdb } from "react-icons/si";

function List({items,removeItem}){
    return(<div className="film-list">
        {items.map((item)=>{return(
            <div className="film-item">
                <p className="title">{item.title}</p>
                <div className="data">
                <div><img className="img" src={`https://image.tmdb.org/t/p/original/${item.poster_path}`}  /></div>
                <div className="film-data">
                <p >{item.overview}</p>
                <div className="film-details">
                <p>Release Date : {item.release_date}</p>
                <p>Runtime : {item.runtime} min</p>
                <p>Language : {item.original_language}</p>
                </div>
                <div className="imdb">
                <FaImdb size="50px"/>
                <p>{item.vote_average}</p>
                </div>
                </div>
                <div >
                
                    
                    
                        <button type="button" className="delete-btn" onClick={()=>removeItem(item.id)}>
                        <FaTrash />

                    </button>
                    </div>
                    </div>
                    <hr className="line" />
              
            </div>
            
        )})}
    </div>)
}



export default List