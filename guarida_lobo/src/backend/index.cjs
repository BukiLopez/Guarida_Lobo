const express = require('express');
const db = require('./db.js')
const cors = require('cors')

const app = express();
const  PORT = 3001;
app.use(cors());
app.use(express.json())

// Route to get all posts
app.get("/api/get", (req,res)=>{
db.query("SELECT * FROM comics", (err,result)=>{
    if(err) {
    console.log(err)
    } 
res.send(result)
});   });

// Route to get one post
app.get("/api/getFromId/:id", (req,res)=>{

const id = req.params.id;
 db.query("SELECT * FROM comics WHERE id = ?", id, 
 (err,result)=>{
    if(err) {
    console.log(err)
    } 
    res.send(result)
    });   });


// Route to delete a post

app.delete('/api/delete/:id',(req,res)=>{
const id = req.params.id;

db.query("DELETE FROM comics WHERE id= ?", id, (err,result)=>{
if(err) {
console.log(err)
        } }) })

app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})

// Ruta para obtener cómics relacionados por personaje, dado el id de un cómic
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
      res.status(500).send("Error al obtener cómics relacionados");
      return;
    }
    res.json(results);
  });
});
