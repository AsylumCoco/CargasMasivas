<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use Laravel\Passport\Passport;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        // Define las políticas (si hay alguna)
    ];

    public function boot()
    {
        $this->registerPolicies();
        
        // Registrar las rutas de Passport para OAuth2
        Passport::routes();
    }
}
