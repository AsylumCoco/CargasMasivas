<?php

use App\Http\Controllers\AuthController;
use Illuminate\Support\Facades\Route;

Route::post('login', [AuthController::class, 'login']);



use App\Http\Controllers\ExcelUploadController;

Route::post('upload-excel', [ExcelUploadController::class, 'uploadExcel']);

// routes/api.php

Route::get('/personas', [PersonaController::class, 'getPersonasPaginated'])->middleware('auth:api');



//Actualizar las Rutas

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonaController;

Route::middleware('auth:api')->group(function () {
    Route::get('/personas', [PersonaController::class, 'getPersonasPaginated']);

    Route::middleware('can:isAdmin')->group(function () {
        Route::post('/upload', [PersonaController::class, 'uploadExcel']); // Solo admin puede cargar
    });
});


use Illuminate\Support\Facades\Route;
use App\Http\Controllers\PersonaController;

Route::middleware('auth:api')->group(function () {
    Route::get('/personas', [PersonaController::class, 'getPersonasPaginated'])->middleware('can:isConsulta');

    Route::middleware('can:isAdmin')->group(function () {
        Route::post('/upload', [PersonaController::class, 'uploadExcel']); // Solo el admin puede cargar
    });
});
