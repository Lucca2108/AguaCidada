import { occurrences } from '@/mocks/occurrences';
import { Occurrence, OccurrenceType } from '@/types/occurrence';
export const occurrenceService = { async getOccurrences(type?:OccurrenceType){ return type ? occurrences.filter(o=>o.type===type) : occurrences; }, async getNearbyOccurrences(){ return occurrences.slice(0,3); }, async getOccurrenceById(id:string){ return occurrences.find(o=>o.id===id); }, async confirmOccurrence(id:string){ const item=occurrences.find(o=>o.id===id); if(item) item.confirmations += 1; return item; } };
