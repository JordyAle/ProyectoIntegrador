import React, { useEffect, useState } from 'react';
import '../App.css';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

// Registrar los componentes de Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ListaAlumnos = () => {
  const [alumnos, setAlumnos] = useState([]);

  const fetchAlumnos = async () => {
    const response = await fetch('http://localhost/apiprueba/api.php');
    const data = await response.json();
    setAlumnos(data);
  };

  useEffect(() => {
    fetchAlumnos();
    const interval = setInterval(() => {
      fetchAlumnos();
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  // Configuración de datos para la gráfica
  const chartData = {
    labels: alumnos.map(alumno => alumno.nombre),
    datasets: [
      {
        label: 'Edad de los Alumnos',
        data: alumnos.map(alumno => alumno.edad),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1 className="App App-link">LISTA DE ALUMNOS</h1>
      <div className="alumnos-container">
        {alumnos.map((alumno) => (
          <div className="alumno-card" key={alumno.id}>
            <div>ID: <strong>{alumno.id}</strong></div>
            <div>Nombre: <strong>{alumno.nombre}</strong></div>
            <div>Género: <strong>{alumno.genero}</strong></div>
            <div>Edad: <strong>{alumno.edad}</strong></div>
          </div>
        ))}
      </div>

      <div className="chart-container">
        {/* Mostrar el gráfico de barras */}
        <Bar data={chartData} options={{ responsive: true }} />
      </div>
    </div>
  );
};

export default ListaAlumnos;
