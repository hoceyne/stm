<?php

namespace App\Http\Controllers;

use App\Models\Admin;
use App\Models\Client;
use App\Models\File;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Password;
use Illuminate\Support\Facades\Storage;

class AuthController extends Controller
{

    public function login(Request $request)
    {
        if (Auth::attempt(['email' => $request->email, 'password' => $request->password])) {
            $user = User::where('email', $request->email)->first();
           
            $remember = $request->remember_me;
            Auth::login($user, $remember);
            $data = [
                'id' => $user->id,
                'profile_picture' => $user->profile_picture,
                'token' => $user->createToken('API Token')->accessToken,
            ];

            return response()->json($data, 200);
        } else {
            return abort(403);
        }
    }



    public function logout()
    {

        $user = Auth::user();
        $user = User::find($user->id);
        if (Auth::check($user)) {
            $user->token()->revoke();
            $user->tokens()->delete();
            return response(200);
        } else {
            abort(403);
        }
    }







    public function update(Request $request, $id)
    {
        $request->validate([
            'phone_number' => ['required', 'string', 'max:10'],
        ]);
        $user = User::find($id);
        if (!$user) {
            abort(404);
        }
        if ($request->file('profile_picture')) {
            $file = $request->file('profile_picture');
            $content = $file->get();
            $extension = $file->extension();
            $user->profile_picture()->update([
                'name' => 'profile picture',
                'content' => base64_encode($content),
                'extension' => $extension,
            ]);
        }

        $message = null;
        if ($request->password) {
            $request->validate([
                'old_password' => ['required',],
                'password' => ['required', 'confirmed',],
            ]);
            if (Hash::check($request->old_password, $user->password)) {
                $data['password'] = Hash::make($request->password);
                $message = 'password changed successfuly';
            } else {
                $message = 'the old password you had entered is wrong';
            }
        } else {
            $message = '';
        }

        $user->refresh();

        User::where('id', $id)->update($data);


        $file = $user->profile_picture;

        $data = [
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'profile_picture' => $file,
            'message' => $message,
        ];

        return response()->json($data, 200);
    }

    public function show($id)
    {
        $user = User::find($id);
        if (!$user) {
            abort(404);
        }

        $file = $user->profile_picture;

        $data = [
            'email' => $user->email,
            'phone_number' => $user->phone_number,
            'gender' => $user->gender,
            'profile_picture' => $file,
            'role' => $user->role,
        ];

        return response()->json($data, 200);
    }




    public function store(Request $request, $provider)
    {
        $request->validate([
            'gender' => ['required', 'string', 'max:255'],
            'phone_number' => ['required', 'string', 'max:10'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'password' => ['required', 'confirmed',],
        ]);

        $content = Storage::get('public/default-profile-picture.jpeg');
        $extension = 'jpeg';
        $name = "profile picture";

        $user = User::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);



        if ($user->role == 'admin') {
            $user->store()->save(new  Admin());
        } else if ($user->role == 'client') {
            $user->client()->save(Client::create([
                'phone_number' => $request->phone_number,
            ]));
        } else if ($user->role == 'store') {
            $user->store()->save(Store::create([

                'name' => $request->name,
                'phone_number' => $request->phone_number,
            ]));
        }




        $user->profile_picture()->save(new File([
            'name' => $name,
            'content' => base64_encode($content),
            'extension' => $extension,
        ]));

        $user->refresh();


        Auth::login($user);
        $data = [
            'id' => $user->id,
            'token' => $user->createToken('API Token')->accessToken,
        ];
        return response()->json($data, 200);
    }
    
    public function sendResetLinkEmail(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
        ]);

        $response = $this->broker()->sendResetLink(
            $request->only('email')
        );

        if ($response === Password::RESET_LINK_SENT) {
            return response()->json(['message' => 'Password reset link sent to your email'], 200);
        } else {
            return response()->json(['message' => 'Unable to send password reset link'], 400);
        }
    }

    private function broker()
    {
        return Password::broker();
    }
    
}
