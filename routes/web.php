<?php

use App\Http\Controllers\ProfileController;
use App\Models\Scrape;
use App\Models\SubjectFilter;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    $user_id = auth()->user()->id;
    $subject_filters = SubjectFilter::where('user_id', $user_id)->with('subject')->get();

    $subject_attendances = Scrape::where('user_id', $user_id)
        ->with(['subject_attendances' => function (Builder $query) use ($subject_filters) {
            $query->whereIn('subject_id', $subject_filters->pluck('subject_id'));
        }])->get();

//    $subject_attendances = Scrape::where('user_id', $user_id)
//        ->with(['subject_attendances' => function (Builder $query) use ($subject_filters) {
//            $query->whereIn('subject_attendances.subject_id', $subject_filters->pluck('id'));
//        }])->get();

    return Inertia::render('Dashboard', [
        'subject_filters' => $subject_filters,
        'subject_attendances' => $subject_attendances,
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
