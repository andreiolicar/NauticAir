# 📊 Documentação do Banco de Dados - NauticAir

## Visão Geral

O NauticAir utiliza **PostgreSQL** como sistema de gerenciamento de banco de dados relacional (SGBD). A estrutura foi projetada para armazenar dados de usuários, dispositivos IoT, medições ambientais, alertas e histórico de rotas.

---

## Configuração e Ambiente

### Tecnologias
- **SGBD**: PostgreSQL 14+
- **ORM**: Sequelize 6.37.7
- **Extensões**: `uuid-ossp` (para geração de UUIDs)

### Configuração de Conexão

```javascript
// sequelize.config.js
{
  development: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    logging: false
  },
  production: {
    url: process.env.DATABASE_URL,
    dialect: 'postgres',
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
    logging: false
  }
}
```

### Variáveis de Ambiente

```bash
DATABASE_URL=postgresql://user:password@host:5432/database_name
```

---

## Estrutura do Banco de Dados

### Diagrama de Relacionamentos (ER)

```
┌─────────────┐
│    users    │
│ (PK: id)    │
└──────┬──────┘
       │ 1
       │
       │ N
       ├────────────┬──────────────┬─────────────┐
       │            │              │             │
       ▼            ▼              ▼             ▼
┌──────────┐ ┌──────────┐  ┌───────────┐ ┌──────────────┐
│ devices  │ │  alerts  │  │measurements│ │routes_history│
│(PK: id)  │ │(PK: id)  │  │ (PK: id)  │ │  (PK: id)    │
│(FK:usr_id)│(FK:usr_id)│  │(FK:dev_id)│ │(FK:usr_id)   │
└────┬─────┘ └──────────┘  └───────────┘ │(FK:dev_id)   │
     │ 1                                  └──────────────┘
     │
     │ N
     ├──────────────┬───────────────┐
     ▼              ▼               ▼
┌─────────────┐ ┌──────────┐ ┌──────────────┐
│measurements │ │  (vazio) │ │routes_history│
│             │ │          │ │              │
└─────────────┘ └──────────┘ └──────────────┘
```

---

## Tabelas do Banco de Dados

### 1. **users** (Usuários)

Armazena informações dos usuários cadastrados na plataforma.

#### Estrutura

| Campo            | Tipo         | Restrições                  | Descrição                              |
|------------------|--------------|-----------------------------|----------------------------------------|
| `id`             | UUID         | PK, NOT NULL, DEFAULT uuid_v4() | Identificador único do usuário         |
| `name`           | VARCHAR(100) | NOT NULL                    | Nome do usuário                        |
| `email`          | VARCHAR(100) | NOT NULL, UNIQUE            | Email (usado para login)               |
| `password_hash`  | TEXT         | NOT NULL                    | Hash bcrypt da senha                   |
| `is_2fa_enabled` | BOOLEAN      | NOT NULL, DEFAULT false     | Flag de autenticação 2FA               |
| `two_factor_code`| VARCHAR(6)   | NULL                        | Código temporário para 2FA             |
| `created_at`     | TIMESTAMP    | NOT NULL, DEFAULT NOW()     | Data de criação do registro            |
| `updated_at`     | TIMESTAMP    | NOT NULL, DEFAULT NOW()     | Data de última atualização             |

#### Índices
- **PRIMARY KEY**: `id`
- **INDEX**: `email` (para otimizar login)

#### Relacionamentos
- **1:N** com `devices` (um usuário pode ter vários dispositivos)
- **1:N** com `alerts` (um usuário pode ter vários alertas)
- **1:N** com `routes_history` (um usuário pode ter várias rotas)

#### Exemplo de Registro

```json
{
  "id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "João Silva",
  "email": "joao@nauticair.com",
  "password_hash": "$2b$10$...",
  "is_2fa_enabled": false,
  "two_factor_code": null,
  "created_at": "2025-01-15T10:30:00.000Z",
  "updated_at": "2025-01-15T10:30:00.000Z"
}
```

---

### 2. **devices** (Dispositivos IoT)

Armazena os dispositivos IoT NauticAir cadastrados pelos usuários.

#### Estrutura

| Campo       | Tipo                           | Restrições                  | Descrição                              |
|-------------|--------------------------------|-----------------------------|----------------------------------------|
| `id`        | UUID                           | PK, NOT NULL, DEFAULT uuid_v4() | Identificador único do dispositivo     |
| `user_id`   | UUID                           | FK → users(id), NOT NULL, ON DELETE CASCADE | Proprietário do dispositivo            |
| `name`      | VARCHAR(100)                   | NOT NULL                    | Nome identificador do dispositivo      |
| `status`    | ENUM('connected', 'disconnected') | NOT NULL                    | Status de conexão do dispositivo       |
| `created_at`| TIMESTAMP                      | NOT NULL, DEFAULT NOW()     | Data de cadastro do dispositivo        |
| `updated_at`| TIMESTAMP                      | NOT NULL, DEFAULT NOW()     | Data de última atualização             |

