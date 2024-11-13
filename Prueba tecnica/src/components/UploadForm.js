// src/components/UploadForm.js

import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const UploadForm = () => {
    const { user } = useContext(UserContext);

    if (user.role !== 'admin') {
        return <p>No tienes permiso para ver esta sección.</p>;
    }

    // Formulario de carga...
    return (
        <div>
            <h2>Cargar Archivo de Población</h2>
            {/* Formulario de arrastrar y soltar para el archivo */}
        </div>
    );
};

export default UploadForm;
