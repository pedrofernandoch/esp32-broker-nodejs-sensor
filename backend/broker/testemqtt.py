import os
import time
import paho.mqtt.client as mqtt

#Definir IP e porta
IP_address="172.18.0.1"
port = 8123

#Conectar
def on_connect(client,userdata,flags,rc):
        if rc == 0:
                print("Conectado com sucesso")
        else:
                print("Nao foi possível conectar. erro: ",rc)
#Desconectar
def on_disconnect(client,userdata,flags, rc = 0):
        print("Desconectado. Código: "+str(rc))

#Mensagem
def on_message(client, userdata, message):
    print("Mensagem recebida: " ,str(message.payload.decode("utf-8")))
    print("Topico da mensagem: ",message.topic)

client = mqtt.Client("T1")
print("Conectando ao broker", IP_address)
client.connect(IP_address, port) #Conectar ao broker

topic = "teste"

client.on_connect = on_connect #mensagem de conexao
time.sleep(1)
client.on_message = on_message #mensagem de publicacao

client.loop_start() #iniciar o loop
print("Inscrevendo em "+topic)
client.subscribe(topic) #inscrever no topico
print("Publicando em "+topic)
client.publish(topic,"Testando conexão com o broker") #publicar no topico
time.sleep(1)
client.loop_stop()
client.on_disconnect = on_disconnect #mensagem de desconectar
client.disconnect()
