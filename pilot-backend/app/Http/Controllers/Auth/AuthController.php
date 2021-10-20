<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Carbon\Carbon;
use App\Models\User;

class AuthController extends Controller
{
    public function register(Request $request){

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
            'password'=> 'required|string|min:6'
        ]);

        $users = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
        ]);

        $users->save();
        return response()->json(['message'=> 'User has been registered'], 200);

    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password'=> 'required|string'
        ]);
        $credentials = request(['email','password']);
        if(!Auth::attempt($credentials)){
            return response()->json(['message'=>'Unauthorized'], 401);
        }
        else{
            return response()->json(['message'=>'Login Successfully'], 202);
        }


        // Create Personal Access Token

      /*  $user = $request->User();
        $tokenResult = $user->createToken('Personal Access Token');
        $token = $tokenResult->token;
        $token ->expires_at = Carbon::now()->addWeek(1);
        $token->save();

        return response()->json(['data'=>[
            'user' => Auth::user(),
            'access_token' => $tokenResult->accessToken,
            'token_type' => 'Bearer',
            'expires_at' => Carbon::parse($tokenResult->token->expires_at)->toDateTimeString()

        ]]);*/
    }
}
