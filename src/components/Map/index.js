import React, { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Polyline, Popup } from 'react-leaflet'
import { useSelector } from 'react-redux'
import { iconMarkerPerson } from 'Icons'

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
        
        <Polyline
          positions={shapes} 
        />
        {busPositions.map(pos => (
          <Marker
            key={pos.prefix}
            position={pos.coords}
          >
            <Popup>
              { pos.prefix }
            </Popup>
          </Marker>
        ))}          
          
        <Marker 
          icon={iconMarkerPerson} 
          position={userPosition}
        />
      </MapContainer>
    ) : null}
  </>)
}

export default Map