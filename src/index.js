const tmi = require('tmi.js');
require('dotenv').config();
//Objeto de configuraciones
const options = {
    options: {
        debug: true
    },
    connection : {
        reconnect: true
    },
    identity: {
        username: process.env.USER_NAME,
        password: process.env.OAUT_PASS
    },
    channels: [process.env.USER_NAME]
}

//Conexion
const client = new tmi.Client(options)

client.connect();

client.on('connected', (address, port) => {
    client.action('devnovas', `Hello gamers! Welcome to DevNovas chanel!`)
})
client.on('chat', (target, ctx, message, self) => {
    if(self || !message.startsWith('!')) return;
    
    //Limpiamos el mensaje
    const command = message.trim();

    //Algunos comandos sencillos
    if(command === '!hello'){
        client.say(target, `Welcome ${ctx.username}`);
    }
    if(command === '!game'){
        client.say(target, `Nova is playing Dark Souls`);
    }
    if(command === '!dice'){
        const num = rollDice();
        client.say(target, `${ctx.username} you rolled ${num}`);
    }
    if(command === '!goodbye'){
        client.say(target, `Goodbye ${ctx.username}, see you tomorrow!`);
    }
})
function rollDice() {
    const sides = 6;
    return Math.floor(Math.random() * sides) + 1;
}
