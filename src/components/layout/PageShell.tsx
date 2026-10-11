import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BottomNavigation } from '@/components/navigation/BottomNavigation';
export function PageShell({title,subtitle,children}:{title:string;subtitle?:string;children:React.ReactNode}) {
return <main className="mx-auto min-h-screen max-w-[520px] bg-mist px-5 pb-32 pt-6"><Link href="/" className="mb-6 inline-flex items-center gap-2 text-sm font-semibold text-ocean"><ArrowLeft size={18}/> Água Cidadã</Link><h1 className="text-2xl font-bold text-navy">{title}</h1>{subtitle&&<p className="mt-2 text-sm leading-relaxed text-slate-500">{subtitle}</p>}<div className="mt-6 space-y-5">{children}</div><BottomNavigation/></main>;
}
