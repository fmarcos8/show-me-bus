import L from 'leaflet'
import markerPerson from '../assets/images/map-marker.png'
import markerBus from '../assets/images/bus.png'

const iconConfig = {  
  iconAnchor: null,
  popupAnchor: null,
  shadowUrl: null,
  shadowSize: null,
  shadowAnchor: null,
}

const iconMarkerPerson = new L.Icon({
  iconUrl: markerPerson,
  iconRetinaUrl: markerPerson,
  className: 'leaflet-marker-icon'
})

const iconMarkerBus = new L.Icon({
  iconUrl: markerBus,
  iconRetinaUrl: markerBus,
  className: 'leaflet-marker-icon'
})

export { iconMarkerPerson, iconMarkerBus }