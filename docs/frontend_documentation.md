# NauticAir Frontend - Documentação Completa

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Tecnologias e Stack](#tecnologias-e-stack)
3. [Arquitetura Frontend](#arquitetura-frontend)
4. [Rotas e Navegação](#rotas-e-navegação)
5. [Páginas](#páginas)
6. [Componentes por Domínio](#componentes-por-domínio)
7. [Modelos de Dados de UI](#modelos-de-dados-de-ui)
8. [Gerenciamento de Estado](#gerenciamento-de-estado)
9. [Animações e Interações](#animações-e-interações)
10. [Sistema de Notificações (Toast)](#sistema-de-notificações-toast)
11. [Acessibilidade e Semântica](#acessibilidade-e-semântica)
12. [Integração com Backend](#integração-com-backend)
13. [Scripts e Execução](#scripts-e-execução)
14. [Tratamento de Erros](#tratamento-de-erros)
15. [Referências](#referências)

---

## 🎯 Visão Geral

O frontend do NauticAir é uma aplicação React SPA responsável por exibir métricas operacionais de emissões em tempo real, consolidar alertas e histórico de emissões/rotas, gerenciar dispositivos IoT e oferecer área restrita com configurações operacionais e edição de perfil.

### Características

- ✅ SPA com roteamento por `react-router-dom`
- ✅ Layout restrito persistente (sidebar fixa + conteúdo dinâmico)
- ✅ Drawers com deep-link (`/alerts/:id`, `/devices/:id`, `/history/:id`)
- ✅ Sistema de toast notifications global
- ✅ UI semântica e componentizada por domínio
- ✅ Animações com Framer Motion

### Tecnologias

- **Framework**: React 19.1.1
- **Bundler**: Vite 7.1.7
- **Roteamento**: React Router DOM 7.9.3
- **Estilização**: Tailwind CSS 3.4.18
- **Animações**: Framer Motion 12.23.22
- **Ícones**: Lucide React 0.544.0
- **HTTP Client**: axios (preparado para integração)
- **Utilitários de Data**: date-fns

---

## 🧱 Arquitetura Frontend

### Estrutura de Pastas

```txt
frontend/src/
├── components/
│   ├── Alerts/
│   ├── Auth/
│   ├── common/
│   ├── Dashboard/
│   ├── Devices/
│   ├── EmissionsHistory/
│   ├── Layout/
│   ├── Settings/
│   ├── Header/
│   ├── Hero/
│   ├── Features/
│   ├── Contact/
│   └── Footer/
├── pages/
├── utils/
├── App.jsx
└── main.jsx
```

### Princípios Aplicados

- **Semântica**: uso de `main`, `section`, `header`, `nav`, `form`, `table`, `button`
- **Componentização**: blocos por domínio para reuso e manutenção
- **Separação de responsabilidades**:
  - `pages/` — composição e estado da tela
  - `components/` — apresentação e interação local
  - `utils/` — mapeamentos e regras auxiliares

---

## 🧭 Rotas e Navegação

Arquivo de referência: `frontend/src/App.jsx`

### Rotas Públicas

| Rota | Página |
|------|--------|
| `/` | Home |
| `/register` | Cadastro |
| `/login` | Login |
| `/verification` | Verificação 2FA |

### Rotas Restritas (com `RestrictedLayout`)

| Rota | Página |
|------|--------|
| `/dashboard` | Dashboard |
| `/dashboard/alerts` | Alertas |
| `/dashboard/alerts/:alertId` | Alertas + Drawer de detalhes |
| `/dashboard/devices` | Dispositivos |
| `/dashboard/devices/:deviceId` | Dispositivos + Drawer de detalhes |
| `/dashboard/history` | Histórico de Emissões |
| `/dashboard/history/:historyId` | Histórico + Drawer de detalhes |
| `/dashboard/settings` | Configurações |
| `/dashboard/profile` | Edição de Perfil |

### Comportamento de Fallback

- `*` → redireciona para `/`

---

## 📄 Páginas

### 1. `Home.jsx`

Landing page institucional com Header, Hero, seção de Recursos, Contato e Footer.

---

### 2. `Login.jsx` / `Register.jsx` / `TwoFactorAuth.jsx`

Fluxo de autenticação com formulário central animado e estrutura institucional (Header + Footer).

---

### 3. `Dashboard.jsx`

Painel operacional principal com:
- Cards de métricas
- Gráfico de emissões
- Cards de dispositivos
- Tabela de histórico resumida
- Lista de alertas
- Modal de onboarding no primeiro acesso (via `localStorage`)

---

### 4. `Alerts.jsx`

Tela de alertas com:
- Filtro por status e ordenação
- Listagem visual no padrão do dashboard
- Drawer lateral de detalhes por rota (`:alertId`)
- Fallback de carregamento de detalhes via mock assíncrono

---

### 5. `Devices.jsx`

Gestão de dispositivos com:
- Grid de dispositivos
- Modal de criação com formulário validado
- Drawer de detalhes com fallback de carregamento
- Deep-link por `:deviceId`

---

### 6. `EmissionsHistory.jsx`

Histórico de emissões/rotas com:
- Filtro por status e ordenação por créditos
- Paginação (até 8 linhas por página)
- Ação por linha (`external-link`) para detalhes
- Drawer lateral por `:historyId`

---

### 7. `Settings.jsx`

Configurações da conta operacional com:
- Seção Operacional, Alertas e Sistema
- Validação de campos
- Estado `isDirty` para controle de descarte/salvamento
- Feedback de sucesso/erro com toast

---

### 8. `ProfileEdit.jsx`

Edição de perfil com:
- Dados pessoais e organizacionais
- Timezone e idioma
- Validação de formulário com feedback por toast

---

## 🧩 Componentes por Domínio

### `components/Layout`

| Componente | Descrição |
|------------|-----------|
| `RestrictedLayout.jsx` | Shell da área restrita (sidebar fixa + outlet + modal de logout) |
| `Sidebar.jsx` | Navegação lateral persistente por seção |
| `UserProfile.jsx` | Bloco de usuário com dropdown (Editar perfil / Logout) |
| `LogoutConfirmModal.jsx` | Modal de confirmação de logout |

### `components/common`

| Componente | Descrição |
|------------|-----------|
| `InputField.jsx` | Input padronizado com label e mensagem de erro |
| `FormButton.jsx` | Botões primário/secundário com estados de loading |
| `ToastProvider.jsx` | Contexto global de notificações toast |
| `OTPInput.jsx` | Input para código de verificação 2FA |
| `SectionBadge.jsx` | Badge de seção |
| `SectionTitle.jsx` | Título de seção |
| `Divider.jsx` | Separador visual |
| `CTAButtons.jsx` | Botões de chamada para ação |

### `components/Alerts`

| Componente | Descrição |
|------------|-----------|
| `AlertsPageHeader.jsx` | Cabeçalho da página de alertas |
| `AlertsFeed.jsx` | Lista de alertas |
| `AlertsFeedItem.jsx` | Item individual do feed |
| `AlertDetailsDrawer.jsx` | Drawer lateral de detalhes do alerta |
| `AlertDetailsSection.jsx` | Seção de detalhes internos |
| `AlertMetricGrid.jsx` | Grid de métricas do alerta |
| `AlertSeverityBadge.jsx` | Badge de severidade |
| `AlertTimelineInfo.jsx` | Informações de timeline do alerta |

### `components/Devices`

| Componente | Descrição |
|------------|-----------|
| `DevicesPageHeader.jsx` | Cabeçalho da página de dispositivos |
| `DevicesGrid.jsx` | Grid de cards de dispositivos |
| `DeviceCard.jsx` | Card individual de dispositivo |
| `DeviceCreateModal.jsx` | Modal de criação de dispositivo |
| `DeviceDetailsDrawer.jsx` | Drawer lateral de detalhes |
| `DeviceStatusBadge.jsx` | Badge de status do dispositivo |
| `DeviceInfoChip.jsx` | Chip de informação do dispositivo |

### `components/EmissionsHistory`

| Componente | Descrição |
|------------|-----------|
| `HistoryPageHeader.jsx` | Cabeçalho da página de histórico |
| `HistoryTable.jsx` | Tabela de histórico de emissões |
| `HistoryStatusBadge.jsx` | Badge de status da rota |
| `RouteDetailsDrawer.jsx` | Drawer lateral de detalhes da rota |

### `components/Settings`

| Componente | Descrição |
|------------|-----------|
| `SettingsPageHeader.jsx` | Cabeçalho da página de configurações |
| `SettingsSectionCard.jsx` | Card de seção de configurações |
| `OperationalSettingsForm.jsx` | Formulário de configurações operacionais |
| `AlertSettingsForm.jsx` | Formulário de configurações de alertas |
| `SystemSettingsForm.jsx` | Formulário de configurações do sistema |
| `SettingsSwitch.jsx` | Componente de toggle switch |
| `SettingsSelect.jsx` | Componente de seleção |
| `SettingsSaveBar.jsx` | Barra de salvar/descartar alterações |

---

## 📊 Modelos de Dados de UI

### AlertItem

```typescript
{
  id: string,
  title: string,
  timeLabel: string,
  ageDays: number,
  progressClass: string,
  status: "positive" | "warning" | "critical",
  deviceId?: string,
  coPpm?: number,
  co2Gph?: number,
  durationH?: number,
  createdAt?: string
}
```

### DeviceItem

```typescript
{
  id: string,
  status: "connected" | "disconnected",
  image: string,
  schedule?: string,
  hours?: string,
  cost?: string,
  info1?: string,
  info2?: string,
  info3?: string,
  description?: string,
  createdAt?: string
}
```

### HistoryRow

```typescript
{
  id: string,
  route: string,
  duration: string,
  credits: string,
  status: "positive" | "warning" | "critical",
  statusLabel: string,
  departurePort?: string,
  arrivalPort?: string,
  departureAt?: string,
  arrivalAt?: string,
  captain?: string,
  deviceId?: string,
  vessel?: string,
  fuelType?: string,
  avgSpeedKn?: string,
  totalCo2Kg?: string,
  weather?: string,
  notes?: string
}
```

### SettingsState

```typescript
{
  operational: {
    coPpmLimit: string,
    co2GphLimit: string,
    dailyCo2CapKg: string,
    samplingIntervalSec: string
  },
  alerts: {
    emailEnabled: boolean,
    inAppEnabled: boolean,
    quietHoursEnabled: boolean,
    quietStart: string,
    quietEnd: string,
    recipientEmail: string
  },
  system: {
    unitSystem: "metric" | "imperial",
    timezone: string,
    language: "pt-BR" | "en-US",
    autoRefreshSec: string
  }
}
```

---

## 🧠 Gerenciamento de Estado

### Estratégia Atual

- Estado local com `useState` em cada página
- Derivações com `useMemo` (filtros, ordenação, paginação)
- Efeitos com `useEffect` para sincronização por rota, fallback assíncrono, reset de paginação/filtros e onboarding via `localStorage`

### Padrão Deep-link + Overlay

Aplicado em três domínios:

| Domínio | Rota com Drawer |
|---------|-----------------|
| Alertas | `/dashboard/alerts/:alertId` |
| Dispositivos | `/dashboard/devices/:deviceId` |
| Histórico | `/dashboard/history/:historyId` |

**Vantagens**: URL compartilhável, manutenção do contexto da listagem em segundo plano e abertura/fechamento sem troca de página base.

---

## 🎬 Animações e Interações

Arquivo de referência: `frontend/src/utils/animations.js`

### Variantes Disponíveis

| Variante | Uso |
|----------|-----|
| `fadeIn` | Entrada suave de elementos |
| `slideUp` | Entrada deslizando para cima |
| `slideDown` | Entrada deslizando para baixo |
| `scaleIn` | Entrada com escala |
| `bounceIn` | Entrada com efeito de bounce |
| `staggerContainer` | Container com delay em filhos |
| `staggerItem` | Item com delay sequencial |
| `scrollReveal` | Revelação por scroll |
| `hoverScale` | Escala ao hover |
| `hoverLift` | Elevação ao hover |

---

## 🔔 Sistema de Notificações (Toast)

Arquivo de referência: `frontend/src/components/common/ToastProvider.jsx`

### Arquitetura

- Provider global registrado em `main.jsx`
- Hook `useToast()` para consumo em qualquer componente
- Exibição no canto inferior direito com entrada/saída via Framer Motion
- Fechamento automático após `3500ms` (padrão) ou manual

### Variantes Suportadas

| Variante | Uso |
|----------|-----|
| `success` | Operação concluída com sucesso |
| `error` | Falha em operação |
| `warning` | Aviso ao usuário |
| `info` | Informação geral |

### API de Uso

```typescript
addToast({
  variant: "success" | "error" | "warning" | "info",
  title?: string,
  message: string,
  duration?: number   // padrão: 3500ms
});
```

### Exemplo

```javascript
addToast({
  variant: "success",
  title: "Configurações salvas",
  message: "As alterações foram aplicadas com sucesso."
});
```

---

## ♿ Acessibilidade e Semântica

Padrões aplicados no frontend:

- Estrutura semântica com `main`, `section`, `header`, `nav`, `form`, `table`
- `aria-label` em ações sem texto explícito
- `role="dialog"` e fechamento por `Esc` em modais e drawers
- Feedback visual de interação consistente
- Componentes de formulário com `label`, mensagem de erro e associação correta por `htmlFor`

---

## 🔌 Integração com Backend

O frontend está preparado para integração progressiva com a API documentada em `docs/api_documentation.md`.

### Endpoints Mapeados por Domínio

| Domínio | Endpoints |
|---------|-----------|
| Auth | `POST /api/auth/register`, `POST /api/auth/login`, `GET /api/auth/me` |
| Dispositivos | `GET /api/devices`, `POST /api/devices`, `PUT /api/devices/:id`, `DELETE /api/devices/:id` |
| Medições | `GET /api/measurements`, `GET /api/measurements/summary` |
| Alertas | `GET /api/alerts`, `GET /api/alerts/stats` |
| Histórico de Rotas | `GET /api/routes-history`, `GET /api/routes-history/stats` |

### Situação Atual

- Parte das telas utiliza dados mockados com fallback local assíncrono
- Os contratos de UI já refletem os principais campos retornados pela API

---

## ▶ Scripts e Execução

Arquivo de referência: `frontend/package.json`

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Ambiente de desenvolvimento (Vite) |
| `npm run build` | Build de produção |
| `npm run preview` | Preview local do build |
| `npm run lint` | Lint do projeto |

### Execução Local

```bash
cd frontend
npm install
npm run dev
```

---

## ⚠️ Tratamento de Erros

### Padrão de Erros na UI

- Estados de erro em drawers e listagens com mensagem clara
- Ação de retry quando aplicável (`Tentar novamente`)
- Validação de formulário antes do submit
- Notificações de falha via toast

### Problemas Comuns

**Drawer não abre pelo link direto**
- Verifique se a rota com `:id` está declarada corretamente em `App.jsx`

**Sidebar marcando item incorreto**
- Valide o mapeamento de rota ativa no componente `Sidebar.jsx`

**Layout "saltando" ao abrir modal**
- A compensação de scrollbar já é tratada no overlay do projeto

**Build com aviso de chunk grande**
- Aviso não bloqueante do Vite; considerar code-splitting futuro com `React.lazy`

---

## 📚 Referências

- **Documentação da API**: `docs/api_documentation.md`
- **Schema do Banco de Dados**: `docs/database_schema.md`
- **Documentação IoT**: `docs/iot_documentation.md`
- **Repositório GitHub**: https://github.com/andreiolicar/NauticAir
- **Autores**: Andrei Carneiro, Millena Nunes
- **Instituição**: ETEC Zona Leste

---

**Última Atualização**: Fevereiro de 2026  
**Versão do Frontend**: v1.0.0-ui