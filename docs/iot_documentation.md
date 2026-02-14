# 📡 Documentação do Sistema IoT - NauticAir

## Índice
1. [Visão Geral](#visão-geral)
2. [Especificações de Hardware](#especificações-de-hardware)
3. [Pinagem e Conexões](#pinagem-e-conexões)
4. [Sensores](#sensores)
5. [Sistema de LEDs](#sistema-de-leds)
6. [Comunicação WiFi](#comunicação-wifi)
7. [Fluxo de Dados](#fluxo-de-dados)
8. [Código do Firmware](#código-do-firmware)
9. [Configuração e Deploy](#configuração-e-deploy)
10. [Troubleshooting](#troubleshooting)

---

## Visão Geral

O sistema IoT do NauticAir é baseado em um **ESP32** que coleta dados de emissões de CO e CO₂ através de sensores MQ e transmite essas informações para a API REST via WiFi.

### Arquitetura do Sistema

```
┌─────────────┐
│   ESP-32    │
│             │
│ ┌─────────┐ │      WiFi        ┌──────────────┐
│ │ MQ-135  │ ├──────────────────►│  API REST    │
│ └─────────┘ │     HTTP POST     │              │
│             │                   │  PostgreSQL  │
│ ┌─────────┐ │                   └──────────────┘
│ │  MQ-7   │ │
│ └─────────┘ │
│             │
│ ┌─────────┐ │
│ │  LEDs   │ │ ← Indicadores visuais
│ └─────────┘ │
└─────────────┘
```

### Principais Funcionalidades

- ✅ Leitura contínua de sensores de qualidade do ar
- ✅ Classificação automática (Bom/Médio/Ruim)
- ✅ Indicação visual por LEDs (Verde/Amarelo/Vermelho)
- ✅ Transmissão de dados via WiFi para API REST
- ✅ Reconexão automática em caso de queda de WiFi
- ✅ Conversão de valores analógicos para PPM e g/h

---

## Especificações de Hardware

### Microcontrolador Principal

| Componente | Especificação |
|------------|---------------|
| **Modelo** | ESP32 DevKit v1 |
| **CPU** | Dual-core Xtensa 32-bit LX6 @ 240MHz |
| **RAM** | 520 KB SRAM |
| **Flash** | 4 MB |
| **WiFi** | 802.11 b/g/n (2.4 GHz) |
| **Tensão** | 3.3V (tolerância 5V em alguns pinos) |
| **Pinos Analógicos** | 18 canais ADC de 12 bits |
| **GPIO** | 34 pinos programáveis |

### Sensores Utilizados

#### 1. **MQ-135** - Sensor de Qualidade do Ar

| Parâmetro | Valor |
|-----------|-------|
| **Detecção** | NH₃, NOₓ, CO₂, Benzeno, Fumaça, Álcool |
| **Faixa de Detecção** | 10 - 1000 ppm |
| **Tensão de Operação** | 5V DC |
| **Saída** | Analógica (0-4095 no ESP32) |
| **Tempo de Aquecimento** | ~24h (calibração ideal), ~3min (uso mínimo) |

#### 2. **MQ-7** - Sensor de Monóxido de Carbono (CO)

| Parâmetro | Valor |
|-----------|-------|
| **Detecção** | Monóxido de Carbono (CO) |
| **Faixa de Detecção** | 20 - 2000 ppm |
| **Tensão de Operação** | 5V DC |
| **Saída** | Analógica (0-4095 no ESP32) |
| **Tempo de Aquecimento** | ~48h (calibração ideal), ~5min (uso mínimo) |

### Indicadores Visuais (LEDs)

| LED | Cor | Tensão | Resistor |
|-----|-----|--------|----------|
| LED Verde | 🟢 Verde | 2.0-2.2V | 220Ω |
| LED Amarelo | 🟡 Amarelo | 2.0-2.2V | 220Ω |
| LED Vermelho | 🔴 Vermelho | 1.8-2.0V | 220Ω |

---

## Pinagem e Conexões

### Esquema de Ligação

```
ESP32 DevKit v1
┌─────────────────────┐
│                     │
│  GPIO 34 ───────────┼──► MQ-135 (AO)
│  GPIO 32 ───────────┼──► MQ-7 (AO)
│                     │
│  GPIO 25 ───[220Ω]──┼──► LED Verde
│  GPIO 26 ───[220Ω]──┼──► LED Amarelo
│  GPIO 27 ───[220Ω]──┼──► LED Vermelho
│                     │
│  3V3 ───────────────┼──► VCC Sensores (via regulador 5V)
│  GND ───────────────┼──► GND Comum
│                     │
└─────────────────────┘
```

### Tabela de Pinagem

| Componente | Pino ESP32 | Função | Observações |
|------------|------------|--------|-------------|
| **MQ-135** | GPIO 34 | ADC1_CH6 | Entrada analógica - qualidade do ar |
| **MQ-7** | GPIO 32 | ADC1_CH4 | Entrada analógica - CO |
| **LED Verde** | GPIO 25 | Digital Output | Indica "Bom" |
| **LED Amarelo** | GPIO 26 | Digital Output | Indica "Médio" |
| **LED Vermelho** | GPIO 27 | Digital Output | Indica "Ruim" |
| **VCC Sensores** | 3V3 ou VIN | Power | 5V recomendado para sensores |
| **GND** | GND | Ground | Terra comum |

### Observações Importantes

⚠️ **Tensão dos Sensores**: Os sensores MQ operam melhor com 5V. Se usar 3.3V do ESP32, a leitura pode ser menos precisa.

⚠️ **ADC do ESP32**: O ADC do ESP32 tem resolução de 12 bits (0-4095), mas não é perfeitamente linear. Considere calibração.

⚠️ **Resistores para LEDs**: Use resistores de 220Ω para proteger os LEDs e o ESP32.

---

## Sensores

### MQ-135 - Qualidade do Ar

#### Funcionamento

O MQ-135 usa um elemento sensível de SnO₂ (dióxido de estanho) que muda sua resistência quando exposto a gases. Quanto maior a concentração de gases, menor a resistência.

#### Calibração

```cpp
// Valores de limiar (ajustáveis conforme calibração)
#define LIMIAR_VERDE 800    // Abaixo: qualidade BOA
#define LIMIAR_AMARELO 1000 // Entre 800-1000: MÉDIA
                            // Acima de 1000: RUIM
```

#### Leitura

```cpp
int valorMQ135 = analogRead(MQ135_PIN); // Retorna 0-4095
```

#### Fórmula de Conversão Simplificada

```cpp
// Conversão para CO₂ em g/h (aproximada)
float co2_gph = valorMQ135 * 0.002;
```

### MQ-7 - Monóxido de Carbono

#### Funcionamento

O MQ-7 detecta especificamente CO através de variação de condutividade do material sensor quando exposto ao gás.

#### Leitura

```cpp
int valorMQ7 = analogRead(MQ7_PIN); // Retorna 0-4095
```

#### Fórmula de Conversão Simplificada

```cpp
// Conversão para CO em PPM (partes por milhão)
float co_ppm = valorMQ7 * 0.01;
```

#### Níveis de Referência de CO

| PPM | Condição | LED |
|-----|----------|-----|
| < 50 | Normal/Seguro | 🟢 Verde |
| 50-100 | Atenção | 🟡 Amarelo |
| > 100 | Crítico | 🔴 Vermelho |

---

## Sistema de LEDs

### Lógica de Classificação

```cpp
String classificarQualidade(int valor) {
  if (valor < LIMIAR_VERDE) {
    return "Bom";      // LED Verde 🟢
  } else if (valor < LIMIAR_AMARELO) {
    return "Médio";    // LED Amarelo 🟡
  } else {
    return "Ruim";     // LED Vermelho 🔴
  }
}
```

### Função de Atualização

```cpp
void atualizarLEDs(String status) {
  if (status == "Bom") {
    digitalWrite(LED_VERDE, HIGH);
    digitalWrite(LED_AMARELO, LOW);
    digitalWrite(LED_VERMELHO, LOW);
  } else if (status == "Médio") {
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_AMARELO, HIGH);
    digitalWrite(LED_VERMELHO, LOW);
  } else {
    digitalWrite(LED_VERDE, LOW);
    digitalWrite(LED_AMARELO, LOW);
    digitalWrite(LED_VERMELHO, HIGH);
  }
}
```

### Estados dos LEDs

| Status | LED Verde | LED Amarelo | LED Vermelho | Significado |
|--------|-----------|-------------|--------------|-------------|
| Bom | ✅ ON | ❌ OFF | ❌ OFF | Qualidade do ar excelente |
| Médio | ❌ OFF | ✅ ON | ❌ OFF | Qualidade do ar aceitável |
| Ruim | ❌ OFF | ❌ OFF | ✅ ON | Qualidade do ar ruim |

---

## Comunicação WiFi

### Configuração de Rede

```cpp
const char* ssid = "SEU_WIFI_SSID";
const char* password = "SUA_SENHA_WIFI";
```

### Função de Conexão

```cpp
void conectarWiFi() {
  Serial.print("Conectando ao WiFi");
  WiFi.begin(ssid, password);

  int tentativas = 0;
  while (WiFi.status() != WL_CONNECTED && tentativas < 20) {
    delay(500);
    Serial.print(".");
    tentativas++;
  }

  if (WiFi.status() == WL_CONNECTED) {
    Serial.println("\nWiFi conectado!");
    Serial.print("IP: ");
    Serial.println(WiFi.localIP());
  } else {
    Serial.println("\nFalha ao conectar WiFi!");
  }
}
```

### Verificação Contínua

```cpp
// No loop principal
if (WiFi.status() != WL_CONNECTED) {
  Serial.println("WiFi desconectado! Reconectando...");
  conectarWiFi();
  return;
}
```

### Parâmetros de Rede

| Parâmetro | Valor |
|-----------|-------|
| **Protocolo** | HTTP/1.1 |
| **Método** | POST |
| **Content-Type** | application/json |
| **Timeout** | 10 segundos |
| **Tentativas de Reconexão** | 20 (10 segundos total) |

---

## Fluxo de Dados

### Diagrama de Sequência

```
ESP32                    WiFi                    API REST                Database
  │                       │                          │                       │
  ├─ Ler MQ-135 ─────────┤                          │                       │
  ├─ Ler MQ-7 ───────────┤                          │                       │
  ├─ Calcular PPM/GPH ───┤                          │                       │
  ├─ Classificar ────────┤                          │                       │
  ├─ Atualizar LEDs ─────┤                          │                       │
  │                       │                          │                       │
  ├─ Criar JSON ─────────┤                          │                       │
  ├──────────────────────►│                          │                       │
  │                       ├─ HTTP POST ─────────────►│                       │
  │                       │                          ├─ Validar JWT ────────┤
  │                       │                          ├─ Buscar Device ──────┤
  │                       │                          │                       │
  │                       │                          ├─ INSERT Measurement ─►
  │                       │                          ├─ Check Alert Level ──┤
  │                       │                          ├─ INSERT Alert ───────►
  │                       │                          │                       │
  │                       │◄─ HTTP 201 Created ──────┤                       │
  │◄──────────────────────┤                          │                       │
  ├─ Log Response ───────┤                          │                       │
  │                       │                          │                       │
```

### Ciclo de Leitura e Envio

```
1. Inicialização
   ├─ Conectar WiFi
   ├─ Testar LEDs
   └─ Configurar pinos

2. Loop Principal (a cada 30 segundos)
   ├─ Verificar conexão WiFi
   ├─ Ler valor MQ-135 (analógico)
   ├─ Ler valor MQ-7 (analógico)
   ├─ Converter para PPM e g/h
   ├─ Classificar qualidade do ar
   ├─ Atualizar LEDs
   ├─ Criar JSON com dados
   ├─ Enviar HTTP POST para API
   └─ Processar resposta

3. Tratamento de Erros
   ├─ Reconexão WiFi (se necessário)
   ├─ Retry HTTP (se falha)
   └─ Log de erros no Serial Monitor
```

### Intervalo de Envio

```cpp
const unsigned long intervaloEnvio = 30000; // 30 segundos
```

| Intervalo | Uso Recomendado |
|-----------|-----------------|
| 10s | Testes e desenvolvimento |
| 30s | **Produção (padrão)** |
| 60s | Economia de energia |
| 300s (5min) | Monitoramento longo prazo |

---

## Código do Firmware

### Estrutura do Código

```cpp
// 1. BIBLIOTECAS
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// 2. CONFIGURAÇÕES
const char* ssid = "...";
const char* password = "...";
const char* apiUrl = "https://nauticair-api.onrender.com/api/measurements/iot";
const char* deviceId = "SEU-DEVICE-ID-UUID";

// 3. DEFINIÇÃO DE PINOS
#define MQ135_PIN 34
#define MQ7_PIN 32
#define LED_VERDE 25
#define LED_AMARELO 26
#define LED_VERMELHO 27

// 4. LIMIARES
#define LIMIAR_VERDE 800
#define LIMIAR_AMARELO 1000

// 5. VARIÁVEIS GLOBAIS
unsigned long ultimoEnvio = 0;
const unsigned long intervaloEnvio = 30000;

// 6. FUNÇÕES
void setup() { ... }
void loop() { ... }
void conectarWiFi() { ... }
void enviarParaAPI(float co_ppm, float co2_gph) { ... }
String classificarQualidade(int valor) { ... }
void atualizarLEDs(String status) { ... }
void testarLEDs() { ... }
```

### Payload JSON Enviado

```json
{
  "device_id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
  "co_ppm": 45.32,
  "co2_gph": 1.85
}
```

### Resposta da API (Sucesso)

```json
{
  "success": true,
  "message": "Medição registrada com sucesso",
  "data": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "device_id": "9856baa0-2cff-4d14-b9c9-b9b97739a00c",
    "co_ppm": 45.32,
    "co2_gph": 1.85,
    "duration_h": null,
    "created_at": "2025-01-06T14:30:00.000Z",
    "updated_at": "2025-01-06T14:30:00.000Z"
  }
}
```

### HTTP Response Codes

| Código | Significado | Ação do ESP32 |
|--------|-------------|---------------|
| 201 | Created | ✅ Medição registrada com sucesso |
| 400 | Bad Request | ⚠️ Dados inválidos, verificar JSON |
| 404 | Not Found | ❌ Device não encontrado na API |
| 500 | Server Error | 🔄 Tentar reenviar após 1 minuto |

---

## Configuração e Deploy

### Passo 1: Preparar o Hardware

1. **Conectar Sensores**
   - MQ-135 AO → GPIO 34
   - MQ-7 AO → GPIO 32
   - VCC sensores → 5V (via regulador)
   - GND sensores → GND comum

2. **Conectar LEDs**
   - LED Verde → GPIO 25 (com resistor 220Ω)
   - LED Amarelo → GPIO 26 (com resistor 220Ω)
   - LED Vermelho → GPIO 27 (com resistor 220Ω)

3. **Alimentação**
   - ESP32 via USB (5V) ou bateria (3.7V LiPo)
   - Sensores MQ precisam de 5V para melhor desempenho

### Passo 2: Configurar o Arduino IDE

1. **Instalar Suporte ao ESP32**
   - File → Preferences → Additional Board Manager URLs
   - Adicionar: `https://dl.espressif.com/dl/package_esp32_index.json`
   - Tools → Board → Boards Manager → Instalar "ESP32"

2. **Instalar Bibliotecas**
   - Sketch → Include Library → Manage Libraries
   - Instalar:
     - `ArduinoJson` (versão 6.x)
     - `WiFi` (já vem com ESP32)
     - `HTTPClient` (já vem com ESP32)

3. **Configurar Placa**
   - Tools → Board → ESP32 Dev Module
   - Tools → Upload Speed → 115200
   - Tools → Flash Frequency → 80MHz
   - Tools → Partition Scheme → Default 4MB

### Passo 3: Configurar o Código

1. **Abrir o arquivo**: `iot/NauticAir_IoT_Full/NauticAir_IoT_Full.ino`

2. **Configurar WiFi**:
```cpp
const char* ssid = "SEU_WIFI_SSID";
const char* password = "SUA_SENHA_WIFI";
```

3. **Configurar Device ID**:
```cpp
const char* deviceId = "SEU-DEVICE-ID-UUID";
```

> ⚠️ **Como obter o Device ID**: 
> 1. Fazer login na API: `POST /api/auth/login`
> 2. Criar dispositivo: `POST /api/devices` (com token JWT)
> 3. Copiar o `id` retornado

4. **Ajustar Limiares (opcional)**:
```cpp
#define LIMIAR_VERDE 800    // Ajustar conforme calibração
#define LIMIAR_AMARELO 1000
```

### Passo 4: Upload do Firmware

1. **Conectar ESP32** via USB
2. **Selecionar porta**: Tools → Port → `/dev/ttyUSB0` (Linux) ou `COM3` (Windows)
3. **Compilar e Enviar**: Sketch → Upload (Ctrl+U)
4. **Aguardar**: ~30 segundos para upload completo

### Passo 5: Monitorar

1. **Abrir Serial Monitor**: Tools → Serial Monitor
2. **Configurar baudrate**: 115200
3. **Observar saída**:

```
Testando LEDs...
Teste de LEDs concluído!
Conectando ao WiFi......
WiFi conectado!
IP: 192.168.0.100
Sistema IoT NauticAir iniciado!

==================
MQ135: 856 → Status: Médio
MQ7: 532
CO (PPM): 5.32
CO2 (g/h): 1.712
Enviando para API: {"device_id":"...","co_ppm":5.32,"co2_gph":1.712}
Resposta da API (201): {"success":true,"message":"Medição registrada com sucesso",...}
```

### Passo 6: Calibração dos Sensores

#### Período de Pré-aquecimento

| Sensor | Tempo Mínimo | Tempo Ideal | Observação |
|--------|--------------|-------------|------------|
| MQ-135 | 3 minutos | 24 horas | Valores estabilizam após aquecimento |
| MQ-7 | 5 minutos | 48 horas | Aquecimento cíclico melhora precisão |

#### Procedimento de Calibração

1. **Ambiente Limpo**
   - Deixar sensores ligados em ambiente aberto e limpo por 24-48h
   - Registrar valores de "linha de base" (ar limpo)

2. **Ajustar Limiares**
   ```cpp
   // Valores sugeridos (ajustar após testes)
   #define LIMIAR_VERDE 800    // 80% do valor máximo em ar limpo
   #define LIMIAR_AMARELO 1000 // 100% do valor máximo em ar limpo
   ```

3. **Testes Práticos**
   - Expor a fumaça controlada (incenso, cigarro)
   - Verificar mudança nos valores analógicos
   - Ajustar conversões PPM/GPH se necessário

---

## Troubleshooting

### Problema: WiFi não conecta

**Sintomas:**
```
Conectando ao WiFi....................
Falha ao conectar WiFi!
```

**Soluções:**
1. ✅ Verificar SSID e senha no código
2. ✅ Confirmar que rede é 2.4GHz (ESP32 não suporta 5GHz)
3. ✅ Verificar se SSID possui caracteres especiais (evitar acentos)
4. ✅ Testar com hotspot de celular
5. ✅ Aumentar número de tentativas no código

---

### Problema: Valores dos sensores sempre 0 ou 4095

**Sintomas:**
```
MQ135: 0 → Status: Bom
MQ7: 0
```

**Soluções:**
1. ✅ Verificar conexões físicas (pinos soltos)
2. ✅ Confirmar alimentação dos sensores (5V)
3. ✅ Testar pinos com multímetro (deve ter tensão variável)
4. ✅ Verificar se pinos estão corretos no código
5. ✅ Aguardar pré-aquecimento (3-5 minutos mínimo)

---

### Problema: API retorna 404 (Device not found)

**Sintomas:**
```
Resposta da API (404): {"success":false,"message":"Dispositivo não encontrado"}
```

**Soluções:**
1. ✅ Verificar se `deviceId` no código está correto
2. ✅ Confirmar que dispositivo foi criado na API
3. ✅ Testar endpoint com Postman/curl usando o mesmo deviceId
4. ✅ Verificar se banco de dados está acessível

---

### Problema: API retorna 400 (Bad Request)

**Sintomas:**
```
Resposta da API (400): {"success":false,"message":"Campos obrigatórios ausentes"}
```

**Soluções:**
1. ✅ Verificar se JSON está bem formado
2. ✅ Confirmar campos obrigatórios: `device_id`, `co_ppm`, `co2_gph`
3. ✅ Verificar tipos de dados (números como float, não strings)
4. ✅ Testar JSON no Serial Monitor antes de enviar

---

### Problema: LEDs não acendem

**Sintomas:**
- LEDs sempre apagados ou sempre acesos

**Soluções:**
1. ✅ Verificar polaridade dos LEDs (catodo no GND)
2. ✅ Confirmar resistores (220Ω recomendado)
3. ✅ Testar LEDs individualmente com código simples
4. ✅ Verificar se pinos GPIO estão corretos
5. ✅ Usar função `testarLEDs()` no setup

---

### Problema: ESP32 reinicia constantemente

**Sintomas:**
```
ets Jun  8 2016 00:22:57
rst:0x8 (TG1WDT_SYS_RESET),boot:0x13 (SPI_FAST_FLASH_BOOT)
```

**Soluções:**
1. ✅ Verificar fonte de alimentação (mínimo 500mA)
2. ✅ Desconectar sensores/LEDs e testar
3. ✅ Verificar curtos-circuitos na protoboard
4. ✅ Reduzir intervalo de envio (menos requisições HTTP)
5. ✅ Adicionar delay() no loop para evitar watchdog

---

### Problema: Valores muito instáveis

**Sintomas:**
```
MQ135: 1024
MQ135: 523
MQ135: 1891
MQ135: 402
```

**Soluções:**
1. ✅ Aguardar pré-aquecimento completo (24-48h)
2. ✅ Implementar média móvel:
   ```cpp
   float media = 0;
   for (int i = 0; i < 10; i++) {
     media += analogRead(MQ135_PIN);
     delay(10);
   }
   media /= 10.0;
   ```
3. ✅ Verificar qualidade da alimentação (usar capacitores)
4. ✅ Afastar de fontes de interferência (motores, WiFi roteador muito próximo)

---

### Problema: API Render não responde

**Sintomas:**
```
Erro ao enviar: -1
```

**Soluções:**
1. ✅ Verificar se API está online: https://nauticair-api.onrender.com/
2. ✅ Render pode ter "cold start" (esperar 30-60s)
3. ✅ Aumentar timeout HTTP no ESP32
4. ✅ Verificar logs da API no dashboard do Render

---

## Melhorias Futuras

### Hardware

- [ ] Adicionar sensor GPS para geolocalização
- [ ] Implementar display OLED para mostrar dados localmente
- [ ] Adicionar bateria LiPo com gerenciamento de carga
- [ ] Incluir sensor de temperatura/umidade (DHT22)
- [ ] Carcaça resistente à água para uso naval

### Software

- [ ] Implementar calibração automática
- [ ] Adicionar média móvel para estabilizar leituras
- [ ] Sistema de cache local (SD card) em caso de falha de WiFi
- [ ] Modo deep sleep para economizar energia
- [ ] OTA (Over-The-Air) updates via WiFi
- [ ] Interface web própria no ESP32 para configuração

### Comunicação

- [ ] Suporte a MQTT para comunicação mais leve
- [ ] Compressão de dados antes do envio
- [ ] Retry inteligente com backoff exponencial
- [ ] Envio em lote (batch) de medições
- [ ] Suporte a múltiplos endpoints de API

---

## Recursos Adicionais

### Datasheets

- [ESP32 Technical Reference](https://www.espressif.com/sites/default/files/documentation/esp32_technical_reference_manual_en.pdf)
- [MQ-135 Datasheet](https://www.olimex.com/Products/Components/Sensors/Gas/SNS-MQ135/resources/SNS-MQ135.pdf)
- [MQ-7 Datasheet](https://www.sparkfun.com/datasheets/Sensors/Biometric/MQ-7.pdf)

### Bibliotecas

- [ArduinoJson Documentation](https://arduinojson.org/)
- [ESP32 WiFi Library](https://github.com/espressif/arduino-esp32/tree/master/libraries/WiFi)
- [HTTPClient Library](https://github.com/espressif/arduino-esp32/tree/master/libraries/HTTPClient)

### Tutoriais

- [Getting Started with ESP32](https://randomnerdtutorials.com/getting-started-with-esp32/)
- [ESP32 ADC Guide](https://deepbluembedded.com/esp32-adc-tutorial-read-analog-voltage-arduino/)
- [MQ Sensors Guide](https://www.makerguides.com/mq-135-arduino-tutorial/)

---

## Changelog

### v1.0.0 - 2025-01-06
- ✅ Implementação inicial do sistema IoT
- ✅ Suporte a sensores MQ-135 e MQ-7
- ✅ Sistema de LEDs indicadores
- ✅ Comunicação WiFi com API REST
- ✅ Conversão de valores analógicos para PPM e g/h
- ✅ Reconexão automática WiFi
- ✅ Logging via Serial Monitor

---

## Licença

Este projeto é parte do **NauticAir - Sistema IoT de Monitoramento de Emissões Navais**  
Desenvolvido para o CNIT 2025 - Porto de Santos  
ETEC Zona Leste - São Paulo, Brasil

---

## Suporte

Para dúvidas ou problemas:
1. Consulte a seção [Troubleshooting](#troubleshooting)
2. Verifique os logs no Serial Monitor
3. Teste componentes individualmente
4. Entre em contato com a equipe de desenvolvimento

---

**Última atualização:** 06/01/2025
