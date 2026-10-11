'use client';
import {PageShell} from '@/components/layout/PageShell';
import {ResourceState} from '@/components/ui/ResourceState';
import {InvoiceCard} from '@/components/invoices/InvoiceCard';
import {useResource} from '@/hooks/useResource';
import {invoiceService} from '@/services/invoice-service';
const load=()=>invoiceService.getInvoices();
export default function Invoices(){const resource=useResource(load);return <PageShell title="Minhas faturas" subtitle="Consulte suas contas de água."><div className="card"><p className="text-xs text-slate-500">Unidade consumidora</p><p className="mt-1 text-lg font-bold">000123456</p><p className="mt-1 text-sm text-slate-500">Aracaju - SE</p></div><p className="rounded-xl bg-sky-50 p-3 text-xs text-ocean">Dados de demonstração. As faturas e os códigos não permitem pagamento.</p><ResourceState {...resource}/>{resource.data?.length===0&&<p className="card">Nenhuma fatura encontrada.</p>}{resource.data?.map(invoice=><InvoiceCard key={invoice.id} invoice={invoice}/>)}</PageShell>}