#### Índices
- **PRIMARY KEY**: `id`
- **INDEX**: `user_id` (para otimizar buscas por usuário)

#### Relacionamentos
- **N:1** com `users` (um dispositivo pertence a um usuário)
- **1:N** com `measurements` (um dispositivo gera várias medições)
- **1:N** com `routes_history` (um dispositivo pode estar em várias rotas)

#### Regras de Negócio
- Quando uma medição é registrada, o status do dispositivo é automaticamente atualizado para `connected`

#### Exemplo de Registro

```json
{
  "id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
  "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "name": "NauticAir IoT - Porto de Santos",
  "status": "connected",
  "created_at": "2025-01-15T14:20:00.000Z",
  "updated_at": "2025-01-15T18:45:00.000Z"
}
```

---

### 3. **measurements** (Medições)

Armazena as medições de CO e CO₂ enviadas pelos dispositivos IoT.

#### Estrutura

| Campo        | Tipo      | Restrições                  | Descrição                              |
|--------------|-----------|-----------------------------|----------------------------------------|
| `id`         | UUID      | PK, NOT NULL, DEFAULT uuid_v4() | Identificador único da medição         |
| `device_id`  | UUID      | FK → devices(id), NOT NULL, ON DELETE CASCADE | Dispositivo que gerou a medição        |
| `co_ppm`     | FLOAT     | NOT NULL                    | Nível de monóxido de carbono (PPM)     |
| `co2_gph`    | FLOAT     | NOT NULL                    | Emissão de CO₂ (gramas por hora)       |
| `duration_h` | FLOAT     | NULL                        | Duração da medição (horas)             |
| `created_at` | TIMESTAMP | NOT NULL, DEFAULT NOW()     | Data/hora da medição                   |
| `updated_at` | TIMESTAMP | NOT NULL, DEFAULT NOW()     | Data de última atualização             |

#### Índices
- **PRIMARY KEY**: `id`
- **INDEX**: `device_id, created_at` (para otimizar consultas temporais por dispositivo)

#### Relacionamentos
- **N:1** com `devices` (uma medição pertence a um dispositivo)

#### Lógica de Alertas
Quando uma medição é criada, o sistema automaticamente:
1. Classifica o nível de CO em três categorias:
   - 🟢 **Positivo** (CO < 50 PPM)
   - 🟡 **Alerta** (50 ≤ CO < 100 PPM)
   - 🔴 **Crítico** (CO ≥ 100 PPM)
2. Se houve mudança de categoria, cria um alerta automaticamente na tabela `alerts`

#### Exemplo de Registro

```json
{
  "id": "f1e2d3c4-b5a6-9870-1234-567890abcdef",
  "device_id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
  "co_ppm": 45.3,
  "co2_gph": 12.8,
  "duration_h": 2.5,
  "created_at": "2025-01-15T18:45:23.000Z",
  "updated_at": "2025-01-15T18:45:23.000Z"
}
```

---

### 4. **alerts** (Alertas)

Armazena alertas gerados automaticamente baseados nos níveis de emissão.

#### Estrutura

| Campo            | Tipo                              | Restrições                  | Descrição                              |
|------------------|-----------------------------------|-----------------------------|----------------------------------------|
| `id`             | UUID                              | PK, NOT NULL, DEFAULT uuid_v4() | Identificador único do alerta          |
| `user_id`        | UUID                              | FK → users(id), NOT NULL, ON DELETE CASCADE | Usuário que receberá o alerta          |
| `type`           | ENUM('positivo', 'alerta', 'crítico') | NOT NULL                    | Tipo/severidade do alerta              |
| `message`        | TEXT                              | NOT NULL                    | Mensagem descritiva do alerta          |
| `emission_level` | INTEGER                           | NOT NULL, DEFAULT 0, CHECK (0-100) | Porcentagem de emissão (0-100%)        |
| `created_at`     | TIMESTAMP                         | NOT NULL, DEFAULT NOW()     | Data/hora da criação do alerta         |

#### Índices
- **PRIMARY KEY**: `id`
- **INDEX**: `user_id, created_at` (para otimizar buscas temporais por usuário)

#### Relacionamentos
- **N:1** com `users` (um alerta pertence a um usuário)

