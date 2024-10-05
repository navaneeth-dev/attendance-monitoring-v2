<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Subject extends Model
{
    use HasFactory;

    public function subject_attendances()
    {
        return $this->hasMany(SubjectAttendance::class);
    }
}
