'use client';
import dynamic from 'next/dynamic';
export const LocationPicker=dynamic(()=>import('./LocationPickerInner'),{ssr:false,loading:()=> <div className="flex h-60 items-center justify-center bg-slate-100" role="status">Carregando mapa…</div>});

