import L from 'leaflet'
import markerUser from '../assets/images/user-marker.png'
import markerBus from '../assets/images/location-pin.png'

const iconMarkerPerson = new L.Icon({
  iconUrl: markerUser,
  iconRetinaUrl: markerUser,
  className: 'leaflet-marker-icon-user',  
  iconSize: new L.Point(75, 75),
})

const iconMarkerBus = new L.Icon({
  iconUrl: markerBus,
  iconRetinaUrl: markerBus,
  className: 'leaflet-marker-icon',  
  iconSize: new L.Point(60, 75),
})

export { iconMarkerPerson, iconMarkerBus }