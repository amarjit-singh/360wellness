<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class AuthController extends Controller
{
    /**
     * Create a new AuthController instance.
     *
     * @return void
     */
    public function __construct()
    {
        // $this->middleware('auth:api', ['except' => ['login', 'signup']]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email'         =>  'required|email',
            'password'      =>  'required'
        ]);
        if ($access_token = auth('api')->attempt($request->only('email', 'password'))) {
            $user = auth('api')->user();
            $token_type = 'bearer';
            $expires_in = auth('api')->factory()->getTTL() * 60;
            return response()->json([
                'success'       =>  true,
                'message'       =>  'Login success!',
                'data'          =>  compact('access_token', 'token_type', 'expires_in', 'user')
            ]);
        } else {
            return response()->json([
                'success'       =>  false,
                'message'       =>  'Login failed!'
            ]);
        }
    }

    /**
     * Get the authenticated User.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function me()
    {
        return response()->json(auth()->user());
    }

    /**
     * Log the user out (Invalidate the token).
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function logout()
    {
        auth()->logout();
        return response()->json([
            'success' => true,
            'message' => 'Successfully logged out'
        ]);
    }

    /**
     * Refresh a token.
     *
     * @return \Illuminate\Http\JsonResponse
     */
    public function refresh()
    {
        return $this->respondWithToken(auth()->refresh());
    }

    public function signup(Request $request)
    {
        $request->validate([
            'email'                 =>  'required|email|unique:users,email',
            'password'              =>  'required',
            'confirm_password'      =>  'required|same:password',
            'name'                  =>  'required'
        ]);
        $user = new \App\User;
        $user->fill($request->only('name','email'));
        $user->password = bcrypt($request->password);
        $user->save();
        $access_token = auth('api')->attempt($request->only('email', 'password'));
        $token_type = 'bearer';
        $expires_in = auth('api')->factory()->getTTL() * 60;
        return response()->json([
            'success'       =>  true,
            'message'       =>  'Signup success',
            'data'          =>  compact('access_token', 'token_type', 'expires_in', 'user')
        ]);
    }
}
