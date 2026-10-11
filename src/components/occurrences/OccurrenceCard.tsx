import Link from 'next/link';
import {CheckCircle2,Clock3} from 'lucide-react';
import {Occurrence} from '@/types/occurrence';
import {StatusBadge} from '@/components/ui/StatusBadge';
import {dateTime} from '@/utils/occurrence';
export function OccurrenceCard({item}:{item:Occurrence}){return <Link href={'/ocorrencias/'+item.id} className="block rounded-2xl bg-white p-4 shadow-soft"><div className="flex flex-wrap items-start justify-between gap-2"><div><p className="m-0 text-[11px] font-bold uppercase tracking-wide text-ocean">{item.title}</p><h3 className="m-0 mt-1 text-sm font-bold text-navy">{item.neighborhood} - {item.city}</h3></div><StatusBadge status={item.status}/></div><div className="mt-3 flex flex-wrap gap-3 text-xs text-slate-500"><span className="flex items-center gap-1"><CheckCircle2 size={14} className="text-emerald-500"/>{item.confirmations} confirmações</span><span className="flex items-center gap-1"><Clock3 size={14}/> {dateTime(item.createdAt)}</span></div></Link>}
