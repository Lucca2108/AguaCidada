# Água Cidadã — Frontend

Frontend do MVP **Água Cidadã**, desenvolvido para um Inovathon.

O Água Cidadã é uma plataforma mobile-first voltada ao monitoramento colaborativo do saneamento básico. A proposta é permitir que cidadãos visualizem ocorrências próximas, registrem problemas relacionados ao abastecimento de água, confirmem relatos de outros usuários e acompanhem a situação das ocorrências.

O conceito principal do projeto é funcionar como um **“Waze do Saneamento”**, transformando relatos individuais em informações territoriais úteis para a população e para a gestão pública.

## Como iniciar o projeto

### Pré-requisitos

- Node.js LTS instalado;
- npm instalado;
- Git instalado, caso o projeto seja clonado do GitHub.

### Instalação

No PowerShell ou terminal, entre na pasta do projeto:

```powershell
cd "C:\Users\Lucca Menendez\Desktop\Água Cidadã\AguaCidada"
```

Instale as dependências:

```powershell
npm install
```

### Desenvolvimento

Inicie o servidor local:

```powershell
npm run dev
```

Abra no navegador:

- Home: http://localhost:3000
- Mapa colaborativo: http://localhost:3000/mapa

Para parar o servidor, pressione `Ctrl + C` no terminal.

### Build de produção

Para validar e gerar a versão de produção:

```powershell
npm run build
npm start
```

## Tecnologias

O frontend utiliza:

- **TypeScript**
- **React**
- **Next.js**
- **Next.js App Router**
- **Tailwind CSS**
- **Leaflet**
- **OpenStreetMap**

O projeto foi estruturado para futuramente funcionar também como uma **PWA — Progressive Web App**.

## Objetivo do frontend

O frontend representa principalmente a experiência do cidadão. A interface foi desenvolvida com foco em dispositivos móveis e possui base para funcionalidades como:

- visualização da situação do abastecimento;
- mapa colaborativo;
- visualização de ocorrências próximas;
- registro de problemas;
- geolocalização;
- envio de fotografias;
- confirmação comunitária de ocorrências;
- acompanhamento do status de um relato;
- consulta de faturas;
- histórico de ocorrências do usuário.

## Funcionalidades atuais

### Home

A tela inicial apresenta um resumo da situação da região do usuário:

- status do abastecimento;
- quantidade de relatos próximos;
- ocorrências recentes;
- atalhos para serviços principais.

Exemplo:

```text
Situação na sua região

ATENÇÃO

12 moradores relataram falta d'água próximos de você.
```

### Mapa colaborativo

A rota `/mapa` possui:

- mapa de Aracaju com Leaflet e OpenStreetMap;
- ocorrências simuladas em bairros da cidade;
- filtros por categoria;
- marcadores por tipo de ocorrência;
- seleção de marcador;
- bottom sheet com detalhes;
- confirmação local de uma ocorrência.

### Camada de services

Os componentes não acessam os mocks diretamente. A camada de serviços está preparada para ser substituída por chamadas à API FastAPI posteriormente.

Arquivos principais:

```text
src/
├── app/
│   ├── page.tsx
│   └── mapa/page.tsx
├── components/
├── mocks/occurrences.ts
├── services/
│   ├── api.ts
│   └── occurrence-service.ts
└── types/occurrence.ts
```

Atualmente, o `OccurrenceService` utiliza dados fictícios. Futuramente poderá consumir endpoints como:

```text
/api/v1/occurrences
/api/v1/occurrences/nearby
/api/v1/dashboard/summary
/api/v1/occurrences/{id}/confirm
```

## Escopo atual

Nesta primeira etapa foram implementados:

- estrutura base do frontend;
- identidade visual;
- navegação inferior mobile-first;
- Home;
- mapa colaborativo;
- filtros e detalhes de ocorrências;
- confirmação local de ocorrências;
- mocks separados dos componentes;
- coordenadas aproximadas para bairros de Aracaju.

Ainda não fazem parte desta etapa:

- backend;
- banco de dados;
- FastAPI;
- autenticação;
- fluxo completo de relatar ocorrência;
- captura e upload de fotos;
- GPS para criação de relatos;
- faturas funcionais;
- perfil do usuário;
- dashboard administrativo.

## Dados simulados

Os dados de demonstração ficam em:

```text
src/mocks/occurrences.ts
```

Para alterar bairro, categoria, título, confirmações ou coordenadas dos marcadores, edite a lista `places` nesse arquivo.

## Auditoria de dependências

O projeto pode apresentar avisos do `npm audit` relacionados a dependências do Next.js, Tailwind CSS, PostCSS e pacotes indiretos.

Verifique com:

```powershell
npm audit
```

Evite executar `npm audit fix --force` sem revisar as mudanças, pois ele pode atualizar o Next.js e o Tailwind para versões principais incompatíveis com a configuração atual.

## Licença

Projeto desenvolvido para fins de MVP e Inovathon.
