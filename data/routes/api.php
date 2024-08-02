<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::post('/register', [App\Http\Controllers\UserdataController::class, 'authRegister']);
Route::post('/login', [App\Http\Controllers\UserdataController::class, 'authLogin']);
Route::post('/recent', [App\Http\Controllers\QuizrecentController::class, 'recent']);