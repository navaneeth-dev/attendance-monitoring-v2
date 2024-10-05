<?php

namespace App\Jobs;

use App\Models\Subject;
use App\Models\SubjectAttendance;
use App\Models\SubjectFilter;
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

        // Delete old SubjectFilter if new sem
        SubjectFilter::where('user_id', '=', $this->user->id)->delete();

        foreach ($json['subjects'] as $subject) {
            $subModel = Subject::where('subject_code', $subject['subject_code'])->first();
            SubjectAttendance::create([
                'percent' => $subject['percent'],
                'user_id' => $this->user->id,
                'subject_id' => $subModel->id,
                'date' => today(),
            ]);

            // Create the subject filter for the User
            SubjectFilter::create([
                'subject_id' => $subModel->id,
                'user_id' => $this->user->id,
            ]);
        }

//        $this->user->update([]);
    }
}
