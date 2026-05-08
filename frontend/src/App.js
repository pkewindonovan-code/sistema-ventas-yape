import { useEffect, useState } from "react";
import "./App.css";

import laptopImg from "./assets/productos/laptop.jpg";
import iphoneImg from "./assets/productos/iphone.png";
import refrigeradoraImg from "./assets/productos/refrigeradora.jpg";
import televisorImg from "./assets/productos/televisor.avif";

const API_URL = "https://sistema-ventas-yape-production.up.railway.app";

function App() {

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  const imagenes = {
    1: televisorImg,
    2: laptopImg,
    3: iphoneImg,
    4: refrigeradoraImg
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {

    try {

      const response = await fetch(
        `${API_URL}/productos`
      );

      const data = await response.json();

      setProductos(data);

    } catch (error) {

      console.log(error);

      alert("Backend desconectado");

    }

  };

  const agregarCarrito = (producto) => {

    const existe = carrito.find(
      (item) =>
        item.id_producto === producto.id_producto
    );

    if (existe) {

      setCarrito(
        carrito.map((item) =>
          item.id_producto === producto.id_producto
            ? {
                ...item,
                cantidad: item.cantidad + 1
              }
            : item
        )
      );

    } else {

      setCarrito([
        ...carrito,
        {
          ...producto,
          cantidad: 1
        }
      ]);

    }

  };

  const quitarProducto = (id) => {

    setCarrito(
      carrito.filter(
        (item) => item.id_producto !== id
      )
    );

  };

  const total = carrito.reduce(
    (suma, item) =>
      suma +
      Number(item.precio) *
      item.cantidad,
    0
  );

  const registrarVenta = async () => {

    if (carrito.length === 0) {

      alert("Agrega productos");

      return;

    }

    const venta = {

      total,

      carrito: carrito.map((item) => ({
        id: item.id_producto,
        cantidad: item.cantidad,
        precio: item.precio
      }))

    };

    try {

      const response = await fetch(
        `${API_URL}/ventas`,
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },

          body: JSON.stringify(venta)
        }
      );

      const data = await response.json();

      console.log(data);

      alert("Venta registrada correctamente");

      setCarrito([]);

    } catch (error) {

      console.log(error);

      alert("Error registrando venta");

    }

  };

  return (

    <div className="container">

      <header className="header">

        <h1>
          Sistema de Ventas
        </h1>

      </header>

      <section className="productos">

        {
          productos.slice(0, 4).map((p) => (

            <div
              className="card"
              key={p.id_producto}
            >

              <img
                src={imagenes[p.id_producto]}
                alt=""
                className="producto-img"
              />

              <div className="info">

                <h3>
                  {p.descripcion}
                </h3>

                <p className="precio">
                  S/ {p.precio}
                </p>

                <p>
                  Stock:
                  {" "}
                  {p.stock}
                </p>

                <button
                  onClick={() =>
                    agregarCarrito(p)
                  }
                >
                  Agregar al carrito
                </button>

              </div>

            </div>

          ))
        }

      </section>

      <section className="carrito">

        <h2>
          Carrito
        </h2>

        {
          carrito.length === 0
            ? (
              <p>
                No hay productos
              </p>
            )
            : (
              carrito.map((item) => (

                <div
                  className="carrito-item"
                  key={item.id_producto}
                >

                  <div>

                    <b>
                      {item.descripcion}
                    </b>

                    <p>

                      Cantidad:
                      {" "}
                      {item.cantidad}

                      {" | "}

                      Subtotal:
                      {" "}
                      S/
                      {" "}
                      {
                        Number(item.precio) *
                        item.cantidad
                      }

                    </p>

                  </div>

                  <button
                    className="btn-danger"
                    onClick={() =>
                      quitarProducto(
                        item.id_producto
                      )
                    }
                  >
                    Quitar
                  </button>

                </div>

              ))
            )
        }

        <h2>
          Total:
          {" "}
          S/
          {" "}
          {total}
        </h2>

        <button
          className="btn-finalizar"
          onClick={registrarVenta}
        >
          Registrar venta
        </button>

      </section>

    </div>

  );

}

export default App;