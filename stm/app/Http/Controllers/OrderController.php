<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Order;
use App\Models\Reciept;
use App\Models\Store;
use App\Models\User;
use Illuminate\Http\Request;

class OrderController extends Controller
{
    public function orders(Request $request,$id = null)
    {
        if ($id) {
            $order = Order::find($id);
            // $order['store'] = $order->reciept->store;
            // $order['reciept'] = $order->reciept;
            // $order['client'] = $order->client->user;
            // $order['client']['phone_number'] = $order->client->phone_number;


            $order['products'] =  $order->products;

            return response()->json($order, 200);
        } else {
            $store = User::find($request->user_id)->store;
            $orders = $store->orders;
            foreach ($orders as $order) {
                # code...
                // $order['reciept'] = $order->reciept;
                // $order['store'] = $order->reciept->store;
                // $order['client'] = $order->client->user;
                // $order['client']['phone_number'] = $order->client->phone_number;

                $order['products'] =  $order->products;
                foreach($order['products'] as $product){
                    $product['qte'] = $product->pivot->qte;
                    $product['price'] = $product->pivot->price;
                }

            }
            return response()->json($orders, 200);
        }
    }

    public function create_order(Request $request)
    {
        $order = Order::create();

        $total = 0;
        foreach ($request->products as $product) {
            # code...
            $total += $product['price'] * $product['qte'];
            $order->products()->attach([$product['id'] => ['qte' => $product['qte'],'price' => $product['price']]]);
        }

        // $client = Client::find($request->client_id);
        // $client->orders()->save($order);

        // $recipt = Reciept::create(['total' => $total]);
        $store = User::find($request->user_id)->store;
        $store->orders()->save($order);
        // $store->reciepts()->save($recipt);



        return response()->json(200);
    }


    public function delete_order($id)
    {
        $order = Order::find($id);
        $order->delete();
        return response()->json(200);
    }
}
