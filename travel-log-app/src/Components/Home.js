import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import vacation from '../Icons/vacations.png';

const Home = () => {

    const cardStyle = {
        width: "15rem",
        float: "left",
        marginLeft: "2.5%",
        marginBottom: "2%",
    }

    const imgStyle = {
      height: "4%",
      width: "4%",
      marginLeft: "1%",
    }

  return (
    <div>
      <>
        <div className="home-page">
           <h1>Create New Journi <img src={vacation} style={imgStyle}/></h1>
            <div className="card" style={cardStyle}>
                    <img className="card-img-top" src="https://simpleicon.com/wp-content/uploads/plus.svg" className="card-img-top1" alt="..."/>
                    <div className="card-body">
                        <h5 className="card-title">Create New Journi !</h5>
                        <a><Link to={"/createjourney"} className = "card-link stretched-link"></Link></a> 
                    </div>
            </div>
        </div> 
      </>
    </div>
  )
}

export default Home
