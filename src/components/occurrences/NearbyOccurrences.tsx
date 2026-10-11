'use client';
import {useResource} from '@/hooks/useResource';
import {occurrenceService} from '@/services/occurrence-service';
import {OccurrenceCard} from './OccurrenceCard';
import {ResourceState} from '@/components/ui/ResourceState';
const load=()=>occurrenceService.getNearbyOccurrences();
export function NearbyOccurrences(){const resource=useResource(load);return <><ResourceState {...resource}/>{resource.data?.map(item=><OccurrenceCard key={item.id} item={item}/>)}{resource.data?.length===0&&<p className="card text-sm">Nenhuma ocorrência próxima.</p>}</>}
