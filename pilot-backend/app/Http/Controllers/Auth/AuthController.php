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
            'password'=> 'required|string|min:6',
            'passwordConfirm' => 'required|string|min:6'
        ]);

        $users = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password'))
            'passwordConfirm' => Hash::make($request->input('passwordConfirm'))
        ]);

        $users->save();
        return response()->json(['status' => 200,'message'=> 'User has been registered']);

    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required',
            'password'=> 'required|string'
        ]);
        $credentials = request(['email','password']);
        if(!Auth::attempt($credentials)){
            return response()->json(['status' => 401,'message'=>'Unauthorized']);
        }
        else{
            return response()->json(['status' => 202,'message'=>'Login Successfully']);
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

    public function logout(Request $request) {
        Auth::logout();
        return redirect('/login');
    }
}
