'use client';
import {useState} from 'react';
import {Search,LocateFixed} from 'lucide-react';
import {BottomNavigation} from '@/components/navigation/BottomNavigation';
import {CategoryFilter} from '@/components/map/CategoryFilter';
import {MapView} from '@/components/map/MapView';
import {OccurrenceBottomSheet} from '@/components/map/OccurrenceBottomSheet';
import {occurrenceService} from '@/services/occurrence-service';
import {geoService} from '@/services/geo-service';
import {Occurrence,OccurrenceType} from '@/types/occurrence';
import {useResource} from '@/hooks/useResource';
const load=()=>occurrenceService.getOccurrences();
export default function Mapa(){
const resource=useResource(load),items=resource.data??[];
const [filter,setFilter]=useState<OccurrenceType>(),[selected,setSelected]=useState<Occurrence>(),[query,setQuery]=useState(''),[busy,setBusy]=useState(false),[error,setError]=useState(''),[center,setCenter]=useState<[number,number]>();
const normalize=(s:string)=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
const visible=items.filter(i=>(!filter||i.type===filter)&&normalize(i.neighborhood+' '+i.title).includes(normalize(query)));
async function confirm(){if(!selected||busy)return;setBusy(true);setError('');try{const updated=await occurrenceService.confirmOccurrence(selected.id);if(updated){setSelected(updated);resource.setData(items.map(i=>i.id===updated.id?updated:i))}}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
async function locate(){setBusy(true);setError('');try{const p=await geoService.getCurrentLocation();setCenter([p.latitude,p.longitude])}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
return <main className="relative mx-auto h-[100dvh] min-h-[500px] max-w-[520px] overflow-hidden bg-mist pb-24"><div className="absolute left-4 right-4 top-5 z-10"><div className="flex items-center gap-2 rounded-2xl bg-white px-4 py-3 shadow-lg"><Search size={18} className="text-slate-400"/><input aria-label="Buscar bairro ou local" value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar bairro ou local" className="w-full bg-transparent text-sm outline-none"/></div><div className="mt-3"><CategoryFilter value={filter} onChange={setFilter}/></div>{resource.loading&&<p className="mt-2 rounded-xl bg-white p-3 text-sm" role="status">Carregando ocorrências…</p>}{(error||resource.error)&&<div className="mt-2 rounded-xl bg-white p-3 text-sm text-red-700" role="alert">{error||resource.error}{resource.error&&<button className="ml-2 underline" onClick={resource.retry}>Tentar novamente</button>}</div>}{!resource.loading&&!resource.error&&visible.length===0&&<p className="mt-2 rounded-xl bg-white p-3 text-sm" role="status">Nenhuma ocorrência para estes filtros.</p>}</div><div className="h-full"><MapView items={visible} onSelect={setSelected} center={center}/></div><button aria-label="Minha localização" disabled={busy} onClick={locate} className="absolute bottom-28 right-5 z-10 rounded-full bg-white p-3 text-ocean shadow-lg"><LocateFixed size={20}/></button>{selected&&<OccurrenceBottomSheet item={selected} onClose={()=>setSelected(undefined)} onConfirm={confirm} busy={busy} error={error}/>}<BottomNavigation/></main>;
}
