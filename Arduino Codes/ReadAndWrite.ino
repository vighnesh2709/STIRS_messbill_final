/******************************************
   PURPOSE:  Learn to use the MF522-AN RFID card reader
  Created by      Rudy Schlaf for www.makecourse.com
  DATE:   2/2014
*******************************************/

#include <SPI.h>
#include <MFRC522.h>

#define RST_PIN  D3
#define SS_PIN   D4

MFRC522 rfid(SS_PIN, RST_PIN);

MFRC522::MIFARE_Key key;
char order = 49;

void setup() {
  Serial.begin(9600);
  SPI.begin();
  rfid.PCD_Init();
  Serial.println("Scan a MIFARE Classic card");

  // Set default key to 0xFF for authentication
  for (byte i = 0; i < 6; i++) {
    key.keyByte[i] = 0xFF;
  }
}

// Define Block numbers for data storage
int block1 = 1; // Block 1
int block2 = 2; // Block 2

// Define data for Block 1 and Block 2
byte block1Content[16] = {"1"}; // Data for Block 1
byte block2Content[16] = {"Vighnesh_kamath"}; // Data for Block 2

void loop() {
  // Check if a new card is present
  if (!rfid.PICC_IsNewCardPresent()) {
    return;
  }

  // Read the card serial number
  if (!rfid.PICC_ReadCardSerial()) {
    return;
  }

  Serial.println("Card selected");

  // Write data to Block 1
  int writeBlock1Status = writeBlock(block1, block1Content);
  if (writeBlock1Status == 0) {
    Serial.println("Data written to Block 1 successfully");
  } else {
    Serial.println("Error writing to Block 1");
  }

  // Write data to Block 2
  int writeBlock2Status = writeBlock(block2, block2Content);
  if (writeBlock2Status == 0) {
    Serial.println("Data written to Block 2 successfully");
  } else {
    Serial.println("Error writing to Block 2");
  }

  // Read and print data from Block 1
  byte readBlock1Content[16];
  int readBlock1Status = readBlock(block1, readBlock1Content);
  if (readBlock1Status == 0) {
    Serial.print("Data read from Block 1: ");
    Serial.println(reinterpret_cast<const char*>(readBlock1Content));
  } else {
    Serial.println("Error reading from Block 1");
  }

  // Read and print data from Block 2
  byte readBlock2Content[16];
  int readBlock2Status = readBlock(block2, readBlock2Content);
  if (readBlock2Status == 0) {
    Serial.print("Data read from Block 2: ");
    Serial.println(reinterpret_cast<const char*>(readBlock2Content));
  } else {
    Serial.println("Error reading from Block 2");
  }
}

// Function to write data to a specific block
int writeBlock(int blockNumber, byte arrayAddress[]) {
  // Check if the block is a trailer block
  int largestModulo4Number = blockNumber / 4 * 4;
  int trailerBlock = largestModulo4Number + 3;

  if (blockNumber > 2 && (blockNumber + 1) % 4 == 0) {
    Serial.print(blockNumber);
    Serial.println(" is a trailer block:");
    return 2; // Error code for trailer block
  }
  Serial.print(blockNumber);
  Serial.println(" is a data block:");

  // Authenticate the card for writing
  byte status = rfid.PCD_Authenticate(MFRC522::PICC_CMD_MF_AUTH_KEY_A, trailerBlock, &key, &(rfid.uid));

  if (status != MFRC522::STATUS_OK) {
    Serial.print("PCD_Authenticate() failed: ");
    Serial.println(rfid.GetStatusCodeName(static_cast<MFRC522::StatusCode>(status)));
    return 3; // Error code for authentication failure
  }

  // Write data to the specified block
  status = rfid.MIFARE_Write(blockNumber, arrayAddress, 16);

  if (status != MFRC522::STATUS_OK) {
    Serial.print("MIFARE_Write() failed: ");
    Serial.println(rfid.GetStatusCodeName(static_cast<MFRC522::StatusCode>(status)));
    return 4; // Error code for write failure
  }
  Serial.println("Block was written");
  return 0; // Success code
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
