## Instalação

1. Clone o repositório
2. Construa o container do broker

Crie a imagem do broker e suba o container
#### `docker compose -f esp32-broker-nodejs-sensor/backend/broker/docker-compose-mosquitto.yaml up -d --remove-orphans`
#### `docker exec -it mqtt /bin/sh`
#### `mosquitto_passwd -U mosquitto/config/password.txt`
#### `vi mosquitto/config/mosquitto.conf`
Descomente a linha 15 do arquivo `mosquitto.conf` e salve as alterações. (INSERT -> descomente -> ESC -> :wq)
#### `exit`
Restart o container
#### `docker restart mqtt`

3. Sete informações de rede e credenciais no arquivo `esp32-broker-nodejs-sensor/backend/esp32-ino/esp32-temp-hum.ino`

Se estiver na conexão da eduroam, deixe a variável shouldConnectToEduroam = true, do contrário, deixe false e sete as informações da rede local
em HOME_WIFI_SSID e HOME_WIFI_PASSWORD.
Se estiver na eduroam:
Sete o define EDUROAM_EAP_IDENTITY com seu número USP
Sete o define EDUROAM_EAP_PASSWORD com sua senha única

4. Descarregue o código no ESP32
5. Crie os outros containers

#### `docker compose -f esp32-broker-nodejs-sensor/backend/node-api/docker-compose-mosquitto.yaml up -d --remove-orphans`
#### `docker compose -f esp32-broker-nodejs-sensor/backend/apache/docker-compose-apache up -d --remove-orphans`

6. Utilize o login "admin@admin" e senha "12345Admin*" para se autenticar na interface
