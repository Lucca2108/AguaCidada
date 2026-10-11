export const photoService={
async prepare(file:File):Promise<string> {
if(!['image/jpeg','image/png','image/webp'].includes(file.type)) throw new Error('Selecione uma imagem JPG, PNG ou WebP.');
if(file.size>10*1024*1024) throw new Error('Escolha uma imagem de até 10 MB.');
const url=URL.createObjectURL(file);
try {
const image=new Image(); image.src=url; await image.decode();
const scale=Math.min(1,1200/Math.max(image.width,image.height));
const canvas=document.createElement('canvas'); canvas.width=Math.round(image.width*scale);canvas.height=Math.round(image.height*scale);
const context=canvas.getContext('2d'); if(!context) throw new Error('Não foi possível processar a imagem.');
context.drawImage(image,0,0,canvas.width,canvas.height);return canvas.toDataURL('image/jpeg',0.75);
} catch { throw new Error('Não foi possível abrir esta imagem. Escolha outra foto.'); }
finally { URL.revokeObjectURL(url); }
},
};
