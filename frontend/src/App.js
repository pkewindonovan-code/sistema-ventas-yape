import "./App.css";
import { useEffect, useState } from "react";

import laptop from "./assets/productos/laptop.jpg";
import refrigeradora from "./assets/productos/refrigeradora.jpg";
import iphone from "./assets/productos/iphone.png";
import televisor from "./assets/productos/televisor.avif";

const API = "https://sistema-ventas-yape-production-f34e.up.railway.app";

function App() {
  const [productos, setProductos] = useState([]);
  const [carrito, setCarrito] = useState([]);

  useEffect(() => {
    fetch(`${API}/productos`)
      .then((res) => res.json())
      .then((data) => {
        const imagenes = [televisor, laptop, iphone, refrigeradora];

        const productosConImagen = data.map((p, index) => ({
          ...p,
          imagen: imagenes[index],
        }));

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
    <div style={{ background: "#f3f4f6", minHeight: "100vh", fontFamily: "Arial" }}>
      <div
        style={{
          background: "#111827",
          color: "white",
          padding: "20px",
          textAlign: "center",
          fontSize: "32px",
          fontWeight: "bold",
        }}
      >
        Sistema de Ventas
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit,minmax(280px,1fr))",
          gap: "25px",
          padding: "30px",
        }}
      >
        {productos.map((p) => (
          <div
            key={p.id_producto}
            style={{
              borderRadius: "20px",
              overflow: "hidden",
              background: "#fff",
              boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
            }}
          >
            <img
              src={p.imagen}
              alt={p.descripcion}
              style={{
                width: "100%",
                height: "250px",
                objectFit: "contain",
                background: "white",
              }}
            />

            <div style={{ padding: "20px" }}>
              <h2>{p.descripcion}</h2>

              <p style={{ fontSize: "20px", fontWeight: "bold", color: "#059669" }}>
                S/ {p.precio}
              </p>

              <p>Stock: {p.stock}</p>

              <button
                onClick={() => agregarCarrito(p)}
                style={{
                  background: "#7c3aed",
                  color: "white",
                  border: "none",
                  padding: "12px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  width: "100%",
                  fontSize: "16px",
                  fontWeight: "bold",
                }}
              >
                Agregar al carrito
              </button>
            </div>
          </div>
        ))}
      </div>

      <div
        style={{
          background: "white",
          margin: "20px",
          padding: "20px",
          borderRadius: "20px",
          boxShadow: "0 6px 20px rgba(0,0,0,0.1)",
        }}
      >
        <h2>🛒 Carrito</h2>

        {carrito.length === 0 ? (
          <p>No hay productos</p>
        ) : (
          carrito.map((item, index) => (
            <div
              key={index}
              style={{
                marginBottom: "10px",
                borderBottom: "1px solid #ddd",
                paddingBottom: "10px",
              }}
            >
              {item.descripcion} - S/ {item.precio}
            </div>
          ))
        )}

        <h2 style={{ color: "#059669" }}>Total: S/ {total}</h2>

        <button
          onClick={registrarVenta}
          style={{
            background: "#059669",
            color: "white",
            border: "none",
            padding: "15px",
            borderRadius: "10px",
            cursor: "pointer",
            width: "100%",
            fontSize: "18px",
            fontWeight: "bold",
          }}
        >
          Registrar Venta
        </button>
      </div>
    </div>
  );
}

export default App;