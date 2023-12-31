import React from 'react'

const UserContent = (props) => {

  const styleMargin = {
    marginTop:"23px",
  }
  
  const flightStyle = {
    height:"100px",
    width:"100px",
    marginTop:"23px",
  }

  return (
    <div className="userData">
      <div className="child1">

        <div className="child2">
          <div className="heading">Title</div>
          <h1 style={styleMargin}>{props.userData.titleData.title}</h1>
        </div>

        <div className="child2">
          <div className="heading">Weather</div>
          <img src={props.userData.weatherData.weatherImg} style={styleMargin}/>
          <h1>{props.userData.weatherData.weather}</h1>
          <h1>{props.userData.weatherData.temprature} &#8451;</h1>
        </div>

        <div className="child2">
          <div className="heading">Note</div>
          <p className="text-content" style={styleMargin}>{props.userData.textContent.content}</p>
        </div>

        <div className="child3">
          <div className="heading">Flight</div>

          <div className='child3-s1' style={styleMargin}>
            <p className="">{props.userData.flightData.fromInput}</p>
            <p className="">{props.userData.flightData.departure}</p>
          </div>

          <img style={flightStyle} src={require("../Icons/airplane.png")}/>

          <div className='child3-s2' style={styleMargin}>
            <p className="">{props.userData.flightData.toInput}</p>
            <p className="">{props.userData.flightData.destination}</p>
          </div>
        </div>

        <div className="child4">
          <div className="heading">Photos</div>
          {
            props.userData.albumData.photos.map((ele)=>{
              return (<img className="photo-sec" src={`data:image/jpeg;base64,${ele.e}`} style={styleMargin}/>);
            })

          }
        </div>

        <div className='child4'>
          <div className='heading'>Locations</div>
          <MapContainer center={center} zoom={5} className='map-style' style={styleMargin}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {
              props.userData.mapData.map((ele)=>{
                return (
                  <Marker position={ele} icon={customIcon}>
                    <Popup>
                      <div>
                        <h1>My location</h1>
                      </div>
                    </Popup>
                  </Marker>
                )
              })
            }
          </MapContainer>
          </div>
      </div>
    </div>
  )
}

export default UserContent
