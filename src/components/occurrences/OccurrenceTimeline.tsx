import {Occurrence,OccurrenceStatus} from '@/types/occurrence';
import {dateTime,statusLabels} from '@/utils/occurrence';
const steps:OccurrenceStatus[]=['reported','confirmed','analysis','in_progress','resolved'];
export function OccurrenceTimeline({item}:{item:Occurrence}) {
return <section className="card"><h2 className="mb-5 font-bold">Acompanhamento</h2><ol className="space-y-5">{steps.map(status=>{const event=[...(item.history??[])].reverse().find(e=>e.status===status);return <li key={status} className="flex gap-3"><span className={'mt-1 h-3 w-3 shrink-0 rounded-full '+(event?'bg-ocean':'border-2 border-slate-300')}/><div><p className={'text-sm font-semibold '+(event?'text-navy':'text-slate-500')}>{statusLabels[status]}</p><p className="mt-1 text-xs text-slate-500">{event?dateTime(event.at):'Etapa pendente'}</p></div></li>})}</ol>{item.history?.some(e=>e.note)&&<div className="mt-5 border-t pt-4 text-xs text-slate-500">{item.history.filter(e=>e.note).map((e,i)=><p key={i}>{dateTime(e.at)} · {e.note}</p>)}</div>}</section>;
}
