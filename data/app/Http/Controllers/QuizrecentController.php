<?php

namespace App\Http\Controllers;

use App\Models\Quizrecent;
use Illuminate\Http\Request;

class QuizrecentController extends Controller
{
    public function recent(Request $request) {
        Quizrecent::create($request->all());
        return response()->json(['success' => true]);
    }
}
