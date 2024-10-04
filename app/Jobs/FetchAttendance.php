<?php

namespace App\Jobs;

use App\Models\Subject;
use App\Models\User;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Queue\Queueable;
use Illuminate\Support\Facades\Http;

class FetchAttendance implements ShouldQueue
{
    use Queueable;

    /**
     * Create a new job instance.
     */
    public function __construct(public User $user)
    {
        //
    }

    /**
     * Execute the job.
     */
    public function handle(): void
    {
        $response = Http::post('http://127.0.0.1:8080/scrape_attendance', [
            'username' => $this->user['rollno'],
            'password' => $this->user['password'],
        ]);

        $json = $response->json();

        $subjects = array_map(function ($subject) {
            if (isset($subject['percent'])) {
                unset($subject['percent']);
            }
            return $subject;
        }, $json['subjects']);

        Subject::upsert($subjects, uniqueBy: ['subject_code'], update: ['subject_code', 'name']);
//        $this->user->update([]);
    }
}
