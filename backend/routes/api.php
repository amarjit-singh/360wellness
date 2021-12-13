<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

// Route::middleware('auth:api')->get('/user', function (Request $request) {
//     return $request->user();
// });

Route::post('/signup', 'AuthController@signup');
Route::post('login', 'AuthController@login');

Route::group([ 'middleware' => 'auth:api', ], function ($router) {
    Route::post('logout', 'AuthController@logout');
    Route::post('refresh', 'AuthController@refresh');
    Route::post('me', 'AuthController@me');
    Route::post('/update-profile', 'DashboardController@updateProfile');
    Route::get('/todos', 'DashboardController@getTodos');
    Route::post('/todo', 'DashboardController@addTodo');
    Route::put('/todo/{todo_id}', 'DashboardController@editTodo');
    Route::delete('/todo/{todo_id}', 'DashboardController@deleteTodo');
});