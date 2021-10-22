<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Auth\AuthController;



 // Protected routes
<<<<<<< HEAD
Route::group(['middleware'=>['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users',[AuthController::class,'index']);
});
=======
// Route::group(['middleware'=>['auth:sanctum']], function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/users',[AuthController::class,'index']);
// });
>>>>>>> add-auth-backend

//  Authentication area

Route::post('/register', [AuthController::class,'register']);
Route::post('/login', [AuthController::class,'login']);
