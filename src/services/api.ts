// A integração é opt-in; definir apenas a URL mantém a demonstração independente.
export const api = {
baseUrl: (process.env.NEXT_PUBLIC_API_URL ?? '').replace(/\/$/, ''),
enabled: process.env.NEXT_PUBLIC_USE_API === 'true',
async request<T>(path:string, options?:RequestInit):Promise<T> {
if (!this.baseUrl) throw new Error('A URL da API não foi configurada.');
const response = await fetch(this.baseUrl+path, {...options, headers:{'Content-Type':'application/json',...options?.headers}});
if (!response.ok) throw new Error('Não foi possível concluir a solicitação. Tente novamente.');
return response.json() as Promise<T>;
},
};
