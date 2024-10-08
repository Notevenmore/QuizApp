<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Userdata extends Model
{
    use HasFactory;
    protected $fillable = ['email', 'password'];

    public function quizrecent() {
        return $this->hasMany(Quizrecent::class);
    }
}
