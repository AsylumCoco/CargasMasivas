// src/components/PersonaDetail.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PersonaDetail = ({ personaId }) => {
    const [details, setDetails] = useState({ telefonos: [], direcciones: [] });

    useEffect(() => {
        fetchDetails();
    }, []);

    const fetchDetails = async () => {
        try {
            const response = await axios.get(`/api/personas/${personaId}`);
            setDetails(response.data);
        } catch (error) {
            console.error('Error fetching details:', error);
        }
    };

    return (
        <div>
            <h3>Detalles de Persona</h3>
            <h4>Teléfonos</h4>
            <ul>
                {details.telefonos.map((tel) => (
                    <li key={tel.id}>{tel.telefono}</li>
                ))}
            </ul>
            <h4>Direcciones</h4>
            <ul>
                {details.direcciones.map((dir) => (
                    <li key={dir.id}>
                        {dir.calle}, {dir.colonia}, CP: {dir.cp}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PersonaDetail;
