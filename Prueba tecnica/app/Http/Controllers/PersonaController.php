// app/Http/Controllers/PersonaController.php
<?php

public function getPersonasPaginated(Request $request)
{
    $page = $request->input('page', 1);
    $perPage = $request->input('per_page', 100);

    $personas = DB::select('CALL sp_get_personas_paginated(?, ?)', [$page, $perPage]);

    return response()->json($personas);
}


public function getPersonasPaginated(Request $request)
{
    $page = $request->input('page', 1);
    $limit = $request->input('limit', 100);

    $personas = DB::table('persona')
                  ->select('id', 'nombre', 'paterno', 'materno', 'telefono')
                  ->paginate($limit, ['*'], 'page', $page);

    return response()->json($personas);
}

public function getPersonaDetails($id)
{
    $persona = DB::table('persona')
                 ->where('id', $id)
                 ->first();

    $telefonos = DB::table('telefono')
                   ->where('persona_id', $id)
                   ->pluck('numero');

    $direcciones = DB::table('direccion')
                     ->where('persona_id', $id)
                     ->get(['calle', 'numero_exterior', 'colonia', 'cp']);

    return response()->json([
        'nombre' => $persona->nombre,
        'paterno' => $persona->paterno,
        'materno' => $persona->materno,
        'telefonos' => $telefonos,
        'direcciones' => $direcciones
    ]);
}
