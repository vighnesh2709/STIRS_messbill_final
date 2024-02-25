#include <ESP8266WiFi.h>
#include <ESP8266HTTPClient.h>

// Wi-Fi Credentials
const char* ssid = "Testing";
const char* password = "kamath123";

void setup() {
  Serial.begin(9600);
  delay(1000);

  // Connect to Wi-Fi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(1000);
    Serial.println("Connecting to WiFi...");
  }
  Serial.println("Connected to WiFi");
}

void loop() {
  // Replace with the IP address of your Node.js server
  String serverUrl = "http://192.168.160.11:3020/test";  // Replace with the actual IP address

  // Replace "John" and "123" with the desired name and id
  String name = "John";
  String id = "123";

  // Construct the URL with parameters
  serverUrl += "/" + name + "/" + id;

  // Send a POST request
  WiFiClient client;
  HTTPClient http;
  http.begin(client, serverUrl);

  // Set content type to application/json if needed
  // http.addHeader("Content-Type", "application/json");

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

  http.end();

  delay(5000);  // Wait for 5 seconds before making the next request
}
