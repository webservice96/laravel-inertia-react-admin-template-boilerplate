<?php

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

    Route::get('/media', function () {
        return Inertia::render('Media/Page');
    })->name('mediafiles');


    Route::get('/upload-demo', function () {
        return Inertia::render('UploadDemo');
    })->name('upload.demo');

    Route::get('/tasks', function () {
        return inertia('Tasks');
    })->name('glopsy.tasks');

    Route::get('/about', function () {
        return inertia('About');
    })->name('glopsy.about');


    Route::get('/posts', function () {
        return inertia('Test/Post');
    })->name('post.list');

    Route::get('/post-add-new', function () {
        return inertia('Test/AddNew');
    })->name('post.addnew');

    Route::get('/post-category', function () {
        return inertia('Test/Category');
    })->name('post.category');
});


Route::group(['prefix' => 'laravel-filemanager', 'middleware' => ['web', 'auth']], function () {
    \UniSharp\LaravelFilemanager\Lfm::routes();
});
