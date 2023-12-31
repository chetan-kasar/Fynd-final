import React, { useEffect, useRef, useState } from 'react';
import sun from "../Icons/sun.png"
import cloud from "../Icons/cloud.png"
import cloudy from "../Icons/cloudy.png"
import rainy from "../Icons/rainy.png"
import snowy from "../Icons/snowy.png"
import thunder from "../Icons/thunder.png"
import edit from "../Icons/edit.png"
import airplainup from "../Icons/airplaneup.png"
import airplaindown from "../Icons/airplainedown.png"
import popup from "../Icons/popup.png";
import { MapContainer, Marker, Popup, TileLayer, useMapEvent, useMapEvents } from 'react-leaflet';
import { format } from 'date-fns';
import axios from 'axios'; 

const CreateJourney = (props) => { 

  const [showContent, setShowContent] = useState("title");

  const handleClick = (event) => {
    const attribute = event.target.getAttribute("name");
    setShowContent(attribute);
  };
    
    const [weather, setWeather] = useState("Sunny");
    const [weatherImg, setWeatherImg] = useState(sun);
    const [temprature, setTemprature] = useState(21);

    const [title, setTitle] = useState("My Title");

    const [txtContent, setTxtContent] = useState("");

    const [flight, setFlight] = useState({});

    const [latlng, setLatLng] = useState([]);

    let weatherData = {
        weather: weather,
        weatherImg: weatherImg,
        temprature: temprature
      }

    let titleData = {
        title:title,
        titleImage:"",
    }

    let albumData = {
      photos:{},
    } 

    let textContent = {
      content:txtContent
    }

  let userData = {
    username: localStorage.getItem("profile"),
    status:"private",
    weatherData:weatherData,
    titleData:titleData,
    albumData:albumData,
    textContent:textContent,
    flightData:flight,
    dateTime:{},
    mapData:latlng,
  }

  const addJourni = async ()=>{
    userData.weatherData = weatherData;
    userData.titleData = titleData;
    userData.textContent = textContent;
    userData.flightData = flight;
    userData.mapData = latlng;

    const currentDate = new Date();
    const date = currentDate.toDateString(); 
    //const time = currentDate.toTimeString();
    const time = format(currentDate, 'HH:mm:ss a'); 

    userData.dateTime = {date:date, time:time};

    try {
      let response = await axios.post('https://fynd-final-backend.vercel.app/add', {userData});
    } catch (error) {
        console.error('Error sending username:', error);
      }
  }

  const WeatherContent = (props) => {
      
    const addWeatherCard = async (e) => {
        e.preventDefault();
      };

    const weatherClick = (event)=>{
        setWeather(event.target.getAttribute("name"));
        setWeatherImg((event.target.getAttribute("name")).toLowerCase());
        
        if(event.target.getAttribute("name") === "Sunny")
        {
            setWeatherImg(sun);
        }
        else if(event.target.getAttribute("name") === "Cloudy")
        {
            setWeatherImg(cloud);
        }
        else if(event.target.getAttribute("name") === "Partially Cloudy")
        {
            setWeatherImg(cloudy);
        }
        else if(event.target.getAttribute("name") === "Rainy")
        {
            setWeatherImg(rainy);
        }
        else if(event.target.getAttribute("name") === "Thunder")
        {
            setWeatherImg(thunder);
        }
        else
        {
            setWeatherImg(snowy);
        }
        
    }

    const tempUpdate = (event)=>{
        event.preventDefault();
        const num = parseInt(event.target.value);
        setTemprature(num);
    }

    return (
    <>
        <div className='moment-page'>
            <h1 >Set Weather</h1>
            <div className="weathers-ele">
                <img onClick={weatherClick} src={sun} name="Sunny" title='Sunny'/>
                <img onClick={weatherClick} src={cloudy} name="Partially Cloudy" title='Partially Cloudy'/>
                <img onClick={weatherClick} src={cloud} name="Cloudy" title='Cloudy'/>
                <img onClick={weatherClick} src={rainy} name="Rainy" title='Rainy'/>
                <img onClick={weatherClick} src={thunder} name="Thunder" title='Thunder'/>
                <img onClick={weatherClick} src={snowy} name="Snow" title='Snow'/>
            </div>

            <div className="weather">
                <img src={weatherImg} className="dy-weathers-ele"/>
                <h2>{weather}</h2>
            </div>
            <div className="temprature">
                <h2>{temprature} &#8451;</h2>
                <input type="number" id="quantity" value={temprature} onInput={tempUpdate} name="quantity" min="-15" max="60" step="1"></input>
                <img src={edit}/>
            </div>

            <button onClick={addWeatherCard}>save</button>
        </div>
    </>
    )
  };
  
  const FlightContent = () => {
    const [fromInput, setFromInput] = useState("");
    const [toInput, setToInput] = useState("");
    const [departure, setDeparture] = useState("");
    const [destination, setDestination] = useState("");

    const addFlightCard = ()=>{
      setFlight({fromInput:fromInput, toInput:toInput, departure:departure, destination:destination});
    }

    return (
        <>
            <div className='moment-page-flight'>
                <h1>Flight Content</h1>
                <form className='flight'>
            
                <div className='f1'>
                  <img src={airplainup}/>
                  <input className='from' type = 'text' placeholder='Mumbai' onChange={(e)=>{setFromInput(e.target.value)}}></input>
                </div>

                <div className='f1'>
                  <img src={airplaindown}/>
                  <input className='to' type = 'text' placeholder='Pune' onChange={(e)=>{setToInput(e.target.value)}}></input>
                </div>

                <div className='f3'>
                  <label className='f2'>Departure</label>
                  <label className='f2'>Return-From</label>
                  <input className='departure' type = 'date' onChange={(e)=>{setDeparture(e.target.value)}}></input>
                  <input className='destination' type = 'date' onChange={(e)=>{setDestination(e.target.value)}}></input>
                </div>
                </form>
                <button onClick={addFlightCard}>save</button>
            </div> 
        </>
        )
  };

  const AddContent = () => {
    const [content, setContent] = useState("");

    const addContent = ()=>{
      setTxtContent(content);
    }

    return (
        <>
            <div className='moment-page'>
                <h1>Add Content</h1>
                <textarea className="passage-txt" value={content} placeholder="Type......" onChange={(e)=>{setContent(e.target.value)}}></textarea>
                <button type='submit' onClick={addContent}>save</button>
            </div>
        </>
      )
  };

  const PhotoContent = () => {
    const [dispPhotos, setDispPhotos] = useState();

    const photosSelected = (event)=>{
      var reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = ()=>{
          setDispPhotos(reader.result);
      }
    }

    return (
        <>
            <div className='moment-page'>
                <h1>Add Photos</h1>
                <img className="photos" src={dispPhotos} alt=""/>
                <form action='https://fynd-final-backend.vercel.app/album' method='post' name='Endgame' encType='multipart/form-data'>
                  <input type="file" id="" name="photoAlbum" accept="image/*" onChange={photosSelected} multiple></input>
                  <button type='submit'>save</button>
                </form>
            </div>
        </>
        )
  };

  const TitleContent = () => {
    const [localTitle, setLocalTitle] = useState("My Title");
    const [titleImage, setTitleImage] = useState("");
    const [dispImage, setDispImage] = useState(require("../Icons/Travel.jpg"));
    
    const addTitle = async ()=>{
        setTitle(localTitle);
        titleData.title = title;

        const formData = new FormData();
        formData.append('titleImage', titleImage);

        try {
            let response = await axios.post('https://fynd-final-backend.vercel.app/upload', formData,{headers: {"Content-Type": "multipart/form-data"}});
        } catch (error) {
            console.error('Error sending username:', error);
          }
    }

      /*const textareaRef = useRef(null); 
      useEffect(() => {
        // Focus on the textarea element when the component mounts
        if (textareaRef.current) {
          const { value } = textareaRef.current;
          textareaRef.current.focus();
          textareaRef.current.setSelectionRange(value.length, value.length);
        }
      }, []);*/

    const imageSelected = (event)=>{

        setTitleImage(event.target.files[0]);
        
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[0]);
        reader.onload = ()=>{
            setDispImage(reader.result);
        }
    }

    return (
        <>
            <div className='moment-page'>
                <h1>Title Content</h1>
                {/* <textarea ref={textareaRef} className="ftitle-text" rows="5" cols="50" value={title} placeholder="Type......" onChange={handleTitleChange}></textarea> */}
                <input value={localTitle} placeholder="Type......" onChange={(e)=>{ setLocalTitle(e.target.value)}} type='text' className='title-txt'/>
                <br/>
                <label>Select Title Image:</label><br/>
                <img className="tital-img" src={dispImage}/>
                <input type="file" id="imageUpload" name="image" accept="image/*" onChange={imageSelected}></input>
                <button onClick={addTitle}>save</button>
            </div> 
        </>
        )
  };

