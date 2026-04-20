const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// 🔹 Datos de prueba
let pets = [
  { id: 1, nombre: "Firulais", tipo: "Perro" },
  { id: 2, nombre: "Michi", tipo: "Gato" }
];

// 🔹 RUTA PRINCIPAL
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// 🔹 OBTENER MASCOTAS
app.get("/pets", (req, res) => {
  res.json(pets);
});

// 🔹 AGREGAR MASCOTA
app.post("/pets", (req, res) => {
  const nueva = {
    id: pets.length + 1,
    nombre: req.body.nombre,
    tipo: req.body.tipo
  };
  pets.push(nueva);
  res.json(nueva);
});

// 🔹 PUERTO
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});