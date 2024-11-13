// src/ExcelUploader.js

import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import * as XLSX from "xlsx";
import axios from "axios";

const ExcelUploader = () => {
    const [file, setFile] = useState(null);
    const [error, setError] = useState(null);

    // Configuración del dropzone (arrastrar y soltar)
    const { getRootProps, getInputProps } = useDropzone({
        accept: ".xlsx, .xls", // Solo aceptar archivos Excel
        onDrop: (acceptedFiles) => {
            setFile(acceptedFiles[0]);
            setError(null); // Limpiar errores al seleccionar un archivo nuevo
        },
    });

    // Función para procesar el archivo Excel
    const handleUpload = () => {
        if (!file) {
            setError("Por favor, selecciona un archivo Excel.");
            return;
        }

        // Crear un objeto FormData
        const formData = new FormData();
        formData.append("file", file);

        // Subir el archivo al servidor con Axios
        axios
            .post("http://127.0.0.1:8000/api/upload-excel", formData, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            })
            .then((response) => {
                console.log(response.data);
                alert("Archivo cargado y procesado correctamente");
            })
            .catch((error) => {
                console.error("Error al cargar el archivo:", error);
                alert("Hubo un problema al cargar el archivo.");
            });
    };

    return (
        <div>
            <div {...getRootProps()} style={styles.dropzone}>
                <input {...getInputProps()} />
                <p>Arrastra y suelta un archivo Excel aquí, o haz clic para seleccionar</p>
            </div>

            {file && (
                <div style={styles.fileInfo}>
                    <p><strong>Archivo seleccionado:</strong> {file.name}</p>
                </div>
            )}

            {error && <p style={styles.error}>{error}</p>}

            <button onClick={handleUpload} style={styles.button}>
                Subir Archivo
            </button>
        </div>
    );
};

const styles = {
    dropzone: {
        border: "2px dashed #007bff",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
    },
    fileInfo: {
        marginTop: "10px",
    },
    error: {
        color: "red",
    },
    button: {
        marginTop: "20px",
        padding: "10px 20px",
        backgroundColor: "#007bff",
        color: "#fff",
        border: "none",
        cursor: "pointer",
    },
};

export default ExcelUploader;
