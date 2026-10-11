import { occurrences } from '@/mocks/occurrences';
import { CreateOccurrence, Occurrence, OccurrenceStatus, OccurrenceType } from '@/types/occurrence';
import { categories } from '@/utils/occurrence';
import { api } from './api';
const key='agua-cidada:occurrences:v2';
function read():Occurrence[] {
if(typeof window==='undefined') return structuredClone(occurrences);
try { const data=localStorage.getItem(key); return data ? JSON.parse(data) : structuredClone(occurrences); }
catch { throw new Error('Não foi possível ler os relatos salvos neste navegador.'); }
}
function save(items:Occurrence[]) {
try { localStorage.setItem(key,JSON.stringify(items)); }
catch { throw new Error('Não foi possível salvar. O armazenamento pode estar cheio ou bloqueado. Tente uma foto menor.'); }
}
export const occurrenceService = {
async getOccurrences(type?:OccurrenceType):Promise<Occurrence[]> {
if(api.enabled) return api.request('/occurrences'+(type?'?type='+type:''));
const items=read(); return type?items.filter(o=>o.type===type):items;
},
async getNearbyOccurrences():Promise<Occurrence[]> { return api.enabled?api.request('/occurrences/nearby'):(await this.getOccurrences()).slice(0,3); },
async getMyOccurrences():Promise<Occurrence[]> { return (await this.getOccurrences()).filter(o=>o.owned); },
async getOccurrenceById(id:string):Promise<Occurrence|undefined> { return api.enabled?api.request('/occurrences/'+encodeURIComponent(id)):read().find(o=>o.id===id); },
async createOccurrence(input:CreateOccurrence):Promise<Occurrence> {
if(api.enabled) return api.request('/occurrences',{method:'POST',body:JSON.stringify(input)});
if(!Number.isFinite(input.latitude)||Math.abs(input.latitude)>90||!Number.isFinite(input.longitude)||Math.abs(input.longitude)>180) throw new Error('Selecione uma localização válida.');
const items=read(), now=new Date().toISOString();
const item:Occurrence={...input,id:crypto.randomUUID(),protocol:'AC-'+new Date().getFullYear()+'-'+String(items.length+1).padStart(6,'0'),title:categories.find(c=>c.type===input.type)!.title,confirmations:0,status:'reported',createdAt:now,owned:true,history:[{status:'reported',at:now}]};
save([item,...items]); return item;
},
async confirmOccurrence(id:string):Promise<Occurrence|undefined> {
if(api.enabled) return api.request('/occurrences/'+encodeURIComponent(id)+'/confirm',{method:'POST'});
const items=read(), item=items.find(o=>o.id===id);
if(item&&!item.confirmedByMe) { item.confirmations++; item.confirmedByMe=true; if(item.status==='reported'){item.status='confirmed';item.history=[...(item.history??[]),{status:'confirmed',at:new Date().toISOString()}];} save(items); } return item;
},
async updateOccurrenceStatus(id:string,status:OccurrenceStatus):Promise<Occurrence> {
if(api.enabled) return api.request('/occurrences/'+encodeURIComponent(id)+'/status',{method:'POST',body:JSON.stringify({status})});
const items=read(),item=items.find(o=>o.id===id); if(!item) throw new Error('Ocorrência não encontrada.');
item.status=status; item.history=[...(item.history??[]),{status,at:new Date().toISOString(),note:status==='reported'?'Morador informou que o problema ainda persiste.':undefined}]; save(items); return item;
},
};
