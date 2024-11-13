// app/Http/Middleware/CheckAdmin.php
<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckAdmin
{
    public function handle($request, Closure $next)
    {
        if (Auth::user() && Auth::user()->isAdmin()) {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized'], 403);
    }
}


// app/Http/Middleware/CheckConsulta.php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Auth;

class CheckConsulta
{
    public function handle($request, Closure $next)
    {
        if (Auth::user() && Auth::user()->role->name === 'consulta') {
            return $next($request);
        }

        return response()->json(['error' => 'Unauthorized'], 403);
    }
}
