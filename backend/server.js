require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const Tarea = require("./models/Tarea");

const app = express();
app.use(express.json());

// Conexión a MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error de conexión:", err));

// Ruta: obtener todas las tareas
app.get("/tareas", async (req, res) => {
  const tareas = await Tarea.find();
  res.json(tareas);
});

// Ruta: crear tarea
app.post("/tareas", async (req, res) => {
  const nuevaTarea = new Tarea({ titulo: req.body.titulo });
  await nuevaTarea.save();
  res.status(201).json(nuevaTarea);
});

// Ruta: marcar tarea como completada
app.put("/tareas/:id", async (req, res) => {
  const tarea = await Tarea.findByIdAndUpdate(
    req.params.id,
    { completada: true },
    { new: true }
  );
  if (!tarea) return res.status(404).json({ error: "Tarea no encontrada" });
  res.json(tarea);
});

// Iniciar servidor
app.listen(process.env.PORT, () => {
  console.log(`🚀 Servidor escuchando en http://localhost:${process.env.PORT}`);
});