const Map = ()=>{
    const [localLatLng, setLocalLatLng] = useState([]);
    var L = window.L;
    const center = [22.005565, 79.057514];

    const customIcon = new L.Icon({
      iconUrl: popup,
      iconSize: [40, 40], 
      iconAnchor: [20, 40], 
    });

    const addMapLocations = ()=>{
      setLatLng(localLatLng);
    }

    function MyComponent() {
      const map = useMapEvents({
        click: (e) => {
          const { lat, lng } = e.latlng;
          L.marker([lat, lng], {icon:customIcon}).addTo(map);
          setLocalLatLng([...localLatLng, [lat, lng]]);
          console.log(localLatLng);
        }
      });
    }  

    return (
      <>
      <div className='map-container'>
        <MapContainer center={center} zoom={5} className='map-style'>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MyComponent />
        </MapContainer>
        <button onClick={addMapLocations}>save</button>
      </div>
      </>
    )
  }

  return (
    <div className='top'>
        <div>
            {showContent === "map" && <Map/>}
            {showContent === "weather" && <WeatherContent/>}
            {showContent === 'flight' && <FlightContent />}
            {showContent === 'add' && <AddContent />}
            {showContent === 'photo' && <PhotoContent />}
            {showContent === 'title' && <TitleContent />}
            {showContent === "" && <h1>Select from below</h1>}
        </div>
        <button className='addJourni-btn' onClick={addJourni}>Add Journi</button>
       
        <div className='child-1'>

            <nav>
                <ul>
                    <li>
                    <span onClick={handleClick} name="map">Map</span>
                    </li>
                    <li>
                    <span onClick={handleClick} name="title">Title</span>
                    </li>
                    <li>
                    <span onClick={handleClick} name="weather">Weather Moment</span>
                    </li>
                    <li>
                    <span onClick={handleClick} name="flight">Flight Moment</span>
                    </li>
                    <li>
                    <span onClick={handleClick} name="add">Add Monent</span>
                    </li>
                    <li>
                    <span onClick={handleClick} name="photo">Photo Moment</span>
                    </li>
                </ul>
            </nav>
        </div>

    </div>
  )
}

export default CreateJourney
