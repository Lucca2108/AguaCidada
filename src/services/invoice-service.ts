import {invoices} from '@/mocks/invoices';
import {Invoice} from '@/types/invoice';
import {api} from './api';
export const invoiceService={
async getInvoices():Promise<Invoice[]> {return api.enabled?api.request('/invoices'):structuredClone(invoices)},
async getInvoiceById(id:string):Promise<Invoice|undefined> {return api.enabled?api.request('/invoices/'+encodeURIComponent(id)):structuredClone(invoices.find(i=>i.id===id))},
};
export const currency=(amount:number)=>amount.toLocaleString('pt-BR',{style:'currency',currency:'BRL'});
export const invoiceDate=(value:string)=>new Date(value+'T12:00:00').toLocaleDateString('pt-BR');

