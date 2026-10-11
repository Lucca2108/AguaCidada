export type OccurrenceType = 'water_outage' | 'leak' | 'water_quality' | 'infrastructure' | 'other';
export type OccurrenceStatus = 'reported' | 'confirmed' | 'analysis' | 'in_progress' | 'resolved';
export interface OccurrenceEvent { status: OccurrenceStatus; at: string; note?: string }
export interface Occurrence { id:string; protocol:string; type:OccurrenceType; title:string; description:string; latitude:number; longitude:number; neighborhood:string; city:string; state:string; confirmations:number; status:OccurrenceStatus; createdAt:string; photoUrl?:string; owned?:boolean; confirmedByMe?:boolean; history?:OccurrenceEvent[] }
export type CreateOccurrence = Pick<Occurrence, 'type'|'description'|'latitude'|'longitude'|'neighborhood'|'city'|'state'|'photoUrl'>;

