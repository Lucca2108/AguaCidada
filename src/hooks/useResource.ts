'use client';
import {useCallback,useEffect,useState} from 'react';
export function useResource<T>(loader:()=>Promise<T>) {
const [data,setData]=useState<T>(),[loading,setLoading]=useState(true),[error,setError]=useState(''),[version,setVersion]=useState(0);
useEffect(()=>{let active=true;setLoading(true);setError('');loader().then(value=>{if(active)setData(value)}).catch(e=>{if(active)setError(e instanceof Error?e.message:'Ocorreu um erro.')}).finally(()=>{if(active)setLoading(false)});return()=>{active=false}},[loader,version]);
return {data,setData,loading,error,retry:useCallback(()=>setVersion(v=>v+1),[])};
}
