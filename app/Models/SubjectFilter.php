<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class SubjectFilter extends Model
{
    use HasFactory;

    protected $fillable = ['user_id', 'subject_id'];

    public function subject()
    {
        return $this->belongsTo(Subject::class);
    }
}
