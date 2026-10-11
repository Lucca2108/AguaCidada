'use client';
import {useCallback,useState} from 'react';
import Link from 'next/link';
import {PageShell} from '@/components/layout/PageShell';
import {ResourceState} from '@/components/ui/ResourceState';
import {StatusBadge} from '@/components/ui/StatusBadge';
import {OccurrenceSummary} from '@/components/occurrences/OccurrenceSummary';
import {OccurrenceTimeline} from '@/components/occurrences/OccurrenceTimeline';
import {occurrenceService} from '@/services/occurrence-service';
import {useResource} from '@/hooks/useResource';
import {OccurrenceStatus} from '@/types/occurrence';
export default function Details({params}:{params:{id:string}}) {
const load=useCallback(()=>occurrenceService.getOccurrenceById(params.id),[params.id]),resource=useResource(load);
const [busy,setBusy]=useState(false),[message,setMessage]=useState(''),[error,setError]=useState('');
async function update(status:OccurrenceStatus){setBusy(true);setError('');setMessage('');try{resource.setData(await occurrenceService.updateOccurrenceStatus(params.id,status));setMessage(status==='resolved'?'Obrigado! Sua confirmação de resolução foi registrada.':'Obrigado! Registramos que o problema ainda persiste.')}catch(e){setError((e as Error).message)}finally{setBusy(false)}}
const item=resource.data;
return <PageShell title="Sua ocorrência" subtitle="Acompanhe as atualizações do relato."><ResourceState {...resource}/>{!resource.loading&&!resource.error&&!item&&<div className="card"><p>Ocorrência não encontrada neste navegador.</p><Link href="/mapa" className="secondary mt-4">Voltar ao mapa</Link></div>}{item&&<><div className="flex flex-wrap items-center justify-between gap-3"><span className="text-sm font-bold">{item.protocol}</span><StatusBadge status={item.status}/></div><OccurrenceSummary item={item}/><OccurrenceTimeline item={item}/><section className="card space-y-3"><h2 className="font-bold">O problema foi resolvido?</h2><button className="primary" disabled={busy||item.status==='resolved'} onClick={()=>update('resolved')}>SIM, FOI RESOLVIDO</button><button className="secondary w-full" disabled={busy} onClick={()=>update('reported')}>AINDA PERSISTE</button>{busy&&<p role="status">Salvando…</p>}{message&&<p role="status" className="text-sm text-emerald-700">{message}</p>}{error&&<p role="alert" className="text-sm text-red-700">{error}</p>}</section><p className="text-xs text-slate-500">Demonstração: as atualizações são locais. Etapas de análise e atendimento dependem da futura integração.</p><Link href="/ocorrencias" className="secondary w-full">Minhas ocorrências</Link></>}</PageShell>;
}
