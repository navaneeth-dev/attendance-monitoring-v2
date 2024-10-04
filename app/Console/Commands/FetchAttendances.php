<?php

namespace App\Console\Commands;

use App\Jobs\FetchAttendance;
use App\Models\User;
use Illuminate\Console\Command;

class FetchAttendances extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:fetch-attendances';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        User::all()->each(function ($user) {
            FetchAttendance::dispatch($user);
        });
    }
}
