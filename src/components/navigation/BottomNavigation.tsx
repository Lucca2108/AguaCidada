'use client';
import Link from 'next/link';
import {usePathname} from 'next/navigation';
import {Home,Map,Receipt,UserRound,Plus} from 'lucide-react';
const items=[{label:'Início',href:'/',icon:Home},{label:'Mapa',href:'/mapa',icon:Map},{label:'Relatar',href:'/relatar',icon:Plus},{label:'Faturas',href:'/faturas',icon:Receipt},{label:'Perfil',href:'/perfil',icon:UserRound}];
export function BottomNavigation({active:_active}:{active?:string}) {
const pathname=usePathname();
return <nav aria-label="Navegação principal" className="bottom-nav fixed bottom-0 left-1/2 z-20 flex w-full max-w-[520px] -translate-x-1/2 justify-around border-t border-slate-200 bg-white px-2 pt-3 shadow-[0_-8px_25px_rgba(8,47,73,.06)]">{items.map(({label,href,icon:Icon})=>{const selected=href==='/'?pathname==='/':pathname.startsWith(href),report=href==='/relatar';return <Link key={href} href={href} aria-current={selected?'page':undefined} className={'flex min-w-14 flex-col items-center gap-1 text-[10px] font-semibold '+(selected?'text-ocean':'text-slate-500')+(report?' relative -mt-8':'')}><span className={report?'flex h-14 w-14 items-center justify-center rounded-full bg-ocean text-white shadow-lg ring-8 ring-mist':''}><Icon size={report?28:20}/></span><span>{label}</span></Link>})}</nav>;
}
