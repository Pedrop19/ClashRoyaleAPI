// server.mjs

import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
const app = express();
const port = 3000;
app.use(cors())

// Ruta para manejar solicitudes GET
app.get('/api/cards', async (req, res) => {
  try {
    // Hacer la solicitud a la API de Clash Royale
    const apiResponse = await fetch('https://api.clashroyale.com/v1/cards', {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6IjU1NGQ0MTkyLTUzYmUtNDc4YS05Y2RjLTllNzM4OTYxZGY2OSIsImlhdCI6MTcwMjAzNjE3Nywic3ViIjoiZGV2ZWxvcGVyLzI2YTVmNDE0LTI0MDUtNzgxMS1lZTQwLWJhYTUxZDIwYzc1MCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyLjEzOS4yNDYuMjQxIiwiNDYuMjIyLjIzNy4xNzgiLCI2Ni44MS4xNzQuODYiXSwidHlwZSI6ImNsaWVudCJ9XX0.Jyj8hZpHrfKp7wMdUwSDenmGrFsDQYpp8hprWwyvi92cbaQrrnMqCMUs_vjwCRg-g9H5yJLjdHrohZPeat3UrQ',
        'Content-Type': 'application/json',
      },
    });

    // Verificar si la solicitud fue exitosa (código 200)
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      res.json(data);
    } else {
      res.status(apiResponse.status).json({ error: 'Error al obtener datos de la API' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
});

app.get('/api/clans', async (req, res) => {
  const name = req.get('nameClan');
  console.log(name);
  try {
    // Hacer la solicitud a la API de Clash Royale
    const name = req.get('nameClan');
    console.log(name);
    const apiResponse = await fetch(`https://api.clashroyale.com/v1/clans?name=${name}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImU3YWIyM2Q5LTQwNTYtNGM5Ni1iMmFmLWI1OWE0ZGFkZDExNyIsImlhdCI6MTcwMTM3MjAwMiwic3ViIjoiZGV2ZWxvcGVyLzI2YTVmNDE0LTI0MDUtNzgxMS1lZTQwLWJhYTUxZDIwYzc1MCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyLjEzOS4yNDYuMjQxIiwiNDYuMjIyLjIzNy4xNzgiXSwidHlwZSI6ImNsaWVudCJ9XX0.fHsmJyXTi6y_G2FaaKNuO_rPR9YyvHnaNuMfj33GmyCiksexK6_HvcBSlPxotJANYiT56v2tRBHDWFRNUK7bGA',
        'Content-Type': 'application/json',
      },
    });

    // Verificar si la solicitud fue exitosa (código 200)
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      res.json(data);
    } else {
      res.status(apiResponse.status).json({ error: 'Error al obtener datos de la API' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error interno del servidor'});
  }
});

app.get('/api/players', async (req, res) => {
  try {
    // Hacer la solicitud a la API de Clash Royale
    let name = req.get('tagPlayer');
    name = name.replace("#", "%23");
    console.log(name);
    const apiResponse = await fetch(`https://api.clashroyale.com/v1/players/${name}`, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiIsImtpZCI6IjI4YTMxOGY3LTAwMDAtYTFlYi03ZmExLTJjNzQzM2M2Y2NhNSJ9.eyJpc3MiOiJzdXBlcmNlbGwiLCJhdWQiOiJzdXBlcmNlbGw6Z2FtZWFwaSIsImp0aSI6ImU3YWIyM2Q5LTQwNTYtNGM5Ni1iMmFmLWI1OWE0ZGFkZDExNyIsImlhdCI6MTcwMTM3MjAwMiwic3ViIjoiZGV2ZWxvcGVyLzI2YTVmNDE0LTI0MDUtNzgxMS1lZTQwLWJhYTUxZDIwYzc1MCIsInNjb3BlcyI6WyJyb3lhbGUiXSwibGltaXRzIjpbeyJ0aWVyIjoiZGV2ZWxvcGVyL3NpbHZlciIsInR5cGUiOiJ0aHJvdHRsaW5nIn0seyJjaWRycyI6WyIyLjEzOS4yNDYuMjQxIiwiNDYuMjIyLjIzNy4xNzgiXSwidHlwZSI6ImNsaWVudCJ9XX0.fHsmJyXTi6y_G2FaaKNuO_rPR9YyvHnaNuMfj33GmyCiksexK6_HvcBSlPxotJANYiT56v2tRBHDWFRNUK7bGA',
        'Content-Type': 'application/json',
      },
    });

    // Verificar si la solicitud fue exitosa (código 200)
    if (apiResponse.ok) {
      const data = await apiResponse.json();
      res.json(data);
    } else {
      res.status(apiResponse.status).json({ error: 'Error al obtener datos de la API' });
    }
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Error interno del servidor'});
  }
});


// Inicia el servidor en el puerto especificado
app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
