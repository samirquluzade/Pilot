<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{

    public function index(){
        $users = User::all();
        return response() -> json([
            'status' => 200,
            'users' => $users,
        ]);
    }
    public function register(Request $request){

        $request->validate([
            'name' => 'required|string',
            'email' => 'required|string|unique:users',
<<<<<<< HEAD
            'password'=> 'required|string|confirmed|min:6',
=======
            'password'=> 'required|string|min:6',
            'password_confirmation' => 'required|string|min:6'
>>>>>>> add-auth-backend
        ]);

        $user = new User([
            'name' => $request->input('name'),
            'email' => $request->input('email'),
            'password' => Hash::make($request->input('password')),
<<<<<<< HEAD
=======
            'password_confirmation' => Hash::make($request->input('password_confirmation')),
>>>>>>> add-auth-backend
        ]);
        $user->save();

        $token = $user->createToken('mytoken')->plainTextToken;

        $response = [
            'user'=>$user,
            'token'=>$token
        ];

<<<<<<< HEAD
        return response($response, 201);
=======
        return response() -> json([
                           'status' => 201,
                       ]);
>>>>>>> add-auth-backend

    }


    public function logout(Request $request){
        auth()->user()->tokens()->delete();

        return [
          'message'=>'Logged out'
        ];
    }


    public function login(Request $request)
    {
        $fields =$request->validate([
            'email' => 'required',
            'password'=> 'required|string'
        ]);

        // Check email
        $user = User::where('email',$fields['email'])->first();

        //Check password
        if (!$user || !Hash::check($fields['password'],$user->password)){
            return response([
               'message'=>'Bad creds'
            ], 401);
        }

        $token = $user->createToken('mytoken')->plainTextToken;

        $response = [
            'user'=>$user,
            'token'=>$token
        ];

<<<<<<< HEAD
        return response($response, 201);
=======
        return response([$response,'status' => 201]);
>>>>>>> add-auth-backend






        /*$credentials = request(['email','password']);
        if(!Auth::attempt($credentials)){
            return response()->json(['status' => 401,'message'=>'Unauthorized']);
        }
        else{
            return response()->json(['status' => 202,'message'=>'Login Successfully']);
        }*/


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

    /*public function logout(Request $request) {
        Auth::logout();
        return redirect('/login');
    }*/
}
