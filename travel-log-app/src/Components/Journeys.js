import axios from "axios";
import { useEffect, useReducer, useState } from "react";
import { Link } from "react-router-dom";

const Journeys = (props) => {

  const cardStyle = {
    width: "15rem",
    float: "left",
    marginLeft:"2.5%",
    marginBottom: "2%",
}

  const publicCard = async (cardID)=>{
    try {
      console.log(cardID);
      let response = await axios.post('http://localhost:5000/public-card', {cardID});
  } catch (error) {
      console.error('Error sending card id:', error);
    }
  }

  const deleteCard = async (cardID)=>{
    try {
      console.log(cardID);
      let response = await axios.post('http://localhost:5000/delete-card', {cardID});
  } catch (error) {
      console.error('Error sending card id:', error);
    }
  }

    const[userData, setUserData] = useState([]);
    const username = localStorage.getItem("profile");

    useEffect(() => {
        axios.get(`http://localhost:5000/get?username=${username}`)
          .then(response => {
            setUserData(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

    return (
      <div>
        {
          userData.map((ele, i)=>{
              return (
                  <>
                      <div className="card" style={cardStyle}>
                          <img src= {`data:image/jpeg;base64,${ele.titleData.titleImage}`} className="card-img-top2" alt="..."/>
                          <div className="card-body">
                              <h5 className="card-title">{ele.titleData.title}</h5>
                              <p className="date-time--txt">{ele.dateTime.date}</p>
                              <p className="date-time--txt">{ele.dateTime.time}</p>
                              <Link onClick={()=>{props.cardClick(ele)}} to={"/usercomponent"} className="card-link stretched-link"></Link>                       
                          </div>
                          
                          <li className="nav-item dropdown more">
                            <Link className="nav-link mx-2" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                              <img className="more" src={require("../Icons/more.png")}/>
                            </Link>
                            <ul className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                              <li onClick={()=>{publicCard(ele._id)}}>Public</li>
                              <li onClick={()=>{deleteCard(ele._id)}}>Delete</li>
                            </ul>
                          </li>
                      </div>
                  </>
              )
          })
        }
      </div>
    )
}

export default Journeys
