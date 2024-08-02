<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Quizrecent extends Model
{
    use HasFactory;
    protected $fillable = ['userdata_id', 'category', 'difficulty', 'poin'];
    protected $with = ['userdata'];

    public function userdata() {
        return $this->belongsTo(Userdata::class);
    }
}