#### Regras de Negócio
- Alertas são criados **automaticamente** quando uma medição causa mudança de categoria (verde → amarelo → vermelho)
- O campo `emission_level` é calculado como: `(CO_PPM / 200) * 100`, limitado a 100%
- Usado para renderizar barras de progresso no frontend

#### Tipos de Alerta

| Tipo       | Condição        | Cor LED | Descrição                        |
|------------|-----------------|---------|----------------------------------|
| `positivo` | CO < 50 PPM     | 🟢 Verde | Emissões dentro do normal        |
| `alerta`   | 50 ≤ CO < 100 PPM | 🟡 Amarelo | Emissões em nível de atenção     |
| `crítico`  | CO ≥ 100 PPM    | 🔴 Vermelho | Emissões acima do limite aceitável |

#### Exemplo de Registro

```json
{
  "id": "a9b8c7d6-e5f4-3210-9876-fedcba098765",
  "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "type": "alerta",
  "message": "Emissão em alerta! CO em 75.2 PPM no dispositivo 'NauticAir IoT - Porto de Santos'.",
  "emission_level": 38,
  "created_at": "2025-01-15T19:10:45.000Z"
}
```

---

### 5. **routes_history** (Histórico de Rotas)

Armazena o histórico de rotas realizadas pelas embarcações monitoradas.

#### Estrutura

| Campo        | Tipo                                        | Restrições                  | Descrição                              |
|--------------|---------------------------------------------|-----------------------------|----------------------------------------|
| `id`         | UUID                                        | PK, NOT NULL, DEFAULT uuid_v4() | Identificador único da rota            |
| `user_id`    | UUID                                        | FK → users(id), NOT NULL, ON DELETE CASCADE | Usuário proprietário                   |
| `route`      | VARCHAR(50)                                 | NOT NULL                    | Nome/identificador da rota             |
| `duration_h` | FLOAT                                       | NOT NULL                    | Duração da rota (horas)                |
| `responsible`| VARCHAR(100)                                | NOT NULL                    | Responsável pela rota                  |
| `device_id`  | UUID                                        | FK → devices(id), NOT NULL, ON DELETE CASCADE | Dispositivo usado na rota              |
| `co2_credits`| FLOAT                                       | NOT NULL                    | Créditos de carbono gerados            |
| `status`     | ENUM('positivo', 'confirmado', 'alerta', 'crítico') | NOT NULL                    | Status ambiental da rota               |
| `created_at` | TIMESTAMP                                   | NOT NULL, DEFAULT NOW()     | Data de registro da rota               |
| `updated_at` | TIMESTAMP                                   | NOT NULL, DEFAULT NOW()     | Data de última atualização             |

#### Índices
- **PRIMARY KEY**: `id`
- **INDEX**: `user_id, created_at` (para histórico cronológico por usuário)
- **INDEX**: `device_id` (para buscar rotas por dispositivo)

#### Relacionamentos
- **N:1** com `users` (uma rota pertence a um usuário)
- **N:1** com `devices` (uma rota usa um dispositivo)

#### Status da Rota

| Status       | Descrição                                |
|--------------|------------------------------------------|
| `positivo`   | Rota com emissões normais                |
| `confirmado` | Rota aprovada/validada                   |
| `alerta`     | Rota com emissões em nível de atenção    |
| `crítico`    | Rota com emissões críticas               |

#### Exemplo de Registro

```json
{
  "id": "11223344-5566-7788-99aa-bbccddeeff00",
  "user_id": "a1b2c3d4-e5f6-7890-abcd-ef1234567890",
  "route": "Santos → Guarujá",
  "duration_h": 3.2,
  "responsible": "Capitão João Silva",
  "device_id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
  "co2_credits": 5.8,
  "status": "positivo",
  "created_at": "2025-01-15T20:30:00.000Z",
  "updated_at": "2025-01-15T20:30:00.000Z"
}
```

---

## Migrations (Histórico de Alterações)

O NauticAir usa Sequelize CLI para gerenciar migrations. Abaixo está a ordem cronológica das migrations aplicadas:

### Lista de Migrations

1. **20251001224310-enable-uuid-extension.js**
   - Habilita a extensão `uuid-ossp` para geração automática de UUIDs

2. **20251002021319-create-users.js**
   - Cria tabela `users` com campos básicos

3. **20251002021359-create-devices.js**
   - Cria tabela `devices` com FK para `users`

4. **20251002021608-create-measurements.js**
   - Cria tabela `measurements` com FK para `devices`

5. **20251002021624-create-alerts.js**
   - Cria tabela `alerts` com FK para `users`

