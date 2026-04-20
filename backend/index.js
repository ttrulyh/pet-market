const express = require("express");
const app = express();

// IMPORTANTE para Render (usa el puerto que te da)
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Datos de prueba
let pets = [
  { id: 1, nombre: "Firulais", edad: 3 },
  { id: 2, nombre: "Michi", edad: 2 }
];

// Ruta principal
app.get("/", (req, res) => {
  res.send("🐶 Pet Market funcionando");
});

// Obtener todas las mascotas
app.get("/pets", (req, res) => {
  res.json(pets);
});

// Agregar mascota
app.post("/pets", (req, res) => {
  const nueva = {
    id: pets.length + 1,
    nombre: req.body.nombre,
    edad: req.body.edad
  };

  pets.push(nueva);
  res.json(nueva);
});

// Eliminar mascota
app.delete("/pets/:id", (req, res) => {
  const id = parseInt(req.params.id);
  pets = pets.filter(p => p.id !== id);
  res.send("Mascota eliminada");
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log("Servidor corriendo en puerto " + PORT);
});