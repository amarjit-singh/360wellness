<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/


// Route::get('/', function () {
//     //
// });
Route::fallback(function () {
    $file = trim(request()->path(), '/');
    // if (empty($file)) $file = 'index.html';
    $frontend_dir = rtrim(config('app.frontend_path'), '/');
    if (empty($frontend_dir)) throw new \Exception('FRONTEND_PATH variable not found in .env file!');
    $filepath = rtrim("$frontend_dir/$file", '/');
    return file_get_contents($filepath);
});
