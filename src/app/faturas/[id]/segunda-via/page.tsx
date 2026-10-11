import {InvoiceDetails} from '@/components/invoices/InvoiceDetails';
export default function Page({params}:{params:{id:string}}){return <InvoiceDetails id={params.id} print/>}
