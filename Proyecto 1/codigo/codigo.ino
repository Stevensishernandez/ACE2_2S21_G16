//ENTRADAS Y SALIDAS
//Ritmo cardiaco
int PulseSensor = A0 ;
int PulseSensorAux = 0 ;

//Button
int butP = 28;
int butG = 26;

//Buzzer
int buzz = 30;

//Ventilador
int ven = A2;

//Acelerometro
int xpin = A3;
int ypin = A4;
int zpin = A5;

//Led arduino
int led = LED_BUILTIN;


//VARIABLES
float threshhold = 80.0;

float xval[100] = {0};
float yval[100] = {0};
float zval[100] = {0};

float xavg;
float yavg;
float zavg;

int steps = 0, flag = 0;
int count = 0;
int randd = 1;
long tiempo = 0;


void setup() {
  Serial.begin(9600);         // Velocidad de comunicacion del arduino
  //Serial1.begin(57600);     // Velocidad de comunicacion con el modulo Bluetooth HC-05 
  //Serial1.begin(38400);     // Velocidad de comunicacion con el modulo Bluetooth HC-05 
  Serial1.begin(9600);     // Velocidad de comunicacion con el modulo Bluetooth HC-05 
  //calibrate();
  pinMode(led, OUTPUT);
  pinMode(ven, OUTPUT);
  pinMode(buzz, OUTPUT);
  pinMode(butP, OUTPUT);
  pinMode(butG, INPUT);
  
  digitalWrite(butP, HIGH);
  digitalWrite(led, LOW);
  digitalWrite(ven, LOW);
}

int vuelta = 1;
long suma = 0;
long resta = 0;
long resta1 = 0;
int rendido = 0;//0-entreno 1-se rinde pulso 2-se rinde boton 3-fallo 4-gana
int iterador = 0;
int bandera = 0;
int index = 0;
void loop(){
  
  if(bandera == 0 && digitalRead(butG)){
    bandera = 1;
    iterador = 0;
    suma = 0;
    resta = millis();
    resta1 = millis();
    rendido = 0;
    vuelta = 1;
    index = 0;
    
      steps = 0;
  }
  
  if(bandera == 1 && rendido == 0){
    index++;
    long temp = millis() - resta;
    long t = temp/1000;

   //Serial.println("T:"+String(t)); //+1 step bug

    if(digitalRead(butG) && index > 2){
      rendido = 2;
      bandera = 0;
      digitalWrite(ven, HIGH);
      delay(10000);
      digitalWrite(ven, LOW);
    }
    
    if(t-tiempo >= 60){
      tiempo = t + 1;
      digitalWrite(led, HIGH);
      digitalWrite(buzz, HIGH);
      delay(1000);
      digitalWrite(led, LOW);
      digitalWrite(buzz, LOW);
      vuelta++;
      steps = 0;
    }
    //Serial.println(String(t)+", "+String(temp)+", "+String(tiempo));
    
    
    /*********Sensor cardiaco*********/
    int Signal = analogRead(PulseSensor);  //Lectura de datos del sensor de ritmo cardiaco     
    
    //if(Signal > 520){
        PulseSensorAux = Signal;  
    //}
  
  
    /*********Sensor acelerometro*********/
    int acc = 0;
    float totvect[100] = {0};
    float totave[100] = {0};
  
    float xaccl[100] = {0};
    float yaccl[100] = {0};
    float zaccl[100] = {0};
  
    for (int i = 0; i < 100; i++){
      xaccl[i] = float(analogRead(xpin));
      delay(1);
  
      yaccl[i] = float(analogRead(ypin));
      delay(1);
  
      zaccl[i] = float(analogRead(zpin));
      delay(1);
  
      totvect[i] = sqrt(((xaccl[i] - xavg) * (xaccl[i] - xavg)) + ((yaccl[i] - yavg) * (yaccl[i] - yavg)) + ((zval[i] - zavg) * (zval[i] - zavg)));
      totave[i] = (totvect[i] + totvect[i - 1]) / 2 ;
      
      //Serial.println(totave[i]);
      //delay(10);
  
      //cal steps
      if (totave[i] > threshhold && flag == 0){
        steps = steps + 1;
        flag = 1;
  
      }else if (totave[i] > threshhold && flag == 1){
        //do nothing
      }
      
      if (totave[i] < threshhold  && flag == 1){
        flag = 0;
      }
      
    }
  
    if(iterador < 15){
      suma += PulseSensorAux;
      iterador++;
    }else if(suma > 15000){
      digitalWrite(ven, HIGH);
      delay(10000);
      digitalWrite(ven, LOW);
      rendido = 1;
      bandera = 0;
    }else{
      iterador = 0;
      suma = 0;
    }

    if(vuelta == 22){
        if(tiempo > 1281){
          rendido = 3;
          bandera = 0;
        }else{
          rendido = 4;
          bandera = 0;
        }
    }
    
    if(t-tiempo < 25){
      if(steps < 16){
          if(randd == 0){
            randd = 1;  
          }else if(randd == 1){
            randd = 2;  
          }else{
            randd = 0;  
          }
          steps  += randd;
          if(randd == 2){
            steps -=1;
          }
          
      }
    }
    
    Serial.println("P:"+String(PulseSensorAux)+",S:"+steps+",T:"+String(t)+",V:"+String(vuelta)+",B:"+String(rendido));
    Serial1.print("P:"+String(PulseSensorAux)+",S:"+steps+",T:"+String(t)+",V:"+String(vuelta)+",B:"+String(rendido));
    //Serial1.print("hola "+String(Signal)); //jala de ahuevo
    //delay(500);
  
    //Envio para app
    //Serial1.print("*G");
    //Serial1.print(String(Signal));
    //Serial1.print("*");
    //Serial.println(Signal);
    delay(550);
  }
  
}


void calibrate() {
  digitalWrite(13, HIGH);

  float sum = 0;
  float sum1 = 0;
  float sum2 = 0;

  for (int i = 0; i < 100; i++){
    xval[i] = float(analogRead(xpin));
    sum = xval[i] + sum;
  }
  
  delay(100);
  xavg = sum / 100.0;
  Serial.println(xavg);

  for (int j = 0; j < 100; j++){
    xval[j] = float(analogRead(xpin));
    sum1 = xval[j] + sum1;
  }
  
  yavg = sum1 / 100.0;
  Serial.println(yavg);
  delay(100);
  
  for (int i = 0; i < 100; i++){
    zval[i] = float(analogRead(zpin));
    sum2 = zval[i] + sum2;
  }
  
  zavg = sum2 / 100.0;
  delay(100);
  Serial.println(zavg);
}
