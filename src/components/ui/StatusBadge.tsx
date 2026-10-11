import {OccurrenceStatus} from '@/types/occurrence';
import {statusLabels} from '@/utils/occurrence';
export function StatusBadge({status}:{status:OccurrenceStatus}) { return <span className={'inline-block rounded-full px-3 py-1 text-xs font-semibold '+(status==='resolved'?'bg-emerald-50 text-emerald-700':status==='reported'?'bg-amber-50 text-amber-800':'bg-sky-50 text-sky-800')}>{statusLabels[status]}</span>; }
