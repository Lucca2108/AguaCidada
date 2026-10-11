'use client';
import Link from 'next/link';
import {PageShell} from '@/components/layout/PageShell';
import {ResourceState} from '@/components/ui/ResourceState';
import {StatusBadge} from '@/components/ui/StatusBadge';
import {useResource} from '@/hooks/useResource';
import {occurrenceService} from '@/services/occurrence-service';
import {dateTime} from '@/utils/occurrence';
const load=()=>occurrenceService.getMyOccurrences();
export default function MyOccurrences(){const resource=useResource(load);return <PageShell title="Minhas ocorrências" subtitle="Seus relatos e protocolos, em um só lugar."><ResourceState {...resource}/>{resource.data?.length===0&&<div className="card"><h2 className="font-bold">Você ainda não registrou ocorrências.</h2><p className="mt-2 text-sm text-slate-500">Ao relatar um problema, você poderá acompanhá-lo aqui.</p><Link href="/relatar" className="primary mt-5">Relatar problema</Link></div>}{resource.data?.map(item=><Link key={item.id} href={'/ocorrencias/'+item.id} className="card block space-y-2"><p className="text-xs font-bold text-ocean">{item.protocol}</p><h2 className="font-bold">{item.title}</h2><p className="text-sm text-slate-500">{item.neighborhood} · {dateTime(item.createdAt)}</p><StatusBadge status={item.status}/></Link>)}</PageShell>}
