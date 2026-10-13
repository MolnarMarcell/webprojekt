
import { useEffect, useState } from 'react';
import api from '../api/axiosInstance.js';
import RendelesKartya from './RendelesKartya.jsx';

export default function RendelesLista() {
    const [RendelesLista, setRendelesLista] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await api.get('/rendelesek');
                setRendelesLista(response.data);
            }
            catch (error) {
                console.error('Hiba', error)
            }
        };
        fetchData();

    }, []);

    return (
        <div>
            <h2>Termékek</h2>
            {RendelesLista.map((Rendeles) => (
                <RendelesKartya key={Rendeles.id} vevo={Rendeles}/>
            ))}
        </div>
    )
}