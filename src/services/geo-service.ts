export interface Location { latitude:number; longitude:number; neighborhood:string; city:string; state:string }
export const defaultLocation:Location={latitude:-10.9472,longitude:-37.0731,neighborhood:'',city:'Aracaju',state:'SE'};
export const geoService={
getCurrentLocation():Promise<Pick<Location,'latitude'|'longitude'>> {
return new Promise((resolve,reject)=>{
if(!navigator.geolocation) return reject(new Error('Localização indisponível. Selecione o ponto no mapa.'));
navigator.geolocation.getCurrentPosition(p=>resolve({latitude:p.coords.latitude,longitude:p.coords.longitude}),e=>reject(new Error(e.code===1?'Permissão de GPS negada. Selecione o ponto no mapa.':'Não foi possível obter o GPS. Selecione o ponto no mapa.')),{enableHighAccuracy:true,timeout:10000,maximumAge:60000});
});
},
};
