import { useEffect, useState } from "react";
import "./App.css";

const API_URL = "https://sistema-ventas-yape-production.up.railway.app";

function App() {

  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {

    try {

      const response = await fetch(`${API_URL}/productos`);

      const data = await response.json();

      console.log(data);

      if (Array.isArray(data)) {
        setProductos(data);
      } else {
        setProductos([]);
      }

    } catch (error) {

      console.log(error);

      setProductos([]);

    }

  };

  return (

    <div style={{ padding: "20px" }}>

      <h1>Sistema de Ventas</h1>

      {
        productos.length === 0
        ? (
          <p>No hay productos</p>
        )
        : (
          productos.map((p) => (

            <div
              key={p.id_producto}
              style={{
                border: "1px solid gray",
                margin: "10px",
                padding: "10px"
              }}
            >

              <h3>{p.descripcion}</h3>

              <p>Precio: S/ {p.precio}</p>

              <p>Stock: {p.stock}</p>

            </div>

          ))
        )
      }

    </div>

  );

}

export default App;