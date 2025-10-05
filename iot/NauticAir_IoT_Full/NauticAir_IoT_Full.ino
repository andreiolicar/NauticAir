// Bibliotecas
#include <WiFi.h>
#include <HTTPClient.h>
#include <ArduinoJson.h>

// Configurações WiFi
const char* ssid = "Alessandra_2G";
const char* password = "12798012";

// Configurações API
const char* apiUrl = "https://nauticair-api.onrender.com/api/measurements/iot";
const char* deviceId = "9856baa0-2cff-4d14-b9c9-b9b97739a00c"; // ← Usar ID do dispositivo cadastrado

// Definição de pinos
#define MQ135_PIN 34   // MQ-135 (qualidade do ar) → AO
#define MQ7_PIN   32   // MQ-7 (CO2 simulado) → AO

#define LED_VERDE    25   // IO25 -> LED verde
#define LED_AMARELO  26   // IO26 -> LED amarelo
#define LED_VERMELHO 27   // IO27 -> LED vermelho

// Limiar para classificação
#define LIMIAR_VERDE 800
#define LIMIAR_AMARELO 1000

// Variáveis globais
unsigned long ultimoEnvio = 0;
const unsigned long intervaloEnvio = 30000; // Enviar a cada x segundos

// Configuração inicial
void setup() {
  Serial.begin(115200);

  // Configurar pinos dos LEDs
  pinMode(LED_VERDE, OUTPUT);
  pinMode(LED_AMARELO, OUTPUT);
  pinMode(LED_VERMELHO, OUTPUT);

  // Testar LEDs
  testarLEDs();

  // Conectar ao WiFi
  conectarWiFi();

  Serial.println("Sistema IoT NauticAir iniciado!");
}

// Loop principal
void loop() {
  // Verificar conexão WiFi
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi desconectado! Reconectando...");
    conectarWiFi();
    return;
  }

  // Enviar medições a cada x segundos
  unsigned long tempoAtual = millis();
  if (tempoAtual - ultimoEnvio >= intervaloEnvio) {
    ultimoEnvio = tempoAtual;

    // Ler sensores
    int valorMQ135 = analogRead(MQ135_PIN);
    int valorMQ7   = analogRead(MQ7_PIN);

    // Calcular valores convertidos (simplificado)
    float co_ppm = valorMQ7 * 0.01;         // Conversão simplificada para PPM
    float co2_gph = valorMQ135 * 0.002;     // Conversão simplificada para g/h

    // Classificar qualidade do ar
    String status = classificarQualidade(valorMQ135);

    // Exibir no Serial Monitor
    Serial.println("==================");
    Serial.print("MQ135: ");
    Serial.print(valorMQ135);
    Serial.print(" → Status: ");
    Serial.println(status);
    Serial.print("MQ7: ");
    Serial.println(valorMQ7);
    Serial.print("CO (PPM): ");
    Serial.println(co_ppm);
    Serial.print("CO2 (g/h): ");
    Serial.println(co2_gph);

    // Enviar para API
    enviarParaAPI(co_ppm, co2_gph);

    // Atualizar LEDs baseado no status
    atualizarLEDs(status);
  }

  delay(100);
}

// Função: Conectar WiFi
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

// Função: Enviar para API
void enviarParaAPI(float co_ppm, float co2_gph) {
  if (WiFi.status() != WL_CONNECTED) {
    Serial.println("WiFi desconectado! Não é possível enviar dados.");
    return;
  }

  HTTPClient http;
  http.begin(apiUrl);
  http.addHeader("Content-Type", "application/json");

  // Criar JSON
  StaticJsonDocument<256> doc;
  doc["device_id"] = deviceId;
  doc["co_ppm"] = co_ppm;
  doc["co2_gph"] = co2_gph;

  String jsonString;
  serializeJson(doc, jsonString);

  Serial.println("Enviando para API: " + jsonString);

  // Enviar POST
  int httpResponseCode = http.POST(jsonString);

  if (httpResponseCode > 0) {
    String response = http.getString();
    Serial.print("Resposta da API (");
    Serial.print(httpResponseCode);
    Serial.print("): ");
    Serial.println(response);
  } else {
    Serial.print("Erro ao enviar: ");
    Serial.println(httpResponseCode);
  }

  http.end();
}

// Função: Classificar qualidade do ar
String classificarQualidade(int valor) {
  if (valor < LIMIAR_VERDE) {
    return "Bom";
  } else if (valor < LIMIAR_AMARELO) {
    return "Médio";
  } else {
    return "Ruim";
  }
}

// Função: Atualizar LEDs
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

// Função: Testar LEDs
void testarLEDs() {
  Serial.println("Testando LEDs...");

  digitalWrite(LED_VERDE, HIGH);
  delay(500);
  digitalWrite(LED_VERDE, LOW);

  digitalWrite(LED_AMARELO, HIGH);
  delay(500);
  digitalWrite(LED_AMARELO, LOW);

  digitalWrite(LED_VERMELHO, HIGH);
  delay(500);
  digitalWrite(LED_VERMELHO, LOW);

  Serial.println("Teste de LEDs concluído!");
}