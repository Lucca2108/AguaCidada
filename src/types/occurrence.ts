export type OccurrenceType = 'water_outage' | 'leak' | 'water_quality' | 'infrastructure' | 'other';
export type OccurrenceStatus = 'reported' | 'confirmed' | 'resolved';
export interface Occurrence { id:string; protocol:string; type:OccurrenceType; title:string; description:string; latitude:number; longitude:number; neighborhood:string; city:string; state:string; confirmations:number; status:OccurrenceStatus; createdAt:string; photoUrl?:string }
