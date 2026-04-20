const express = require('express');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

const frontendPath = path.join(__dirname, '../frontend');
app.use(express.static(frontendPath));

app.get('/', (req, res) => {
  res.sendFile(path.join(frontendPath, 'index.html'));
});

// ================= USERS =================
let users = [];

// ================= MARKET =================
let market = [];

// ================= REGISTER =================
app.post('/register', (req, res) => {
  const { username, password, robloxUser } = req.body;

  if (!username || !password || !robloxUser) {
    return res.json({ error: "Completa todos los campos" });
  }

  if (users.find(u => u.username === username)) {
    return res.json({ error: "Usuario ya existe" });
  }

  users.push({
    username,
    password,
    robloxUser,
    balance: 100
  });

  res.json({ mensaje: "Cuenta creada" });
});

// ================= LOGIN =================
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const user = users.find(
    u => u.username === username && u.password === password
  );

  if (!user) return res.json({ error: "Datos incorrectos" });

  res.json(user);
});

// ================= DEPOSIT =================
app.post('/depositar', (req, res) => {
  const { user, amount } = req.body;

  const u = users.find(x => x.username === user);
  if (!u) return res.json({ error: "Usuario no existe" });

  u.balance += Number(amount);

  res.json({ mensaje: "Saldo agregado" });
});

// ================= PUBLICAR =================
app.post('/publicar', (req, res) => {
  const { name, price, owner } = req.body;

  if (!name || !price) {
    return res.json({ error: "Datos incompletos" });
  }

  market.push({
    id: Date.now(),
    name,
    price: Number(price),
    owner,
    status: "pendiente" // 🔥 clave
  });

  res.json({ mensaje: "Mascota enviada a revisión" });
});

// ================= APROBAR (ADMIN SIMULADO) =================
app.post('/aprobar', (req, res) => {
  const { id } = req.body;

  const pet = market.find(p => p.id == id);
  if (!pet) return res.json({ error: "No existe" });

  pet.status = "aprobado";

  res.json({ mensaje: "Aprobado" });
});

// ================= MARKET =================
app.get('/market', (req, res) => {
  res.json(market.filter(p => p.status === "aprobado"));
});

// ================= BALANCE =================
app.get('/balance/:user', (req, res) => {
  const user = users.find(u => u.username === req.params.user);
  res.json({ balance: user.balance });
});

// ================= BUY =================
app.post('/comprar', (req, res) => {
  const { id, buyer } = req.body;

  const pet = market.find(p => p.id == id);
  const user = users.find(u => u.username === buyer);

  if (!pet || pet.status !== "aprobado") {
    return res.json({ error: "No disponible" });
  }

  if (user.balance < pet.price) {
    return res.json({ error: "Sin dinero" });
  }

  const seller = users.find(u => u.username === pet.owner);

  user.balance -= pet.price;
  seller.balance += pet.price;

  pet.owner = buyer;

  res.json({
    mensaje: "Compra hecha",
    contacto: seller.robloxUser
  });
});

// ================= SERVER =================
app.listen(3000, () => {
  console.log("Servidor en http://localhost:3000");
});