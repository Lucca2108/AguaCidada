/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Permite validar produção sem disputar arquivos com o servidor de desenvolvimento.
  distDir: process.env.NEXT_BUILD_DIR || '.next',
};
export default nextConfig;
