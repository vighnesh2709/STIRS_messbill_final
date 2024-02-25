#include <SPI.h>
#include <MFRC522.h>
#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

#define RST_PIN  D3
#define SS_PIN   D4

const char* ssid = "Testing";
const char* password = "kamath123";

MFRC522 rfid(SS_PIN, RST_PIN);

MFRC522::MIFARE_Key key;

// Define Block numbers for data storage
int block1 = 1; // Block 1
int block2 = 2; // Block 2

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("Scan a MIFARE Classic card");

  // Set default key to 0xFF for authentication
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  String name; // Declare 'name' variable
  String id;   // Declare 'id' variable

  // Check if a new card is present
  if (!rfid.PICC_IsNewCardPresent()) {
    return;
  }

  // Read the card serial number
  if (!rfid.PICC_ReadCardSerial()) {
    return;
  }

  Serial.println("Card selected");

  // Read data from Block 1 and store in variable
  byte readBlock1Content[16];
  int readBlock1Status = readBlock(block1, readBlock1Content);
  if (readBlock1Status == 0) {
    name = reinterpret_cast<const char*>(readBlock1Content);
    Serial.print("Data read from Block 1 (Name): ");
    Serial.println(name);
  } else {
    Serial.println("Error reading from Block 1");
    return;
  }

  // Read data from Block 2 and store in variable
  byte readBlock2Content[16];
  int readBlock2Status = readBlock(block2, readBlock2Content);
  if (readBlock2Status == 0) {
    id = reinterpret_cast<const char*>(readBlock2Content);
    Serial.print("Data read from Block 2 (ID): ");
    Serial.println(id);
  } else {
    Serial.println("Error reading from Block 2");
    return;
  }
  int i=0;
  for(i;i<2;i++){
  String serverUrl = "http://192.168.160.11:3020/test";  // Replace with the actual IP address
  serverUrl += "/" + name + "/" + id;
  
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverUrl);

  int httpResponseCode = http.POST("{}"); // Empty JSON payload

  if (httpResponseCode > 0) {
    Serial.print("HTTP Response code: ");
    Serial.println(httpResponseCode);

    String response = http.getString();
    Serial.print("Server response: ");
    Serial.println(response);
  } else {
    Serial.print("HTTP POST request failed, error code: ");
    Serial.println(httpResponseCode);
  }

  http.end();}

  delay(5000);  // Wait for 5 seconds before making the next request
  // Continue with the rest of your code or logic here
}

// Function to read data from a specific block
int readBlock(int blockNumber, byte arrayAddress[]) {
  // Check if the block is a trailer block
  int largestModulo4Number = blockNumber / 4 * 4;
  int trailerBlock = largestModulo4Number + 3;

  // Authenticate the card for reading
  byte status = rfid.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(rfid.uid));

  if (status != MFRC522::STATUS_OK) {
    Serial.print("PCD_Authenticate() failed (read): ");
    Serial.println(rfid.GetStatusCodeName(static_cast<MFRC522::StatusCode>(status)));
    return 3; // Error code for authentication failure
  }

  // Read data from the specified block
  byte bufferSize = 18;
  status = rfid.MIFARE_Read(blockNumber, arrayAddress, &bufferSize);

  if (status != MFRC522::STATUS_OK) {
    Serial.print("MIFARE_read() failed: ");
    Serial.println(rfid.GetStatusCodeName(static_cast<MFRC522::StatusCode>(status)));
    return 4; // Error code for read failure
  }
  Serial.println("Block was read");
  return 0; // Success code
}
