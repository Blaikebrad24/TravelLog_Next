'use client';

import type { TravelLogWithId } from '@/models/TravelLog/TravelLogs';
import * as React from 'react';
import { MapContainer,TileLayer,Popup, Marker, useMap} from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

import 'leaflet/dist/leaflet.css';


const DefaultIcon = L.icon({
  iconUrl: icon.src,
  shadowUrl: iconShadow.src,
  iconSize: [25,41],
  iconAnchor: [25/2,41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface TravelLogMapProps {
  logs: TravelLogWithId[];
}

const InitMap = ({logs} : TravelLogMapProps) => {
  const map = useMap();
  React.useEffect(() => {
    console.log('invalidating... ->')
    map.invalidateSize();
    const bounds = new L.LatLngBounds(
      logs.map((log) => [
        log.latitude,
        log.longitude,
      ])
    );
    map.fitBounds(bounds);
  }, [map, logs]);
  return null;
};


export default function TravelLogMap({ logs }: TravelLogMapProps) {


  return (
      
          <MapContainer className="w-full h-full">
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <InitMap logs={logs}/>
            {logs.map((log) => (
              <Marker key={log._id.toString()} position={[log.latitude, log.longitude]}>
                <Popup offset={[0, -41]}>
                  <p className='text-lg font-bold'>{log.title}</p>
                  <p>{log.description}</p>
                  <p className='text-sm italic'>{new Date(log.visitDate.toString()).toLocaleDateString()}</p>
                </Popup>
              </Marker>
            ))

            }
          </MapContainer>
     
    // <Map
    //   initialViewState={{
    //     longitude: -122.4,
    //     latitude: 37.8,
    //     zoom: 14,
    //   }}
    //   style={{ width: 400, height: 400 }}
    //   mapStyle="mapbox://styles/mapbox/streets-v9"
    //   mapboxAccessToken="pk.eyJ1IjoiYmxhaWtlYnJhZDI0IiwiYSI6ImNsZW04N3c3YzEyNGgzeXBiNHowZDV1azAifQ.Wtf7kOIEHn2ojknIW_az9A"
    // >
    //   {logs.map((log) => (
    //     <Marker
    //       key={`marker-${log._id}`}
    //       longitude={log.longitude}
    //       latitude={log.latitude}
    //       anchor="bottom"
    //     >
    //       <svg
    //         viewBox="0 0 24 24"
    //         width="24"
    //         height="24"
    //         stroke="currentColor"
    //         strokeWidth="2"
    //         fill="none"
    //         strokeLinecap="round"
    //         strokeLinejoin="round"
    //         className="css-i6dzq1"
    //       >
    //         <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    //         <circle cx="12" cy="10" r="3"></circle>
    //       </svg>
    //     </Marker>
    //   ))}
    // </Map>
  );
}
