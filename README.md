<div align="center">
  <img src="assets/branding/logo-nauticair-dark.png" alt="NauticAir" width="120" />
  <h1>NauticAir</h1>
  <p><strong>Plataforma integrada para monitoramento de emissões no contexto marítimo</strong></p>
</div>

<p align="center">
  <img alt="Frontend" src="https://img.shields.io/badge/Frontend-React%2019%20%2B%20Vite%207-2563eb" />
  <img alt="Backend" src="https://img.shields.io/badge/Backend-Node%20%2B%20Express%205-0f172a" />
  <img alt="Database" src="https://img.shields.io/badge/Database-PostgreSQL%20%2B%20Sequelize-334155" />
  <img alt="IoT" src="https://img.shields.io/badge/IoT-ESP32%20%2B%20MQ--135%20%2B%20MQ--7-15803d" />
</p>

---

## O que é o NauticAir
O NauticAir é um sistema de ponta a ponta para capturar, processar e visualizar dados de emissões em operações marítimas.

Ele conecta quatro camadas:
- **IoT (borda)**: leitura de sensores e envio de telemetria.
- **API (serviços)**: autenticação, ingestão, regras de negócio e consultas.
- **Banco de Dados (persistência)**: histórico, alertas, dispositivos, usuários e rotas.
- **Frontend (operação)**: dashboards e fluxos para acompanhamento e tomada de decisão.

## Arquitetura em 30 segundos

| Camada  | Responsabilidade                                                      | Tecnologia                           |
| ------- | --------------------------------------------------------------------- | ------------------------------------ |
| IoT     | Captura de CO/CO2 e status local por LEDs                             | ESP32, MQ-135, MQ-7                  |
| API     | Endpoints REST, JWT, regras de alerta e histórico                     | Node.js, Express, Sequelize          |
| Banco   | Modelo relacional de usuários, devices, measurements, alerts e routes | PostgreSQL                           |
| Web App | Interface operacional da plataforma                                   | React, Vite, Tailwind, Framer Motion |

## Estrutura do repositório

```txt
NauticAir/
├── frontend/          # Aplicação web
├── backend/           # API REST e regras de negócio
├── iot/               # Firmware e lógica embarcada (ESP32)
├── docs/              # Documentação técnica oficial
├── tests/             # Cenários de teste
└── assets/branding/   # Identidade visual (logo)
```

## Módulos de produto já disponíveis (Web)
- Dashboard
- Alertas
- Dispositivos
- Histórico de emissões
- Configurações
- Edição de perfil

## Documentação oficial
A documentação técnica detalhada está em `/docs`:

- **API completa**: [`docs/api_documentation.md`](docs/api_documentation.md)
  - autenticação JWT
  - endpoints de dispositivos, medições, alertas e histórico
  - modelos de dados, status codes e exemplos de uso

- **Banco de Dados**: [`docs/database_schema.md`](docs/database_schema.md)
  - diagrama e relacionamentos
  - estrutura de tabelas e regras de negócio
  - índices e considerações de modelagem

- **IoT**: [`docs/iot_documentation.md`](docs/iot_documentation.md)
  - hardware, pinagem e sensores
  - lógica de classificação por LEDs
  - fluxo de envio de dados para a API

## Como rodar localmente

### 1) Backend
```bash
cd backend
npm install
npm run dev
```

### 2) Frontend
```bash
cd frontend
npm install
npm run dev
```

### 3) IoT (opcional no ambiente local)
- Abra `iot/NauticAir_IoT_Full/NauticAir_IoT_Full.ino`
- Configure SSID/senha e endpoint da API
- Grave no ESP32

## Princípios de UX do projeto
- Consistência visual entre as telas da área restrita.
- Feedback de ações com **Toast Notifications**.
- Componentização por domínio para evolução incremental.
- Semântica HTML e acessibilidade como baseline.

## Contribuidores

<table align="center">
  <tr>
    <td align="center">
      <a href="https://github.com/andreiolicar">
        <img src="https://avatars.githubusercontent.com/u/166918480?v=4" width="100px;" alt="Ícone do Andrei no GitHub"/><br>
        <sub>
          <b>Andrei Carneiro</b>
        </sub> <br>
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/nsmillena">
        <img src="https://avatars.githubusercontent.com/u/nsmillena?v=4" width="100px;" alt="Ícone da Millena no GitHub"/><br>
        <sub>
          <b>Millena Nunes</b>
        </sub> <br>
      </a>
    </td>
  </tr>
</table>

---

<p align="center">
  • NauticAir 2026 •
</p>
