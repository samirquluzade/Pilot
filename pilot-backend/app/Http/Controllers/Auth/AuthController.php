<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request){

        $name = $request->input('name');
        $email = $request->input('email');
        $password =Hash::make($request->input('password'));

        DB::table('auth')->insert([
            'name' =>    $name,
            'email'=>    $email,
            'password'=> $password
        ]);

    }

    public function login(Request $request){

        $email = $request->input('email');
        $password = $request->input('password');

        $auth = DB::table('auth')->where('email',$email)->first();

        if(Hash::check($password,$auth->password)){
            echo $auth->email;

        }
        else{
            echo "Not Matched";
        }


    }
}
