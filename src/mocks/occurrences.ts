import { Occurrence } from '@/types/occurrence';
const places = [
  ['Farolândia','water_outage','Falta d’água',23,-10.986,-37.073],
  ['Atalaia','leak','Vazamento',7,-10.992,-37.052],
  ['Salgado Filho','water_quality','Água com alteração de cor',5,-10.928,-37.056],
  ['Suiça','infrastructure','Problema na infraestrutura',18,-10.927,-37.067],
  ['Jardins','water_outage','Falta d’água',12,-10.953,-37.060],
  ['Jabutiana','leak','Vazamento',9,-10.936,-37.104],
  ['Marivan','water_quality','Água com alteração de cor',4,-10.981,-37.101],
  ['São Conrado','water_outage','Falta d’água',15,-10.951,-37.078],
] as const;

export const occurrences: Occurrence[] = Array.from({length:15},(_,i)=>{
  const p=places[i%places.length];
  const offset=(Math.floor(i/places.length))*0.002;
  return {id:`oc-${i+1}`,protocol:`AC-2024-${String(i+1).padStart(4,'0')}`,type:p[1],title:p[2],description:'Moradores da região relataram este problema no abastecimento.',latitude:p[4]+offset,longitude:p[5]+offset,neighborhood:p[0],city:'Aracaju',state:'SE',confirmations:p[3]+(i%3),status:i%4===0?'reported':'confirmed',createdAt:`Há ${i<2?32+i*28:i} min`};
});
