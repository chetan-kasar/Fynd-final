import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { Link } from 'react-router-dom';
const PublicCards = (props) => {

    const cardStyle = {
        width: "15rem",
        float: "left",
        marginLeft:"2.5%",
        marginBottom: "2%",
        marginTop: "2%",
    }

    const [publicData, setPublicData] = useState([]);
    
    useEffect(() => {
        axios.get("https://fynd-final-backend.vercel.app/access-public-cards")
          .then(response => {
            setPublicData(response.data);
          })
          .catch(error => {
            console.log(error);
          });
      }, []);

      console.log("Data : ", publicData);

  return (
    <div>
        {
            publicData.map((ele, i)=>{
                return (
                      <>
                        <div className="card" style={cardStyle}>
                                <img src= {`data:image/jpeg;base64,${ele.titleData.titleImage}`} className="card-img-top2" alt="..."/>
                                <div className="card-body">
                                    <h5 className="card-title">{ele.titleData.title}</h5>
                                    <img className="card-profile" src={require("../Icons/card-profile.png")}/>
                                    <p className="card-username">{ele.username}</p>
                                    <p className="date-time--txt">{ele.dateTime.date}</p>
                                    <p className="date-time--txt">{ele.dateTime.time}</p>
                                    <Link onClick={()=>{props.cardClick(ele)}} to={"/usercomponent"} className="card-link stretched-link"></Link>                       
                              </div>
                        </div>
                  </>
              )
          })
        }
    </div>
  )
}

export default PublicCards;
