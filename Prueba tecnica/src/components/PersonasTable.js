// src/components/PersonasTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Pagination } from 'react-bootstrap';

const PersonasTable = () => {
    const [personas, setPersonas] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const perPage = 100;

    useEffect(() => {
        fetchPersonas(currentPage);
    }, [currentPage]);

    const fetchPersonas = async (page) => {
        try {
            const response = await axios.get(`/api/personas?page=${page}&per_page=${perPage}`);
            setPersonas(response.data);
        } catch (error) {
            console.error('Error fetching personas:', error);
        }
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div>
            <h2>Lista de Personas</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona) => (
                        <tr key={persona.id}>
                            <td>{persona.id}</td>
                            <td>{persona.nombre}</td>
                            <td>{persona.paterno}</td>
                            <td>{persona.materno}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Paginador */}
            <Pagination>
                <Pagination.Prev onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1} />
                <Pagination.Item>{currentPage}</Pagination.Item>
                <Pagination.Next onClick={() => handlePageChange(currentPage + 1)} />
            </Pagination>
        </div>
    );
};

export default PersonasTable;


// src/components/PersonasTable.js

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Modal, Table, Pagination } from 'react-bootstrap';

const PersonasTable = () => {
    const [personas, setPersonas] = useState([]);
    const [selectedPersona, setSelectedPersona] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);

    const itemsPerPage = 100;

    // Fetch personas with pagination
    const fetchPersonas = async (page) => {
        try {
            const response = await axios.get(`/api/personas?page=${page}&limit=${itemsPerPage}`);
            setPersonas(response.data.personas);
            setTotalPages(response.data.totalPages);
            setCurrentPage(page);
        } catch (error) {
            console.error('Error fetching personas:', error);
        }
    };

    useEffect(() => {
        fetchPersonas(currentPage);
    }, [currentPage]);

    // Select a persona to view details
    const handleSelectPersona = async (personaId) => {
        try {
            const response = await axios.get(`/api/personas/${personaId}`);
            setSelectedPersona(response.data);
        } catch (error) {
            console.error('Error fetching persona details:', error);
        }
    };

    return (
        <div>
            <h2>Lista de Personas</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Nombre</th>
                        <th>Apellido Paterno</th>
                        <th>Apellido Materno</th>
                        <th>Teléfono</th>
                        <th>Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {personas.map((persona) => (
                        <tr key={persona.id}>
                            <td>{persona.nombre}</td>
                            <td>{persona.paterno}</td>
                            <td>{persona.materno}</td>
                            <td>{persona.telefono}</td>
                            <td>
                                <button onClick={() => handleSelectPersona(persona.id)} className="btn btn-info">
                                    Ver Detalles
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <Pagination>
                {[...Array(totalPages)].map((_, index) => (
                    <Pagination.Item
                        key={index + 1}
                        active={index + 1 === currentPage}
                        onClick={() => setCurrentPage(index + 1)}
                    >
                        {index + 1}
                    </Pagination.Item>
                ))}
            </Pagination>

            {selectedPersona && (
                <Modal show={true} onHide={() => setSelectedPersona(null)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Detalles de Persona</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p><strong>Nombre:</strong> {selectedPersona.nombre}</p>
                        <p><strong>Apellido Paterno:</strong> {selectedPersona.paterno}</p>
                        <p><strong>Apellido Materno:</strong> {selectedPersona.materno}</p>
                        <p><strong>Teléfonos:</strong></p>
                        <ul>
                            {selectedPersona.telefonos.map((telefono, index) => (
                                <li key={index}>{telefono}</li>
                            ))}
                        </ul>
                        <p><strong>Direcciones:</strong></p>
                        <ul>
                            {selectedPersona.direcciones.map((direccion, index) => (
                                <li key={index}>
                                    {direccion.calle} #{direccion.numero_exterior}, {direccion.colonia}, CP {direccion.cp}
                                </li>
                            ))}
                        </ul>
                    </Modal.Body>
                    <Modal.Footer>
                        <button onClick={() => setSelectedPersona(null)} className="btn btn-secondary">
                            Cerrar
                        </button>
                    </Modal.Footer>
                </Modal>
            )}
        </div>
    );
};

export default PersonasTable;
