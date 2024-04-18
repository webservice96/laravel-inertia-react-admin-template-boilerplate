<?php

use App\Http\Controllers\FileManagerController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;


Route::redirect('/', '/login');

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        // return Inertia::render('Dashboard');
        return Inertia::render('Default/Page');
    })->name('dashboard');

    Route::get('/media', [FileManagerController::class, 'index'])->name('mediafiles');


    Route::get('/upload-demo', function () {
        return inertia('UploadDemo');
    })->name('upload.demo');
});


Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth']], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});