6. **20251002021636-create-routes-history.js**
   - Cria tabela `routes_history` com FK para `users` e `devices`

7. **20251004020000-add-is-2fa-to-users.js**
   - Adiciona campo `is_2fa_enabled` à tabela `users`

8. **20251004154722-add-timestamps-to-measurements.js**
   - Adiciona campos `created_at` e `updated_at` à tabela `measurements`

9. **20251004230000-add-emission-level-to-alerts.js**
   - Adiciona campo `emission_level` à tabela `alerts` com constraint CHECK (0-100)

10. **20251005024342-add-updated-at-to-routes-history.js**
    - Adiciona campo `updated_at` à tabela `routes_history`

---

## Seeders (Dados Iniciais)

O projeto inclui seeders para popular o banco com dados de exemplo.

### Lista de Seeders

1. **20251003131145-admin-user.js**
   - Cria usuário administrador: `admin@nauticair.com` (senha: `admin123`)

2. **20251003131205-example-device.js**
   - Cria dispositivo de exemplo vinculado ao usuário admin

3. **20251003131221-example-alert.js**
   - Cria alerta de exemplo para o usuário admin

4. **20251003131242-example-route-history.js**
   - Cria rota de exemplo no histórico

### Executar Seeders

```bash
npm run db:seed
```

---

## Comandos de Gerenciamento

### Migrations

```bash
# Executar todas as migrations pendentes
npm run db:migrate

# Reverter última migration
npx sequelize-cli db:migrate:undo

# Reverter todas as migrations
npx sequelize-cli db:migrate:undo:all
```

### Seeders

```bash
# Executar todos os seeders
npm run db:seed

# Reverter último seeder
npx sequelize-cli db:seed:undo

# Reverter todos os seeders
npx sequelize-cli db:seed:undo:all
```

---

## Considerações de Performance

### Índices Recomendados

Todos os índices necessários já estão aplicados nas migrations:
- `users.email` - Para otimizar login
- `devices.user_id` - Para buscar dispositivos por usuário
- `measurements.device_id, measurements.created_at` - Para consultas temporais
- `alerts.user_id, alerts.created_at` - Para listar alertas cronologicamente
- `routes_history.user_id, routes_history.created_at` - Para histórico de rotas
- `routes_history.device_id` - Para buscar rotas por dispositivo

### Otimizações Aplicadas

1. **UUIDs**: Uso de UUIDs v4 evita conflitos em ambientes distribuídos
2. **ON DELETE CASCADE**: Remoção automática de registros dependentes
3. **Índices Compostos**: Otimizam queries que filtram por usuário + data
4. **ENUM Types**: Economizam espaço e garantem integridade de dados
5. **Timestamps Automáticos**: `created_at` e `updated_at` gerenciados pelo Sequelize

---

## Integridade Referencial

### Regras de Deleção em Cascata

- **Remover usuário** → Remove automaticamente:
  - Todos os seus dispositivos
  - Todos os seus alertas
  - Todas as suas rotas
  
- **Remover dispositivo** → Remove automaticamente:
  - Todas as suas medições
  - Todas as rotas que o utilizaram

### Constraints CHECK

- **alerts.emission_level**: Deve estar entre 0 e 100

---

## Segurança

### Dados Sensíveis

- **Senhas**: Armazenadas usando bcrypt hash (campo `password_hash`)
- **2FA**: Códigos temporários de 6 dígitos (campo `two_factor_code`)

### Conexão SSL

Em produção, a conexão com PostgreSQL usa SSL:

```javascript
dialectOptions: {
  ssl: {
    require: true,
    rejectUnauthorized: false
  }
}
```

---

## Backup e Manutenção

### Recomendações de Backup

```bash
# Backup completo do banco
pg_dump $DATABASE_URL > nauticair_backup_$(date +%Y%m%d).sql

# Restore do backup
psql $DATABASE_URL < nauticair_backup_20250115.sql
```

### Logs e Monitoramento

- Em desenvolvimento: `logging: false` (desabilitado)
- Em produção: Recomenda-se habilitar logging para auditoria

---

## Próximos Passos

Possíveis melhorias futuras na estrutura do banco:

1. **Particionamento da tabela `measurements`** por data (para escalar grandes volumes)
2. **Tabela de logs de auditoria** para rastrear alterações críticas
3. **Soft deletes** (deleção lógica) para preservar histórico
4. **Índices GIN/GiST** para buscas full-text em mensagens de alertas
5. **Views materializadas** para dashboards com agregações pesadas

---

**Documentação gerada em**: 14 de fevereiro de 2026  
**Versão do Schema**: 1.0  
**Última Migration**: 20251005024342
