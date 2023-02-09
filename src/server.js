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
      id: id++,
    };
    publications.push(publication);

    res.status(200).json(publication);
  }
  return res.status(400).json({
    error:
      "No se recibieron los parámetros necesarios para crear la publicación",
  });
});

server.get("/posts/:author", (req, res) => {
  // const { author } = req.params;
  // const filtro = publications.filter((e) => e.author === author);
  // if (filtro.length) {

  //   return res.status(200).json(filtro);
  // } else {
  //   return res
  //     .status(400)
  //     .json({ error: "No existe ninguna publicación del autor indicado" });
  // }

  const { author } = req.params;
  if (author) {
    const filtro = publications.filter((e) => e.author === author);
    filtro.length
      ? res.status(200).json(filtro)
      : res
          .status(404)
          .json({ error: "El autor no se encuentra en la base de datos" });
  } else {
    return res.status(400).json({
      error: "El autor no fue brindado",
    });
  }
});

server.get("/posts", (req, res) => {
  const { author, title } = req.query;
  if (author && title) {
    const filtro = publications.filter(
      (e) => e.author === author && e.title === title
    );
    publications.length
      ? res.status(200).json(filtro)
      : res.status(400).json({
          error:
            "No existe ninguna publicación con dicho título y autor indicado",
        });
  } else {
    return res.status(400).json({
      error: "No existe ninguna publicación con dicho título y autor indicado",
    });
  }
});

server.put("/posts/:id", (res, req) => {
  const { id } = req.params;
  const { title, contents } = req.body;

  if (id && title && contents) {
    let filtroId = publications.find((e) => e.id === Number(id));

    if (!filtroId)
      res.status(400).json({
        error:
          "No se recibió el id correcto necesario para modificar la publicación",
      });
    else {
      filtroId = { ...filtroId, title: title, contents: title };
      return res.status(200).json(filtroId);
    }
  } else {
    return res.status(400).json({
      error:
        "No se recibieron los parámetros necesarios para modificar la publicación",
    });
  }
});

server.delete("/posts/:id", (res, req) => {
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({
      error: "No se recibió el id de la publicación a eliminar",
    });
  } else {
    let filtro = publications.filter((e) => e.id !== Number(id));

    if (publications.length === filtro.length) {
      return res
        .status(400)
        .json({
          error:
            "No se recibió el id correcto necesario para eliminar la publicación",
        });
    }

    publications = filtro;
    res.status(200).json({ success: true });
  }
});

//NO MODIFICAR EL CODIGO DE ABAJO. SE USA PARA EXPORTAR EL SERVIDOR Y CORRER LOS TESTS
module.exports = { publications, server };
