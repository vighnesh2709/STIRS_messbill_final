#include<ESP8266WiFi.h>
void setup() {
  Serial.begin(9600);
  WiFi.begin("Vighnesh","kamath123");
  while (WiFi.status()!=WL_CONNECTED)
  {
    Serial.print("..");
    delay(200);
  }
  Serial.println();
  Serial.println("NODE is connected");
  Serial.println(WiFi.localIP());
  // put your setup code here, to run once:

}

void loop() {
  // put your main code here, to run repeatedly:

}
