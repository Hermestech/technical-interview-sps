import { NextApiRequest, NextApiResponse } from 'next'
import axios from 'axios';

const BASE_URL = 'https://fakestoreapi.com'

export default async function handler(req: NextApiRequest, res: NextApiResponse) { 

    if (req.method === 'POST') {
        try {
            const response = await axios.post(`${BASE_URL}/auth/login`, req.body);
            res.status(200).json(response.data);
        } catch (error) {
            res.status(500).json({ error: 'Error en la autenticación. Por favor, verifica tus credenciales e intenta de nuevo. Si no estás registrado, recuerda usar un usuario de la documentación de https://fakestoryapi.com' });
        }
    } else {
        res.status(400).json({ error: 'Método no permitido' });
    }
}
