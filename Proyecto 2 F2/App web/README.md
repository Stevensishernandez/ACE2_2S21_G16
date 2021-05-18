# Practica1App

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.1.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

### Configuración general

La configuración de los dispositivos es la siguiente:


|VLAN |Dirección de red |Primera d. asignable |Ultima d. asignable|Dirección de broadcast |Mascara CIDR                       |Host necesarios |Cantidad de host|
|-----|-----------------|---------------------|-------------------|-----------------------|-----------------------------------|----------------|----------------|
|10   | 192.168.112.192 | 192.168.112.193     | 192.168.112.222   | 192.168.112.223       | 255.255.255.224 192.168.112.192/27| 21             | 30             |
|20   | 192.168.112.224 | 192.168.112.225     | 192.168.112.238   | 192.168.112.239       | 255.255.255.240 192.168.112.224/28| 8              | 14             |
|30   | 192.168.112.0   | 192.168.112.1       | 192.168.112.126   | 192.168.112.127       | 255.255.255.128 192.168.112.0/25  | 123            | 124            |
|40   | 192.168.112.128 | 192.168.112.129     | 192.168.112.190   | 192.168.112.191       | 255.255.255.192 192.168.112.128/26| 37             | 62             |

<br><br>





### CONFIGURACIÓN ETHERNETSWITCH ROUTERS

#### Para el ESW1 se emplean los siguientes comandos:

Para configurar VTP:

```sh
conf t
vtp domain redes1gp12
vtp password redes1gp12
vtp mode server 
end
```

Para crear VLAN's:

```sh
conf t

vlan 10
name RHUMANOS
exit

vlan 20 
name CONTABILIDAD
exit

vlan 30
name VENTAS
exit

vlan 40
name INFORMATICA
end
```

Para mostrar VLAN's:

```sh
sh vlan-sw
```

Para ports-channel

```sh
conf t
int range f1/1 - 2
channel-group 3 mode on
end

conf t
int range f1/3 - 4
channel-group 4 mode on
end
```

Para configurar enlaces troncales y de acceso:

```sh
conf t
int Po3
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int Po4
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int f1/0
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
end
```

Para spaning-tree:

```sh
conf t
spanning-tree vlan 10 root primary
spanning-tree vlan 20 root primary
spanning-tree vlan 30 root primary
spanning-tree vlan 40 root primary
end
```
Para mostrar spanning-tree:
```sh
sh spanning-tree root
```

#### Para el ESW2 se emplean los siguientes comandos:

Para configurar VTP:

```sh
conf t
vtp domain redes1gp12
vtp password redes1gp12
vtp mode client 
end
```

Para ports-channel

```sh
conf t
int range f1/1 - 2
channel-group 3 mode on
end

conf t
int range f1/3 - 4
channel-group 2 mode on
end

conf t
int range f1/7 - 9
channel-group 5 mode on
end
```

Para configurar enlaces troncales y de acceso:

```sh
conf t
int Po3
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int Po2
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int Po5
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int f1/5
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int f1/6
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
end
```


#### Para el ESW3 se emplean los siguientes comandos:

Para configurar VTP:

```sh
conf t
vtp domain redes1gp12
vtp password redes1gp12
vtp mode client 
end
```

Para ports-channel

```sh
conf t
int range f1/1 - 2
channel-group 1 mode on
end

conf t
int range f1/3 - 4
channel-group 4 mode on
end

conf t
int range f1/7 - 9
channel-group 5 mode on
end
```

Para configurar enlaces troncales y de acceso:

```sh
conf t
int Po1
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int Po4
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int Po5
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit


int f1/5
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int f1/6
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
end
```



#### Para el ESW4 se emplean los siguientes comandos:

Para configurar VTP:

```sh
conf t
vtp domain redes1gp12
vtp password redes1gp12
vtp mode client 
end
```

Para ports-channel

```sh
conf t
int range f1/1 - 2
channel-group 1 mode on
end

conf t
int range f1/3 - 4
channel-group 2 mode on
end
```

Para configurar enlaces troncales y de acceso:

```sh
conf t
int Po1
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int Po2
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int f1/5
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
exit

int f1/6
switchport mode trunk
switchport trunk allowed vlan 1,10,20,30,40,1002-1005
end
```

### CONFIGURACIÓN ROUTER

Activar la interfaz:

```sh
conf t
int f0/1
no shutdown
end
```
Para permitir enlace troncal al router:

```sh
conf t

int f0/1.30
encapsulation dot1Q 30
ip address 192.168.112.1 255.255.255.128
exit

int f0/1.40
encapsulation dot1Q 40
ip address 192.168.112.129 255.255.255.192
exit

int f0/1.10
encapsulation dot1Q 10
ip address 192.168.112.193 255.255.255.224
exit

int f0/1.20
encapsulation dot1Q 20
ip address 192.168.112.225 255.255.255.240
end

```

Para configurar dhcp en el router:

```sh
conf t

int f0/1.30
ip dhcp pool VENTAS
network 192.168.112.0 255.255.255.128
default-route 192.168.112.1
exit

int f0/1.40
ip dhcp pool INFORMATICA
network 192.168.112.128 255.255.255.192
default-route 192.168.112.129
exit

int f0/1.10
ip dhcp pool RHUMANOS
network 192.168.112.192 255.255.255.224
default-route 192.168.112.193
exit

int f0/1.20
ip dhcp pool CONTABILIDAD
network 192.168.112.224 255.255.255.240
default-route 192.168.112.225
end
```

### CONFIGURACIÓN VPCS

Para configurar VPCS:

```sh
ip dhcp
save
```
