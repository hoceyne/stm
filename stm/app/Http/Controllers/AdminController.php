<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AdminController extends Controller
{
    public function stores($id = null)
    {
        if ($id) {
            $store = Store::find($id);

            return response()->json($store, 200);
        } else {
            $stores = Store::all();
            return response()->json($stores, 200);
        }
    }

    public function create_store(Request $request)
    {
        $store = Store::create([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $user->store()->save($store);


        return response()->json(200);
    }

    public function delete_store($id)
    {
        $store = Store::find($id);
        $store->delete();
        return response()->json(200);
    }

    public function update_store(Request $request, $id)
    {
        $store = Store::create([
            'name' => $request->name,
            'phone_number' => $request->phone_number,
        ]);
        return response()->json(200);
    }
}
