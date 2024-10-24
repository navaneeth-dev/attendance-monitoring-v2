<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    protected $fillable = ['user_id', 'percent', 'last_updated', 'scrape_id'];

    protected function casts(): array
    {
        return [
            'last_updated' => 'date:jS M Y',
        ];
    }
}
