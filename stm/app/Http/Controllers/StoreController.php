<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class StoreController extends Controller
{


    public function products(Request $request, $id = null)
    {
        if ($id) {
            $product = Product::find($id);
            $product['store'] = $product->store;
            $product['photos'] =  $product->photos;

            return response()->json($product, 200);
        } else {
            $store = User::find($request->user_id)->store;
            $products = $store->products()->where('qte','!=', 0)->get();;
            foreach ($products as $product) {
                # code...
                // $product['photos'] =  $product->photos;
            }
            return response()->json($products, 200);
        }
    }

    public function create_product(Request $request)
    {
        $product = Product::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'qte_total' => $request->qte_total,
            'purchase_date' => $request->purchase_date,
        ]);

        $store = User::find($request->user_id)->store;

        $store->products()->save($product);

        return response()->json(200);
    }

    public function delete_product($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response()->json(200);
    }

    public function update_product(Request $request, $id)
    {
        $product = Product::Where('id', $id)->update([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->price,
            'qte_total' => $request->qte_total,
            'purchase_date' => $request->purchase_date,
        ]);
        return response()->json(200);
    }

    public function clients(Request $request, $id = null)
    {
        if ($id) {
            $product = Product::find($id);
            $product['store'] = $product->store;
            $product['photos'] =  $product->photos;

            return response()->json($product, 200);
        } else {
            $store = Store::find($request->store_id);
            $products = $store->products;
            foreach ($products as $product) {
                # code...
                $product['store'] = $store;
                $product['photos'] =  $product->photos;
            }
            return response()->json($products, 200);
        }
    }

    public function register_client(Request $request)
    {
        $product = Product::create([
            'title' => $request->title,
            'description' => $request->description,
            'price' => $request->title,
            'qte_total' => $request->qte_total,
            'purchase_date' => $request->purchase_date,
            'sale_date' => $request->sale_date,
        ]);

        $store = Store::find($request->store);

        $store->products()->save($product);

        return response()->json(200);
    }

    public function delete_client($id)
    {
        $product = Product::find($id);
        $product->delete();
        return response()->json(200);
    }
}
