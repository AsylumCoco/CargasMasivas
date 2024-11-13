// app/Http/Controllers/ExcelUploadController.php
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use Maatwebsite\Excel\Facades\Excel;
use App\Models\Person;

class ExcelUploadController extends Controller
{
    public function uploadExcel(Request $request)
    {
        // Validar que el archivo sea un Excel
        $request->validate([
            'file' => 'required|mimes:xlsx,xls|max:2048', // Maximo 2MB
        ]);

        // Obtener el archivo
        $file = $request->file('file');

        // Subir el archivo a almacenamiento temporal
        $path = $file->storeAs('temp', $file->getClientOriginalName());

        // Procesar el archivo Excel
        $this->processExcel(storage_path('app/' . $path));

        return response()->json(['message' => 'Archivo cargado correctamente'], 200);
    }

    // Función para procesar el archivo Excel y cargarlo en la base de datos
    private function processExcel($filePath)
    {
        // Usamos la librería Excel para leer el archivo
        $excelData = Excel::toArray([], $filePath);

        // Preparar los datos para la carga masiva
        $data = [];
        foreach ($excelData[0] as $row) {
            // Ignorar las filas vacías o de encabezado
            if (empty($row[0])) {
                continue;
            }

            // Extraer datos del Excel
            $data[] = [
                'nombre' => $row[0],
                'paterno' => $row[1],
                'materno' => $row[2],
                'telefono' => $row[3],
                'calle' => $row[4],
                'numero_exterior' => $row[5],
                'numero_interior' => $row[6],
                'colonia' => $row[7],
                'cp' => $row[8],
            ];
        }

        // Almacenar los datos en una tabla temporal
        $this->loadDataIntoTemporaryTable($data);
    }

    // Función para cargar los datos en una tabla temporal usando LOAD DATA
    private function loadDataIntoTemporaryTable($data)
    {
        // Crear una tabla temporal
        DB::statement('CREATE TEMPORARY TABLE temp_personas (
            nombre VARCHAR(255),
            paterno VARCHAR(255),
            materno VARCHAR(255),
            telefono VARCHAR(255),
            calle VARCHAR(255),
            numero_exterior VARCHAR(255),
            numero_interior VARCHAR(255),
            colonia VARCHAR(255),
            cp VARCHAR(255)
        )');

        // Insertar los datos en la tabla temporal
        DB::table('temp_personas')->insert($data);

        // Llamar al procedimiento almacenado para procesar la carga masiva
        DB::statement('CALL sp_process_personas();');
    }
}
