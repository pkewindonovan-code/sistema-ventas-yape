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

        const productosConImagen = data.map((p, index) => {

          const imagenes = [
            "https://images.unsplash.com/photo-1593784991095-a205069470b6",
            "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
            "https://images.unsplash.com/photo-1580910051074-3eb694886505",
            "https://images.unsplash.com/photo-1581578731548-c64695cc6952"
          ];

          return {
            ...p,
            imagen: imagenes[index]
          };

        });

        setProductos(productosConImagen);

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

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(250px,1fr))",
          gap: "20px",
          padding: "20px"
        }}
      >

        {productos.map((p) => (

          <div
            key={p.id_producto}
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 4px 15px rgba(0,0,0,0.1)"
            }}
          >

            <img
              src={p.imagen}
              alt={p.descripcion}
              style={{
                width: "100%",
                height: "220px",
                objectFit: "cover"
              }}
            />

            <div style={{ padding: "15px" }}>

              <h2>{p.descripcion}</h2>

              <p>Precio: S/ {p.precio}</p>

              <p>Stock: {p.stock}</p>

              <button
                onClick={() => agregarCarrito(p)}
                style={{
                  background: "#7c3aed",
                  color: "white",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  cursor: "pointer"
                }}
              >
                Agregar
              </button>

            </div>

          </div>

        ))}

      </div>

      <hr />

      <div style={{ padding: "20px" }}>

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

        <button
          onClick={registrarVenta}
          style={{
            background: "green",
            color: "white",
            border: "none",
            padding: "12px 20px",
            borderRadius: "10px",
            cursor: "pointer"
          }}
        >
          Registrar venta
        </button>

      </div>

    </div>
  );

}

export default App;