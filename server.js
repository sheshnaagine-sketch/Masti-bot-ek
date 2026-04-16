const express = require('express');
const WebSocket = require('ws');

const app = express();
const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log("✅ RK Raja Bot running on port " + PORT);
});

const wss = new WebSocket.Server({ server });

// 😂 BASE JOKES
const baseJokes = [
"😂 Teacher: Homework kyu nahi kiya? Student: Light chali gayi thi!",
"😂 Ladka: I love you ❤️ Ladki: Kitna? Ladka: Data pack khatam hone tak 😅",
"😂 Dost: Tu late kyu? Main: Shortcut le liya tha 🤣",
"😂 Boss: Late kyu aaye? Employee: Alarm nahi baja 😑",
"😂 Friend: Gym chal? Main: Kal se 💀",
"😂 Teacher: Homework? Student: Dog kha gaya 🐶",
"😂 Mom: Phone rakh! Main: Last reel 😭",
"😂 Police: Helmet kyu nahi? Banda: Hairstyle 😎",
"😂 Friend: Tu serious kab hota hai? Main: Jab data khatam ho 😆",
"😂 Life simple hai bas recharge hona chahiye 😎"
];

// 🔥 MAKE TOTAL ~200 JOKES
const jokes = [
...baseJokes,
...Array.from({length:190}, (_,i)=>`😂 RK Raja Joke #${i+1} - Mast reh bhai 😎`)
];

// ❤️ 100 FLIRTING SHAYARI
const shayari = Array.from({length:100}, (_,i)=>
`❤️ Shayari ${i+1}: Tum meri life ki special person ho, tum bina sab boring lagta hai 😍`
);

// 😎 FUN
const funReply = [
"😎 RK Raja style!",
"🔥 Mast chal raha hai!",
"😂 Bhai tu legend hai",
"🤖 Main RK Raja Bot hoon!"
];

// 🤖 BOT LOGIC
function getBotReply(msg) {
  msg = msg.toLowerCase();

  if (msg.includes('hi') || msg.includes('hello')) {
    return '👋 Hello bhai! Main RK Raja Bot hoon 😎';
  }

  if (msg.includes('joke')) {
    return jokes[Math.floor(Math.random() * jokes.length)];
  }

  if (msg.includes('shayari')) {
    return shayari[Math.floor(Math.random() * shayari.length)];
  }

  if (msg.includes('bored') || msg.includes('timepass')) {
    return funReply[Math.floor(Math.random() * funReply.length)];
  }

  if (msg.includes('name')) {
    return '🤖 Mera naam RK Raja Bot hai';
  }

  return "😄 RK Raja Bot samajh nahi paya — 'joke', 'shayari', 'hi' try karo!";
}

// 🌐 UI
app.get('/', (req, res) => {
  res.send(`
  <html>
  <body style="font-family:sans-serif;text-align:center;background:#111;color:#fff">
    <h2>🤖 RK Raja Bot</h2>
    <input id="msg" placeholder="Type message"/>
    <button onclick="send()">Send</button>
    <div id="chat"></div>

    <script>
      const ws = new WebSocket((location.protocol==='https:'?'wss://':'ws://')+location.host);

      ws.onmessage = (m) => {
        const d = document.createElement('div');
        d.innerText = m.data;
        document.getElementById('chat').appendChild(d);
      };

      function send(){
        const msg = document.getElementById('msg').value;
        ws.send(msg);
      }
    </script>
  </body>
  </html>
  `);
});

// 🔌 WebSocket
wss.on('connection', (ws) => {
  ws.send("🤖 RK Raja Bot connected! Welcome 😎");

  ws.on('message', (message) => {
    const reply = getBotReply(message.toString());
    ws.send("RK Raja Bot: " + reply);
  });
});
