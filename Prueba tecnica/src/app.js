// src/App.js

import React from "react";
import ExcelUploader from "./ExcelUploader";

function App() {
    return (
        <div className="App">
            <h1>Carga de Archivos Excel</h1>
            <ExcelUploader />
        </div>
    );
}

export default App;


// src/App.js

import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import PersonasTable from './components/PersonasTable';

function App() {
    return (
        <div className="App">
            <h1>Administración de Datos de Población</h1>
            <PersonasTable />
        </div>
    );
}

export default App;

// src/App.js

import React from 'react';
import { UserProvider } from './context/UserContext';
import Dashboard from './components/Dashboard';

function App() {
    return (
        <UserProvider>
            <Dashboard />
        </UserProvider>
    );
}

export default App;
