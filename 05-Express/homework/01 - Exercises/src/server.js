const express = require("express");

let publications = [];

const server = express();

server.use(express.json());

let id = 1;
server.post("/posts", (req, res) => {
  const { author, title, contents } = req.body;

  // if(!author || !title || !contents){
  //     return res.status(400).json({
  //         error: "No existe ninguna publicación con dicho título y autor indicado",
  //     });
  // }

  if (author && title && contents) {
     const publication = {
        author,
        title,
        contents,
        id: id++
     };

  }
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
