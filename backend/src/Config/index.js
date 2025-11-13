// backend/src/Config/index.js
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import pool from './db.js';
import usuariosRouter from "../Routes/usuarioRoutes.js";
import path from 'path';
import  fileURLToPath  from 'url';
import company from "../Routes/empresaRoutes.js";
dotenv.config();

const app = express();
app.use('/uploads', express.static('src/uploads')); 
app.use(cors({ origin: 'http://localhost:5173' }));
app.use(express.json());

app.use("/api/usuarios", usuariosRouter);
app.use("/api/empresas", company);

app.get("/", (req, res) => {
  res.json({ message: "Servidor Node.js con MariaDB funcionando" });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});