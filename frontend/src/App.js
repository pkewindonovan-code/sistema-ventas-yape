import "./App.css";
import { useEffect, useState } from "react";

const API = "https://sistema-ventas-yape-production-f34e.up.railway.app";

function App() {

  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {

    fetch(`${API}/productos`)
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((err) => {
        console.log(err);
        alert("Backend desconectado");
      });

  }, []);

  const agregarCarrito = (producto) => {

    setCarrito([...carrito, producto]);

  };

  const total = carrito.reduce((acc, item) => {
    return acc + Number(item.precio);
  }, 0);

  const registrarVenta = async () => {

    try {

      const res = await fetch(`${API}/ventas`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          carrito,
          total,
        }),
      });

      const data = await res.json();

      alert(data.mensaje);

      setCarrito([]);

    } catch (error) {

      console.log(error);
      alert("Error registrando venta");

    }

  };

  return (
    <div className="App">

      <h1>Sistema de Ventas</h1>

      <div className="productos">

        {productos.map((p) => (

          <div className="card" key={p.id_producto}>

            <h3>{p.descripcion}</h3>

            <p>Precio: S/ {p.precio}</p>

            <p>Stock: {p.stock}</p>

            <button onClick={() => agregarCarrito(p)}>
              Agregar
            </button>

          </div>

        ))}

      </div>

      <hr />

      <h2>Carrito</h2>

      {carrito.length === 0 ? (
        <p>No hay productos</p>
      ) : (
        carrito.map((item, index) => (
          <div key={index}>
            {item.descripcion} - S/ {item.precio}
          </div>
        ))
      )}

      <h2>Total: S/ {total}</h2>

      <button onClick={registrarVenta}>
        Registrar venta
      </button>

    </div>
  );

}

export default App;