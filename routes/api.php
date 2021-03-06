<?php

use App\Http\Controllers\NewsController;
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


Route::get('search', [NewsController::class, 'cpIndex']);
Route::get('search/{id}', [NewsController::class, 'cpGetNewsItem']);
Route::post('save', [NewsController::class, 'cpSaveNewsItem']);
Route::get('list_pinned', [NewsController::class, 'cpListPinnedItem']);

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});
