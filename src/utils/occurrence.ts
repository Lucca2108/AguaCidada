import { OccurrenceStatus, OccurrenceType } from '@/types/occurrence';
export const categories: {type:OccurrenceType; title:string; description:string}[] = [
{type:'water_outage',title:'Falta d’água',description:'Torneiras sem água ou abastecimento interrompido.'},
{type:'leak',title:'Vazamento',description:'Água escapando de tubulações ou pela rua.'},
{type:'water_quality',title:'Água com alteração de cor',description:'Mudanças na cor, no cheiro ou no aspecto da água.'},
{type:'infrastructure',title:'Problema de infraestrutura',description:'Tubulações, tampas ou equipamentos danificados.'},
{type:'other',title:'Outro',description:'Outro problema relacionado ao abastecimento.'},
];
export const statusLabels: Record<OccurrenceStatus,string> = {reported:'Registrada',confirmed:'Confirmada pela comunidade',analysis:'Em análise',in_progress:'Em atendimento',resolved:'Resolvida'};
export function dateTime(value:string) { const date=new Date(value); return Number.isNaN(date.getTime()) ? value : date.toLocaleString('pt-BR'); }

