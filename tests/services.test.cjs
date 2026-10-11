const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
// Executa os services TypeScript sem incluir código de teste no bundle do app.
function createLoader() {
 const cache=new Map();
 function load(file) {
  file=path.resolve(file); if(cache.has(file)) return cache.get(file).exports;
  const module={exports:{}};cache.set(file,module);
  const code=ts.transpileModule(fs.readFileSync(file,'utf8'),{compilerOptions:{module:ts.ModuleKind.CommonJS,target:ts.ScriptTarget.ES2022}}).outputText;
  const localRequire=id=>id.startsWith('@/')?load(path.join(__dirname,'../src',id.slice(2)+'.ts')):id.startsWith('.')?load(path.resolve(path.dirname(file),id+'.ts')):require(id);
  new Function('require','module','exports',code)(localRequire,module,module.exports);return module.exports;
 }
 return load;
}
test('registro, recarga, confirmação única, resolução e erros de persistência',async()=>{
 process.env.NEXT_PUBLIC_USE_API='false';
 const storage=new Map();global.window={};global.localStorage={getItem:key=>storage.get(key)??null,setItem:(key,value)=>storage.set(key,value)};
 const serviceFile=path.join(__dirname,'../src/services/occurrence-service.ts');
 let service=createLoader()(serviceFile).occurrenceService;
 assert.equal((await service.getMyOccurrences()).length,0);
 const input={type:'leak',description:'Vazamento de teste',latitude:-10.95,longitude:-37.07,neighborhood:'Farolândia',city:'Aracaju',state:'SE'};
 const created=await service.createOccurrence(input);
 assert.match(created.protocol,/^AC-\d{4}-\d{6}$/);
 assert.equal(created.history.length,1);
 service=createLoader()(serviceFile).occurrenceService;
 assert.equal((await service.getOccurrenceById(created.id)).description,input.description);
 assert.equal((await service.getMyOccurrences()).length,1);
 await service.confirmOccurrence(created.id);await service.confirmOccurrence(created.id);
 assert.equal((await service.getOccurrenceById(created.id)).confirmations,1);
 await service.updateOccurrenceStatus(created.id,'resolved');
 assert.equal((await service.getOccurrenceById(created.id)).status,'resolved');
 await service.updateOccurrenceStatus(created.id,'reported');
 assert.match((await service.getOccurrenceById(created.id)).history.at(-1).note,/persiste/);
 const before=(await service.getOccurrences()).length;
 global.localStorage.setItem=()=>{throw new Error('QuotaExceededError')};
 await assert.rejects(()=>service.createOccurrence(input),/armazenamento/);
 assert.equal((await service.getOccurrences()).length,before);
 await assert.rejects(()=>service.createOccurrence({...input,latitude:91}),/localização válida/);
 assert.equal(await service.getOccurrenceById('missing'),undefined);
});
test('faturas simuladas e consulta inexistente',async()=>{
 const service=createLoader()(path.join(__dirname,'../src/services/invoice-service.ts')).invoiceService;
 const invoices=await service.getInvoices();assert.equal(invoices.length,3);
 assert.equal((await service.getInvoiceById('setembro-2026')).amount,84.72);
 assert.equal(await service.getInvoiceById('missing'),undefined);
});
test('GPS negado e indisponível oferecem falha recuperável',async()=>{
 const original=Object.getOwnPropertyDescriptor(global,'navigator');
 const geo=createLoader()(path.join(__dirname,'../src/services/geo-service.ts')).geoService;
 try {
  Object.defineProperty(global,'navigator',{configurable:true,value:{}});
  await assert.rejects(()=>geo.getCurrentLocation(),/Selecione o ponto no mapa/);
  Object.defineProperty(global,'navigator',{configurable:true,value:{geolocation:{getCurrentPosition:(_ok,error)=>error({code:1})}}});
  await assert.rejects(()=>geo.getCurrentLocation(),/Permissão de GPS negada/);
  Object.defineProperty(global,'navigator',{configurable:true,value:{geolocation:{getCurrentPosition:ok=>ok({coords:{latitude:-10.9,longitude:-37}})}}});
  assert.deepEqual(await geo.getCurrentLocation(),{latitude:-10.9,longitude:-37});
 } finally { if(original)Object.defineProperty(global,'navigator',original);else delete global.navigator; }
});
test('foto rejeita tipo inválido e arquivo grande antes de processar',async()=>{
 const photo=createLoader()(path.join(__dirname,'../src/services/photo-service.ts')).photoService;
 await assert.rejects(()=>photo.prepare({type:'image/svg+xml',size:20}),/JPG, PNG ou WebP/);
 await assert.rejects(()=>photo.prepare({type:'image/jpeg',size:11*1024*1024}),/até 10 MB/);
});
