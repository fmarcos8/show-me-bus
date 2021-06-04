import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'

import './style.css'

const Map = () => {
  const [userPosition, setUserPosition] = useState(null)
  const shapes = useSelector(state => state.shapes);
  const busPositions = useSelector(state => state.busPositions)

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const { latitude, longitude } = position.coords
        setUserPosition([latitude, longitude])
      }
    )
  },[])

  return (<>
    {userPosition ? (
      <MapContainer center={userPosition} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <Polyline color="#220bb9" positions={shapes} />
        {busPositions.map(positions => {
          positions.map(pos => console.log(pos))
          // return (
          //   <Marker 
          //     key={position.prefix} 
          //     marker_index={position.prefix}
          //     position={{ lat: position.coords[0], lng: position.coords[1] }}
          //   >
          //     <Popup>
          //       { position.prefix }
          //     </Popup>
          //   </Marker>
          // )
        })}
        <Marker 
          // icon={iconMarkerPerson} 
          position={userPosition}
        >
          <Popup>
            ME
          </Popup>
        </Marker>
      </MapContainer>
    ) : null}
  </>)
}

export default Map