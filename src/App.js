import React,{useState,useEffect} from "react"; 
import {ImSearch} from "react-icons/im";
import { MdLocalMovies,MdOutlineLocalMovies } from "react-icons/md";
import List from "./List"
import Alert  from "./Alert"
import './App.css';

const getLocalStorage=()=>{
  let list=localStorage.getItem("list");
  if(list){
    return JSON.parse(localStorage.getItem("list"))
  }
  else{
    return []
  }
}
function App() {

  const [name,setName]=useState("");
  const [list,setList]=useState(getLocalStorage());  
  const [alert,setAlert]=useState({show:false,msg:"",typ:""})
  const [movies,setMovies]=useState([]);
  // const [movieName,setMovieName]=useState(null)

  function listadd(){
    if(!name){
      
      setAlert({show:true,msg:"Please enter a movie name",type:"danger" })
    }
    


    else{
      setAlert({show:true,msg:"Item added to list",type:"success"})
      // const newItem={id:new Date().getTime().toString(),title:name};
    
   
      const specificMovie=movies.find((item)=>item.title.toLowerCase()===name.toLowerCase())
      if(specificMovie){
      // setMovieName(specificMovie)
      setList([...list,specificMovie])
      setName("")
      }
      else{
        setAlert({show:true,msg:"Cannot find movie",type:"danger" })
        setName("")


      }
     
      
    
  }
}

  const showAlert = (show = false, type = '', msg = '') => {
    setAlert({ show, type, msg });
  }
 function clearList(){
   setAlert({show:true,msg:"clearing the list",type:"danger"})
   setList([])
 }
function removeItem(id){
  setAlert({show:true,msg:"Item Removed",type:"danger"})
  setList(list.filter((item)=>item.id!==id))
}


useEffect(()=>{
  localStorage.setItem("list",JSON.stringify(list))
},[list])
    


    const fetchMovies=async()=>{
      const mov=[]
      for (let i = 1; i < 1000; i++) {
        
      try{
        const response=await fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=71005cf86c77dc847620529a14a71e4a`);
        if(response.status!==200){
          console.log("error")
        }
        else{
        const movie=await response.json();
        // setMovies([...movies,movie])
        mov.push(movie)
        console.log("updated")
        }
        
        

        
      }
      catch(error){
        console.log(error)
      }
      
    }
    setMovies(mov)
    
    
  }
  useEffect(()=>{
    fetchMovies()
  },[])
  

 
 
 
  return (
  
    <section className="section-center">
    
    <div className="film-form">
      {alert.show && <Alert type={alert.type} msg={alert.msg} removeAlert={showAlert} />}
      <h1>Boots-On-You</h1>
      <div className="form-control">
        <input type="text" className="films" placeholder="eg. Fight Club" value={name}  onChange={(e)=>setName(e.target.value)}/>
        <button type="submit" className="submit-btn" onClick={listadd}>
          <ImSearch />
        </button>
      </div>
    </div>
    
      <div className="film-container">
        <div><List items={list} removeItem={removeItem} /></div>
        <button className="clear-btn" onClick={clearList}>clear items</button>
        
      </div>
     
    </section>
  
  );
}

export default App;
