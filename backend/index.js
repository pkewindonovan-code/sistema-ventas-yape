const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

const productos = [
  {
    id_producto: 1,
    descripcion: "Televisor Samsung",
    precio: 1800,
    stock: 4
  },
  {
    id_producto: 2,
    descripcion: "Laptop Lenovo",
    precio: 2500,
    stock: 5
  },
  {
    id_producto: 3,
    descripcion: "iPhone 14",
    precio: 4200,
    stock: 3
  },
  {
    id_producto: 4,
    descripcion: "Refrigeradora LG",
    precio: 2300,
    stock: 2
  }
];

app.get("/", (req, res) => {
  res.send("Backend funcionando correctamente");
});

app.get("/productos", (req, res) => {
  res.json(productos);
});

app.post("/ventas", (req, res) => {

  const { total, carrito } = req.body;

  console.log("Venta registrada:", {
    total,
    carrito
  });

  res.json({
    mensaje: "Venta registrada correctamente"
  });

});

const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log("Servidor corriendo en puerto " + PORT);
});