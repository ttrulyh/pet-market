const express = require("express");
const cors = require("cors");

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Datos en memoria (simulación de base de datos)
let pets = [
  { id: 1, nombre: "Firulais", tipo: "perro" },
  { id: 2, nombre: "Michi", tipo: "gato" }
];

// Ruta base
app.get("/", (req, res) => {
  res.send("API funcionando 🚀");
});

// Obtener mascotas
app.get("/pets", (req, res) => {
  res.json(pets);
});

// Agregar mascota
app.post("/pets", (req, res) => {
  const nueva = {
    id: pets.length + 1,
    nombre: req.body.nombre,
    tipo: req.body.tipo
  };

  pets.push(nueva);
  res.json(nueva);
});

// Eliminar mascota
app.delete("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pets = pets.filter(p => p.id !== id);
  res.json({ mensaje: "Eliminado" });
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});s