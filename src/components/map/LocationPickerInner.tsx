'use client';
import {useEffect} from 'react';
import {MapContainer,TileLayer,Marker,useMap,useMapEvents} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
type Point={latitude:number;longitude:number};
const icon=L.divIcon({className:'location-marker',html:'<div style="width:24px;height:24px;background:#087ea4;border:3px solid white;border-radius:50%;box-shadow:0 2px 8px #0005"></div>',iconSize:[24,24],iconAnchor:[12,12]});
function Position({value,onChange}:{value:Point;onChange?:(point:Point)=>void}) {
const map=useMap(); useEffect(()=>{map.panTo([value.latitude,value.longitude])},[map,value.latitude,value.longitude]);
useMapEvents({click:e=>onChange?.({latitude:e.latlng.lat,longitude:e.latlng.lng})});
return <Marker position={[value.latitude,value.longitude]} icon={icon} draggable={!!onChange} eventHandlers={{dragend:e=>{const p=e.target.getLatLng();onChange?.({latitude:p.lat,longitude:p.lng})}}}/>;
}
export default function LocationPickerInner({value,onChange}:{value:Point;onChange?:(point:Point)=>void}) {
return <div className="h-60 overflow-hidden rounded-2xl border border-slate-200"><MapContainer center={[value.latitude,value.longitude]} zoom={15} scrollWheelZoom={false}><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/><Position value={value} onChange={onChange}/></MapContainer></div>;
}
