<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Userdata;

class UserdataController extends Controller
{
    public function authRegister(Request $request) {
        $userdata = Userdata::where('email', $request->email)->get();
        if(!$userdata->isEmpty()) {
            return response()->json([
                'message' => "Email anda telah di daftarkan, Lakukan login",
            ], 200);
        }
        Userdata::create($request->all());
        return response()->json([
            'message' => "Anda berhasil melakukan registrasi. Lakukan login!",
        ], 200);
    }

    public function authLogin(Request $request) {
        $userdata = Userdata::where('email', $request->email)->get();
        if(!$userdata->isEmpty()) {
            if($userdata[0]->password == $request->password) {
                return response()->json([
                    'message' => "Anda telah berhasil melakukan login",
                    'email' => true,
                    'userdata_id'=> $userdata[0]->id
                ], 200);
            } else {
                return response()->json([
                    'message' => "Password anda berbeda! Silahkan coba lagi",
                    'email' => true,
                ], 500);
            }
        } else {
            return response()->json([
                'message' => 'email tidak ditemukan. lakukan registrasi',
                'email' => false,
            ], 500);
        }
    }
}
