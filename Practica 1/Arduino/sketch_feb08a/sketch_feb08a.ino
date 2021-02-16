//Sensor de ritmo cardiaco variables
int PulseSensor = A0 ;
int PulseSensorAux = 0 ;        // Conecte el cable rojo del sensor en pin analogico cero
int Signal = 0;               //Valor del sensor de pulso
int Threshold = 520;          //Dato analogico considerado como un pulso     

//Sensor de temperatura variables
int sensor;
float temperatura;
float suma;
float suma1;

void setup() {
  Serial.begin(9600);         // Velocidad de comunicacion del arduino
  //Serial1.begin(57600);     // Velocidad de comunicacion con el modulo Bluetooth HC-05 
  //Serial1.begin(38400);     // Velocidad de comunicacion con el modulo Bluetooth HC-05 
  Serial1.begin(9600);     // Velocidad de comunicacion con el modulo Bluetooth HC-05 
  
  pinMode(LED_BUILTIN, OUTPUT);
  
}


int i = 0;
void loop(){
  /*********Prueba de temperatura con bluetooth*********/
  
  if(i < 40){
    sensor = analogRead(A1);
    temperatura = ((sensor*5000.0)/1023)/10;
    
    suma1 += temperatura - 3;
    i++;  
  }else{
    i = 0;  
    suma = suma1;
    suma1 = 0;
    
  }
  /*suma = 0;
  for(int i=0; i<5; i++){
    sensor = analogRead(A1);
    temperatura = ((sensor*5000.0)/1023)/10;
    
    suma += temperatura;
    delay(100);
  }*/
  
  //Serial.println(suma/5.0, 1);
  //Serial1.print("T: "+String(suma/40.0,1));
  //delay(1000);


  
  /*********Prueba sensor cardiaco con bluetooth*********/
  

  Signal = analogRead(PulseSensor);  //Lectura de datos del sensor de ritmo cardiaco                            
  //Serial.write(Signal);
  if(Signal > 520){
      PulseSensorAux = Signal;  
  }
  Serial.println("T:"+String(suma/40.0,1)+",P:"+String(PulseSensorAux));
  //Serial1.print("T:"+String(suma/5.0,1)+",P:"+String(Signal));
  //Serial1.print("hola "+String(Signal)); //jala de ahuevo
  //delay(500);

  //Envio para app
  Serial1.print("*G");
  Serial1.print(String(Signal));
  Serial1.print("*");
  //Serial.println(Signal);
  delay(100);





  
  //Pulso y envio por blue
  //digitalWrite(LED_BUILTIN, LOW);
  //Uso de led arduino para latidos
  /*if(Signal > Threshold){
    Serial1.print("hola "+String(Signal)); //jala de ahuevo
    //digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(1000);                       // wait for a second
  }
  
  if(Signal <= Threshold){
    Serial1.print("hola nada"); //jala de ahuevo
    //digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
    delay(1000);  
  }*/

  //Recepcion de datos bluetooth
  /*if(Serial1.available()){
    c = Serial1.read();
    //Serial.write(c);

    digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
    delay(1000);
    digitalWrite(LED_BUILTIN, LOW);    // turn the LED off by making the voltage LOW
    
  }*/

  //Envio de datos bluetooth
  /*int state = 0;
  digitalWrite(LED_BUILTIN, LOW);
  if(Serial1.available()){//Envio de datos bluetooth
    state = Serial1.read();

    if (state == 'E') { //Bluetooth desactiva leds de salida
      digitalWrite(LED_BUILTIN, HIGH);   // turn the LED on (HIGH is the voltage level)
      delay(5000);
    }
    
  }else{
    Serial1.print("hola "+String(i)); //jala de ahuevo
    //Serial1.write("hola "+String(i));
    i = i+1;
    delay(1000);
  
  }*/
  
}
