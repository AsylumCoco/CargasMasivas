// app/Http/Kernel.php
<?php

protected $routeMiddleware = [
    // otros middlewares
    'isAdmin' => \App\Http\Middleware\CheckAdmin::class,
];


// app/Http/Kernel.php

protected $routeMiddleware = [
    // otros middlewares
    'isConsulta' => \App\Http\Middleware\CheckConsulta::class,
];
