const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend funcionando");
});

app.get("/productos", (req, res) => {

  db.query(
    "SELECT * FROM producto",
    (err, result) => {

      if (err) {
        return res.status(500).json(err);
      }

      res.json(result);

    }
  );

});

app.post("/ventas", (req, res) => {

  const { carrito } = req.body;

  if (!carrito || carrito.length === 0) {

    return res.status(400).json({
      mensaje: "Carrito vacío"
    });

  }

  db.query(
    "INSERT INTO ventas (id_cliente) VALUES (NULL)",
    (err, result) => {

      if (err) {

        console.log(err);

        return res.status(500).json(err);

      }

      const idVenta = result.insertId;

      carrito.forEach((item) => {

        db.query(
          `
          INSERT INTO detalle_venta
          (
            cantidad,
            id_producto,
            id_venta
          )
          VALUES (?, ?, ?)
          `,
          [
            item.cantidad,
            item.id,
            idVenta
          ]
        );

        db.query(
          `
          UPDATE producto
          SET stock = stock - ?
          WHERE id_producto = ?
          `,
          [
            item.cantidad,
            item.id
          ]
        );

      });

      res.json({
        mensaje: "Venta registrada",
        id_venta: idVenta
      });

    }
  );

});

app.listen(3001, () => {

  console.log("Servidor en puerto 3001");

});