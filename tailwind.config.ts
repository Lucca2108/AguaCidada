import type { Config } from 'tailwindcss';
export default { content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'], theme: { extend: { colors: { navy: '#082f49', ocean: '#087ea4', mist: '#f4f8fb' }, boxShadow: { soft: '0 8px 28px rgba(8,47,73,.08)' } } }, plugins: [] } satisfies Config;
