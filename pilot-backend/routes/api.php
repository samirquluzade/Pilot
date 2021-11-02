<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;



 // Protected routes

Route::group(['middleware'=>['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');
    Route::post('/delete/{id}', [AuthController::class, 'delete'])->name('delete');;
    Route::post('/update/{id}', [AuthController::class, 'update'])->name('update');;
 });

//  Authentication area
Route::get('/users',[AuthController::class,'index'])->name('index');;
Route::post('/register', [AuthController::class,'register'])->name('register');;
Route::post('/login', [AuthController::class,'login'])->name('login');;
