<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Scrape extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'date'];

    public $timestamps = false;

    public function subject_attendances()
    {
        return $this->hasMany(SubjectAttendance::class);
    }

    public function attendance()
    {
        return $this->hasOne(Attendance::class);
    }

    protected function casts(): array
    {
        return [
            'date' => 'datetime:jS M Y',
        ];
    }
}
