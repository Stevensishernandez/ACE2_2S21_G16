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
  Serial1.begin(9600);     // Velocidad de comunicacion con el modulo Bluetooth HC-05
  
  pinMode(LED_BUILTIN, OUTPUT);
  
}


int i = 0;
void loop(){
  
  /*********Prueba de temperatura con bluetooth*********/
  //ELI
  while(i < 20){
    sensor = analogRead(A1);
    temperatura = ((sensor*5000.0)/1023)/10;
    
    suma1 += temperatura - 3;
    i++;
    delay(20);
  }
  
  i = 0;  
  suma = suma1;
  suma1 = 0;
  
  
  /*if(i < 40){
    sensor = analogRead(A1);
    temperatura = ((sensor*5000.0)/1023)/10;
    
    suma1 += temperatura - 3;
    i++;  
  }else{
    i = 0;  
    suma = suma1;
    suma1 = 0;
  }*/
  
  
  //MIO
  /*suma = 0;
  for(int i=0; i<5; i++){
    sensor = analogRead(A1);
    temperatura = ((sensor*5000.0)/1023)/10;
    
    suma += temperatura;
    delay(100);
  }*/
  

  /*********Prueba sensor cardiaco con bluetooth*********/
  Signal = analogRead(PulseSensor);  //Lectura de datos del sensor de ritmo cardiaco                            
  if(Signal > 520){
      PulseSensorAux = Signal;  
  }

  /***************Envio de datos a bluetooth*************/
  //Envio al proyecto
  Serial.println("T:"+String(suma/20.0,1)+",P:"+String(PulseSensorAux)+",O:80");
  Serial1.print("T:"+String(suma/20.0,1)+",P:"+String(PulseSensorAux)+",O:80");
  //delay(400);


  //Envio para a app externa
  /*Serial1.print("*G");
  Serial1.print(String(Signal));
  Serial1.print("*");
  delay(100);*/
  
}
