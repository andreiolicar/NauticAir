# NauticAir API - Documentação Completa

## 📋 Índice

1. [Visão Geral](#visão-geral)
2. [Autenticação](#autenticação)
3. [Base URL](#base-url)
4. [Endpoints](#endpoints)
   - [Autenticação](#endpoints-de-autenticação)
   - [Dispositivos IoT](#endpoints-de-dispositivos-iot)
   - [Medições](#endpoints-de-medições)
   - [Alertas](#endpoints-de-alertas)
   - [Histórico de Rotas](#endpoints-de-histórico-de-rotas)
5. [Modelos de Dados](#modelos-de-dados)
6. [Códigos de Status](#códigos-de-status)
7. [Exemplos de Uso](#exemplos-de-uso)
8. [Tratamento de Erros](#tratamento-de-erros)

---

## 🎯 Visão Geral

A API NauticAir é uma API RESTful que recebe dados dos dispositivos IoT instalados em embarcações e fornece endpoints para consulta, análise e visualização de dados de emissões de gases poluentes no setor portuário.

### Características

- ✅ API RESTful seguindo padrões REST
- ✅ Autenticação via JWT (JSON Web Tokens)
- ✅ Formato de dados: JSON
- ✅ Suporte a CORS
- ✅ Proteção com Helmet.js
- ✅ Endpoint público para IoT (sem autenticação)

### Tecnologias

- **Runtime**: Node.js
- **Framework**: Express.js 5.1.0
- **Database**: PostgreSQL
- **ORM**: Sequelize 6.37.7
- **Authentication**: JWT (jsonwebtoken 9.0.2)
- **Security**: Helmet, CORS, bcrypt

---

## 🔐 Autenticação

A API utiliza **Bearer Token Authentication** com JWT.

### Como Obter o Token

1. Registre-se ou faça login em `/api/auth/login` ou `/api/auth/register`
2. Receba o token JWT na resposta
3. Inclua o token em todas as requisições protegidas

### Headers Obrigatórios

```http
Authorization: Bearer <seu_token_jwt_aqui>
Content-Type: application/json
```

### Exemplo de Requisição Autenticada

```bash
curl -X GET https://nauticair-api.onrender.com/api/devices \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -H "Content-Type: application/json"
```

### Tempo de Expiração

- **Validade do Token**: 7 dias
- Após expirar, é necessário fazer login novamente

---

## 🌐 Base URL

### Produção

```
https://nauticair-api.onrender.com
```

### Desenvolvimento

```
http://localhost:3000
```

---

## 📡 Endpoints

### Endpoints de Autenticação

#### 1. Registrar Novo Usuário

**POST** `/api/auth/register`

Cria uma nova conta de usuário no sistema.

**Headers**
```http
Content-Type: application/json
```

**Body (JSON)**
```json
{
  "name": "João Silva",
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (201 Created)**
```json
{
  "success": true,
  "message": "Usuário registrado com sucesso",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "João Silva",
      "email": "joao@example.com",
      "is_2fa_enabled": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Erros Possíveis**
- `409 Conflict` - Email já cadastrado
- `400 Bad Request` - Campos obrigatórios ausentes

---

#### 2. Login

**POST** `/api/auth/login`

Realiza autenticação e retorna token JWT.

**Body (JSON)**
```json
{
  "email": "joao@example.com",
  "password": "senha123"
}
```

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "message": "Login realizado com sucesso",
  "data": {
    "user": {
      "id": "550e8400-e29b-41d4-a716-446655440000",
      "name": "João Silva",
      "email": "joao@example.com",
      "is_2fa_enabled": false
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

**Erros Possíveis**
- `401 Unauthorized` - Email ou senha incorretos

---

#### 3. Buscar Dados do Usuário Autenticado

**GET** `/api/auth/me`

Retorna informações do usuário logado.

**Headers**
```http
Authorization: Bearer <token>
```

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "João Silva",
    "email": "joao@example.com",
    "is_2fa_enabled": false,
    "createdAt": "2025-10-01T10:00:00.000Z"
  }
}
```

---

### Endpoints de Dispositivos IoT

#### 4. Cadastrar Dispositivo

**POST** `/api/devices`

Cadastra um novo dispositivo IoT vinculado ao usuário.

**Headers**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON)**
```json
{
  "name": "NauticAir Porto Santos #1",
  "status": "connected"
}
```

**Campos**
- `name` (string, obrigatório): Nome do dispositivo
- `status` (enum, opcional): `connected` ou `disconnected` (padrão: `disconnected`)

**Resposta de Sucesso (201 Created)**
```json
{
  "success": true,
  "message": "Dispositivo IoT cadastrado com sucesso",
  "data": {
    "id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "NauticAir Porto Santos #1",
    "status": "connected",
    "createdAt": "2025-10-02T14:30:00.000Z",
    "updatedAt": "2025-10-02T14:30:00.000Z"
  }
}
```

---

#### 5. Listar Dispositivos

**GET** `/api/devices`

Lista todos os dispositivos do usuário autenticado.

**Headers**
```http
Authorization: Bearer <token>
```

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
      "name": "NauticAir Porto Santos #1",
      "status": "connected",
      "createdAt": "2025-10-02T14:30:00.000Z",
      "updatedAt": "2025-10-02T14:30:00.000Z"
    }
  ]
}
```

---

#### 6. Atualizar Dispositivo

**PUT** `/api/devices/:id`

Atualiza informações de um dispositivo.

**Headers**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON)**
```json
{
  "name": "NauticAir Porto Santos #1 - Atualizado",
  "status": "disconnected"
}
```

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "message": "Dispositivo atualizado com sucesso",
  "data": {
    "id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
    "name": "NauticAir Porto Santos #1 - Atualizado",
    "status": "disconnected"
  }
}
```

---

#### 7. Remover Dispositivo

**DELETE** `/api/devices/:id`

Remove um dispositivo do sistema.

**Headers**
```http
Authorization: Bearer <token>
```

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "message": "Dispositivo removido com sucesso"
}
```

---

### Endpoints de Medições

#### 8. Registrar Medição (IoT - SEM AUTENTICAÇÃO)

**POST** `/api/measurements/iot`

🔓 **Endpoint público** - Usado pelo ESP32 para enviar medições.

**Headers**
```http
Content-Type: application/json
```

**Body (JSON)**
```json
{
  "device_id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
  "co_ppm": 45.3,
  "co2_gph": 120.5,
  "duration_h": 2.5
}
```

**Campos**
- `device_id` (UUID, obrigatório): ID do dispositivo
- `co_ppm` (float, obrigatório): Concentração de CO em PPM (Parts Per Million)
- `co2_gph` (float, obrigatório): Emissão de CO2 em g/h (gramas por hora)
- `duration_h` (float, opcional): Duração da medição em horas

**Resposta de Sucesso (201 Created)**
```json
{
  "success": true,
  "message": "Medição registrada com sucesso",
  "data": {
    "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
    "device_id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
    "co_ppm": 45.3,
    "co2_gph": 120.5,
    "duration_h": 2.5,
    "createdAt": "2025-10-03T10:15:30.000Z"
  }
}
```

**Comportamento Automático**
- ✅ Atualiza status do dispositivo para `connected` automaticamente
- ✅ Cria alertas automaticamente baseado no nível de CO (LED verde/amarelo/vermelho)

**Limites de Classificação de Alertas**
- **Verde (Positivo)**: CO < 50 PPM
- **Amarelo (Alerta)**: 50 ≤ CO < 100 PPM
- **Vermelho (Crítico)**: CO ≥ 100 PPM

---

#### 9. Registrar Medição (COM AUTENTICAÇÃO)

**POST** `/api/measurements`

🔒 Mesmo endpoint, mas requer autenticação JWT.

**Headers**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

*(Corpo e resposta idênticos ao endpoint `/iot`)*

---

#### 10. Listar Medições

**GET** `/api/measurements`

Lista medições com filtros opcionais.

**Headers**
```http
Authorization: Bearer <token>
```

**Query Parameters**
- `device_id` (UUID, opcional): Filtrar por dispositivo específico
- `start_date` (ISO 8601, opcional): Data inicial (ex: `2025-10-01T00:00:00Z`)
- `end_date` (ISO 8601, opcional): Data final
- `limit` (int, opcional, padrão: 50): Número de resultados por página
- `offset` (int, opcional, padrão: 0): Paginação

**Exemplo de URL**
```
GET /api/measurements?device_id=9856baa0-2cff-4d14-b9c9-b9b97739a00c&limit=10&offset=0
```

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
      "device_id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
      "co_ppm": 45.3,
      "co2_gph": 120.5,
      "duration_h": 2.5,
      "createdAt": "2025-10-03T10:15:30.000Z",
      "Device": {
        "id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
        "name": "NauticAir Porto Santos #1",
        "status": "connected"
      }
    }
  ],
  "pagination": {
    "total": 150,
    "limit": 10,
    "offset": 0
  }
}
```

---

#### 11. Resumo de Medições (Dashboard)

**GET** `/api/measurements/summary`

Retorna dados agregados para exibição em dashboards.

**Headers**
```http
Authorization: Bearer <token>
```

**Query Parameters**
- `device_id` (UUID, opcional): Filtrar por dispositivo
- `start_date` (ISO 8601, opcional): Data inicial
- `end_date` (ISO 8601, opcional): Data final

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "data": {
    "total_measurements": 1523,
    "avg_co_ppm": "42.35",
    "avg_co2_gph": "115.20",
    "max_co_ppm": "98.50",
    "max_co2_gph": "205.30",
    "devices_count": 3
  }
}
```

---

### Endpoints de Alertas

#### 12. Listar Alertas

**GET** `/api/alerts`

Lista alertas gerados automaticamente pelo sistema.

**Headers**
```http
Authorization: Bearer <token>
```

**Query Parameters**
- `type` (enum, opcional): Filtrar por tipo (`positivo`, `alerta`, `crítico`)
- `limit` (int, opcional, padrão: 50)
- `offset` (int, opcional, padrão: 0)

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "id": "alert-123",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "type": "crítico",
      "message": "Saldo negativo! CO em 105 PPM no dispositivo 'NauticAir Porto Santos #1'.",
      "emission_level": 52,
      "created_at": "2025-10-03T11:20:00.000Z"
    }
  ],
  "pagination": {
    "total": 45,
    "limit": 50,
    "offset": 0
  }
}
```

**Tipos de Alerta**
- `positivo` 🟢: Emissões normais (CO < 50 PPM)
- `alerta` 🟡: Emissões moderadas (50 ≤ CO < 100 PPM)
- `crítico` 🔴: Emissões críticas (CO ≥ 100 PPM)

**Campo `emission_level`**
- Porcentagem de emissão (0-100%) para exibição em barras de progresso
- Calculado como: `(CO_PPM / 200) * 100`, limitado a 100%

---

#### 13. Estatísticas de Alertas

**GET** `/api/alerts/stats`

Retorna estatísticas agregadas de alertas.

**Headers**
```http
Authorization: Bearer <token>
```

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "data": {
    "positivos": 120,
    "alertas": 25,
    "criticos": 8,
    "total": 153
  }
}
```

---

### Endpoints de Histórico de Rotas

#### 14. Registrar Rota

**POST** `/api/routes-history`

Registra uma nova rota no histórico.

**Headers**
```http
Authorization: Bearer <token>
Content-Type: application/json
```

**Body (JSON)**
```json
{
  "route": "Santos → Guarujá",
  "duration_h": 3.5,
  "responsible": "Capitão João Silva",
  "device_id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
  "co2_credits": 12.5,
  "status": "confirmado"
}
```

**Campos**
- `route` (string, obrigatório): Nome/descrição da rota
- `duration_h` (float, obrigatório): Duração em horas
- `responsible` (string, obrigatório): Responsável pela embarcação
- `device_id` (UUID, obrigatório): ID do dispositivo usado
- `co2_credits` (float, obrigatório): Créditos de carbono calculados
- `status` (enum, obrigatório): `positivo`, `confirmado`, `alerta`, `crítico`

**Resposta de Sucesso (201 Created)**
```json
{
  "success": true,
  "message": "Rota registrada com sucesso",
  "data": {
    "id": "route-abc123",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "route": "Santos → Guarujá",
    "duration_h": 3.5,
    "responsible": "Capitão João Silva",
    "device_id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
    "co2_credits": 12.5,
    "status": "confirmado",
    "created_at": "2025-10-05T09:00:00.000Z"
  }
}
```

---

#### 15. Listar Histórico de Rotas

**GET** `/api/routes-history`

Lista o histórico de rotas do usuário.

**Headers**
```http
Authorization: Bearer <token>
```

**Query Parameters**
- `status` (enum, opcional): Filtrar por status
- `device_id` (UUID, opcional): Filtrar por dispositivo
- `limit` (int, opcional, padrão: 50)
- `offset` (int, opcional, padrão: 0)

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "data": [
    {
      "id": "route-abc123",
      "route": "Santos → Guarujá",
      "duration_h": 3.5,
      "responsible": "Capitão João Silva",
      "co2_credits": 12.5,
      "status": "confirmado",
      "created_at": "2025-10-05T09:00:00.000Z",
      "Device": {
        "id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
        "name": "NauticAir Porto Santos #1"
      }
    }
  ],
  "pagination": {
    "total": 42,
    "limit": 50,
    "offset": 0
  }
}
```

---

#### 16. Estatísticas de Rotas

**GET** `/api/routes-history/stats`

Retorna estatísticas agregadas das rotas.

**Headers**
```http
Authorization: Bearer <token>
```

**Resposta de Sucesso (200 OK)**
```json
{
  "success": true,
  "data": {
    "total": 42,
    "positivos": 25,
    "confirmados": 10,
    "alertas": 5,
    "criticos": 2,
    "total_co2_credits": 523.75
  }
}
```

---

## 📊 Modelos de Dados

### User (Usuário)

```typescript
{
  id: UUID,
  name: string,
  email: string (unique),
  password_hash: string,
  is_2fa_enabled: boolean,
  two_factor_code: string | null,
  created_at: datetime,
  updated_at: datetime
}
```

### Device (Dispositivo IoT)

```typescript
{
  id: UUID,
  user_id: UUID (FK -> users),
  name: string,
  status: "connected" | "disconnected",
  created_at: datetime,
  updated_at: datetime
}
```

### Measurement (Medição)

```typescript
{
  id: UUID,
  device_id: UUID (FK -> devices),
  co_ppm: float,        // Concentração de CO em PPM
  co2_gph: float,       // Emissão de CO2 em g/h
  duration_h: float | null,
  created_at: datetime,
  updated_at: datetime
}
```

### Alert (Alerta)

```typescript
{
  id: UUID,
  user_id: UUID (FK -> users),
  type: "positivo" | "alerta" | "crítico",
  message: string,
  emission_level: integer (0-100), // Porcentagem para barra de progresso
  created_at: datetime
}
```

### RoutesHistory (Histórico de Rotas)

```typescript
{
  id: UUID,
  user_id: UUID (FK -> users),
  route: string,
  duration_h: float,
  responsible: string,
  device_id: UUID (FK -> devices),
  co2_credits: float,
  status: "positivo" | "confirmado" | "alerta" | "crítico",
  created_at: datetime,
  updated_at: datetime
}
```

---

## 🔢 Códigos de Status HTTP

| Código | Significado | Uso |
|--------|-------------|-----|
| `200` | OK | Requisição bem-sucedida |
| `201` | Created | Recurso criado com sucesso |
| `400` | Bad Request | Dados inválidos ou campos faltando |
| `401` | Unauthorized | Token ausente, inválido ou expirado |
| `404` | Not Found | Recurso não encontrado |
| `409` | Conflict | Conflito (ex: email já existe) |
| `500` | Internal Server Error | Erro interno do servidor |

---

## 💡 Exemplos de Uso

### Exemplo 1: Fluxo Completo de Registro e Login

```bash
# 1. Registrar novo usuário
curl -X POST https://nauticair-api.onrender.com/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Maria Santos",
    "email": "maria@nauticair.com",
    "password": "senha123"
  }'

# Resposta:
# {
#   "success": true,
#   "data": {
#     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
#     "user": { ... }
#   }
# }

# 2. Salvar o token e usar em requisições futuras
TOKEN="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."

# 3. Buscar dados do usuário
curl -X GET https://nauticair-api.onrender.com/api/auth/me \
  -H "Authorization: Bearer $TOKEN"
```

### Exemplo 2: Cadastrar Dispositivo e Enviar Medições

```bash
# 1. Cadastrar dispositivo
curl -X POST https://nauticair-api.onrender.com/api/devices \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "NauticAir Navio Cargueiro",
    "status": "connected"
  }'

# Resposta contém device_id: "9856baa0-..."

# 2. Enviar medição (sem autenticação - para IoT)
curl -X POST https://nauticair-api.onrender.com/api/measurements/iot \
  -H "Content-Type: application/json" \
  -d '{
    "device_id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
    "co_ppm": 65.5,
    "co2_gph": 145.2,
    "duration_h": 1.5
  }'
```

### Exemplo 3: Consultar Dashboard de Medições

```bash
# Buscar resumo de medições dos últimos 30 dias
curl -X GET "https://nauticair-api.onrender.com/api/measurements/summary?start_date=2025-10-01T00:00:00Z&end_date=2025-10-30T23:59:59Z" \
  -H "Authorization: Bearer $TOKEN"
```

---

## ⚠️ Tratamento de Erros

Todos os erros seguem o mesmo formato JSON:

```json
{
  "success": false,
  "message": "Descrição do erro",
  "errors": ["Detalhes adicionais (opcional)"]
}
```

### Exemplos de Erros Comuns

**Token Ausente**
```json
{
  "success": false,
  "message": "Token não fornecido"
}
```

**Token Inválido**
```json
{
  "success": false,
  "message": "Token inválido"
}
```

**Token Expirado**
```json
{
  "success": false,
  "message": "Token expirado"
}
```

**Campos Obrigatórios Faltando**
```json
{
  "success": false,
  "message": "Campos obrigatórios ausentes",
  "missingFields": ["email", "password"]
}
```

**Email Já Cadastrado**
```json
{
  "success": false,
  "message": "Email já cadastrado"
}
```

**Dispositivo Não Encontrado**
```json
{
  "success": false,
  "message": "Dispositivo não encontrado ou não pertence ao usuário"
}
```

---

## 🚀 Deploy e Ambiente

### URL de Produção

```
https://nauticair-api.onrender.com
```

### Variáveis de Ambiente Necessárias

```env
# Banco de Dados
DATABASE_URL=postgresql://user:password@host:5432/database

# JWT
JWT_SECRET=seu_segredo_super_secreto_aqui

# Servidor
PORT=3000
NODE_ENV=production

# Bcrypt
BCRYPT_SALT_ROUNDS=10
```

---

## 📚 Referências

- **Repositório GitHub**: https://github.com/andreiolicar/NauticAir
- **Documentação do Banco de Dados**: `DATABASE_SCHEMA.md`
- **Documentação do IoT**: `IOT_SETUP.md`
- **Autores**: Andrei Carneiro, Millena Nunes
- **Instituição**: ETEC Zona Leste

---

**Última Atualização**: Fevereiro de 2026  
**Versão da API**: v1.0.0