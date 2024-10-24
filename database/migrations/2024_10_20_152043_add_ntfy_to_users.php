<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->ulid('ntfy_channel')->nullable();
        });

        $users = \App\Models\User::all();
        foreach ($users as $user) {
            $user->ntfy_channel = Str::ulid();
            $user->save();
            Log::info($user->ntfy_channel);
        }

        Schema::table('users', function (Blueprint $table) {
            $table->ulid('ntfy_channel')->unique()->change();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('ntfy_channel');
        });
    }
};
