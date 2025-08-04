require('dotenv').config();
const express = require('express');
const db = require('./db.js');
const cors = require('cors');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY;

app.use(cors());
app.use(express.json());

// --- ENDPOINTS ORIGINALES ---

// Obtener todos los comics
app.get("/api/get", (req, res) => {
  db.query("SELECT * FROM comics", (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error en la base de datos");
    }
    res.json(result);
  });
});

// Obtener comic por id
app.get("/api/getFromId/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM comics WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error en la base de datos");
    }
    res.json(result);
  });
});

// Búsqueda de comics por nombre (parcial)
app.get("/api/search", (req, res) => {
  const search = `%${req.query.q}%`;
  const sql = `
    SELECT id, nombre, portada_url, descripcion, precio
    FROM comics
    WHERE nombre LIKE ?`;

  db.query(sql, [search], (err, results) => {
    if (err) {
      console.error("Error al buscar cómics:", err);
      return res.status(500).send("Error en la búsqueda");
    }
    res.json(results);
  });
});

// Eliminar comic por id
app.delete('/api/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM comics WHERE id= ?", id, (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error al eliminar");
    }
    res.json({ message: "Comic eliminado" });
  });
});

// Obtener comics relacionados por personaje dado un id de comic
app.get("/api/related/:id", (req, res) => {
  const comicId = req.params.id;
  const sql = `
    SELECT DISTINCT c2.*
    FROM comic_personaje cp1
    JOIN comic_personaje cp2 ON cp1.personaje_id = cp2.personaje_id
    JOIN comics c2 ON cp2.comic_id = c2.id
    WHERE cp1.comic_id = ?
      AND cp2.comic_id != ?
    LIMIT 5;
  `;

  db.query(sql, [comicId, comicId], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).send("Error al obtener cómics relacionados");
    }
    res.json(results);
  });
});

// --- ENDPOINTS NUEVOS: registro, login y perfil ---

// Registro de usuario
app.post('/api/registro', async (req, res) => {
  const { nombre, correo, password } = req.body;
  if (!nombre || !correo || !password) {
    return res.status(400).json({ message: 'Faltan campos obligatorios' });
  }

  db.query('SELECT id FROM usuarios WHERE correo = ?', [correo], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });
    if (results.length > 0) return res.status(400).json({ message: 'Correo ya registrado' });

    const hashedPassword = await bcrypt.hash(password, 10);

    db.query(
      'INSERT INTO usuarios (nombre, correo, password) VALUES (?, ?, ?)',
      [nombre, correo, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ message: 'Error al registrar usuario' });

        res.status(201).json({ message: 'Usuario registrado correctamente' });
      }
    );
  });
});

// Login de usuario
app.post('/api/login', (req, res) => {
  const { correo, password } = req.body;
  if (!correo || !password) {
    return res.status(400).json({ message: 'Faltan correo o contraseña' });
  }

  db.query('SELECT * FROM usuarios WHERE correo = ?', [correo], async (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });
    if (results.length === 0) return res.status(400).json({ message: 'Usuario no encontrado' });

    const user = results[0];
    const validPass = await bcrypt.compare(password, user.password);
    if (!validPass) return res.status(401).json({ message: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, correo: user.correo },
      SECRET_KEY,
      { expiresIn: '8h' }
    );

    res.json({ token });
  });
});

// Middleware para validar token JWT
function verifyToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  if (!authHeader) return res.status(401).json({ message: 'Acceso denegado, no token' });

  const token = authHeader.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Token no proporcionado' });

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ message: 'Token inválido' });
    req.user = user;
    next();
  });
}

// Obtener perfil usuario (requiere token)
app.get('/api/perfil', verifyToken, (req, res) => {
  res.json({
    id: req.user.id,
    nombre: req.user.nombre,
    correo: req.user.correo
  });
});

app.post('/api/carrito', verifyToken, (req, res) => {
  const { comic_id } = req.body;
  const usuario_id = req.user.id;

  if (!comic_id) {
    return res.status(400).json({ message: 'Falta comic_id' });
  }

  // Verificar si ya existe el comic en el carrito
  const checkSql = 'SELECT cantidad FROM carrito WHERE usuario_id = ? AND comic_id = ?';
  db.query(checkSql, [usuario_id, comic_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error en la base de datos' });

    if (results.length > 0) {
      // Ya existe, actualizar cantidad sumando 1
      const nuevaCantidad = results[0].cantidad + 1;
      const updateSql = 'UPDATE carrito SET cantidad = ? WHERE usuario_id = ? AND comic_id = ?';
      db.query(updateSql, [nuevaCantidad, usuario_id, comic_id], (err2) => {
        if (err2) return res.status(500).json({ message: 'Error al actualizar cantidad' });
        res.json({ message: 'Cantidad actualizada en el carrito', cantidad: nuevaCantidad });
      });
    } else {
      // No existe, insertar nuevo registro con cantidad 1
      const insertSql = 'INSERT INTO carrito (usuario_id, comic_id, cantidad) VALUES (?, ?, 1)';
      db.query(insertSql, [usuario_id, comic_id], (err3) => {
        if (err3) return res.status(500).json({ message: 'Error al agregar al carrito' });
        res.status(201).json({ message: 'Cómic agregado al carrito', cantidad: 1 });
      });
    }
  });
});

// Obtener carrito del usuario (con detalles de comics y cantidad)
app.get('/api/carrito', verifyToken, (req, res) => {
  const usuario_id = req.user.id;

  const sql = `
    SELECT c.id, c.nombre, c.portada_url, c.descripcion, c.precio, ca.cantidad
    FROM carrito ca
    JOIN comics c ON ca.comic_id = c.id
    WHERE ca.usuario_id = ?
  `;

  db.query(sql, [usuario_id], (err, results) => {
    if (err) return res.status(500).json({ message: 'Error al obtener el carrito' });

    res.json(results);
  });
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
