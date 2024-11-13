import React, { useContext } from 'react';
import PersonasTable from './components/PersonasTable';
import UploadForm from './components/UploadForm'; // El formulario de carga de archivos
import { UserContext } from './context/UserContext';

const Dashboard = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Administración de Datos de Población</h1>
            {user.role === 'admin' && <UploadForm />}
            <PersonasTable />
        </div>
    );
};

export default Dashboard;

// src/components/Dashboard.js

import React, { useContext } from 'react';
import PersonasTable from './PersonasTable';
import UploadForm from './UploadForm'; // Formulario de carga de archivos
import { UserContext } from '../context/UserContext';

const Dashboard = () => {
    const { user } = useContext(UserContext);

    return (
        <div>
            <h1>Administración de Datos de Población</h1>
            {/* Si el rol es admin, muestra el formulario de carga */}
            {user && user.role === 'admin' && <UploadForm />}
            <PersonasTable /> {/* Este componente es visible para ambos roles */}
        </div>
    );
};

export default Dashboard;
