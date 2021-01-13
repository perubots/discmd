![This is a alt text.](https://i.imgur.com/5SvNlgH.gif)

# Discmd
Discmd es una aplicación de mesajeria en tiempo real usando el terminal de tu SO con servidores de Discord, Mediante la integración de un webhook para conectarse a un canal de Discord.

## Ejecución

1. Crear archivo `.env`
    * Un ejemplo se encuentra en .env.example (cp .env.example .env en Linux)
    * configurar las siguientes variables:
    ```json
    
    ID_WEBHOOK="" # El ID de el webhook que usará para enviar mensajes (desde la web a Discord).
    TOKEN_WEBHOOK="" # El TOKEN de el webhook que usará para enviar mensajes (desde la web a Discord)
    DISCORD_TOKEN="" # Token del bot de Discord donde iniciará sesión
    ID_CHANNEL="" #El ID del canal de Discord en donde se enviarán y recibirán mensajes.
    ```
2. Ejecutar
* Ejecutar el siguiente comando:

```
npm install
```

* Para el servidor
```
npm start
```

* Para el cliente
```
npm client
```
