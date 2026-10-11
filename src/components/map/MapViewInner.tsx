'use client';
import {useEffect} from 'react';
import {MapContainer,TileLayer,Marker,useMap} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import {Occurrence,OccurrenceType} from '@/types/occurrence';
const colors:Record<OccurrenceType,string>={water_outage:'#f59e0b',leak:'#ef4444',water_quality:'#8b5cf6',infrastructure:'#087ea4',other:'#64748b'};
function Recenter({center}:{center?:[number,number]}){const map=useMap();useEffect(()=>{if(center)map.setView(center,15)},[map,center]);return null}
export default function MapViewInner({items,onSelect,center}:{items:Occurrence[];onSelect:(o:Occurrence)=>void;center?:[number,number]}){return <MapContainer center={[-10.9472,-37.0731]} zoom={13} zoomControl={false} scrollWheelZoom className="h-full w-full"><TileLayer attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>' url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/><Recenter center={center}/>{items.map(o=><Marker key={o.id} title={o.title+' - '+o.neighborhood} position={[o.latitude,o.longitude]} icon={L.divIcon({className:'custom-marker',html:'<div style="background:'+colors[o.type]+';border:3px solid white;box-shadow:0 2px 8px #0005;border-radius:50%;width:28px;height:28px"></div>',iconSize:[28,28],iconAnchor:[14,14]})} eventHandlers={{click:()=>onSelect(o)}}/>)}</MapContainer>}
