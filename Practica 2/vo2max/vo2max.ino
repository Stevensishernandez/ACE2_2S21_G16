const byte ledPin = LED_BUILTIN;
const byte interruptPin = 2;
volatile byte state = LOW;

volatile float rpmcont;
volatile float rpmt;
float calc;
float calct;

int pos = 1;
int flag = 0;

void setup() {
  Serial.begin(9600);
  Serial1.begin(9600);
  
  pinMode(ledPin, OUTPUT);
  pinMode(interruptPin, INPUT_PULLUP);
  attachInterrupt(digitalPinToInterrupt(interruptPin), blink, RISING);
}

void loop() {
  if(flag == 0 && rpmcont != 0){
    flag = 1;
  }else if(flag == 1 && rpmcont == 0){
    pos = pos * -1;
    calct = 0;
    rpmt = 0;
    flag = 0;
  }
  
  rpmcont = 0;
  //sei();
  delay(1000);

  //cli();
  calc = (((rpmcont*60)/6.67)*1000);
  calct = ((rpmt)/350);
  //O,V,B
  //ml/min, L, boleano
  //Serial.println(String(calc)+" ml/min, "+String(calct)+" L, "+String(pos)+" rpm");
  Serial.println("O:"+String(calc)+",V:"+String(calct)+",B:"+String(pos));
  Serial1.print("O:"+String(calc)+",V:"+String(calct)+",B:"+String(pos));
  
  digitalWrite(ledPin, LOW);
}

void blink() {
  rpmcont++;
  rpmt++;
  state = !state;
  digitalWrite(ledPin, state);
}
