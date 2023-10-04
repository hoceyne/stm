<?php

namespace App\Http\Controllers;

use App\Models\Client;
use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function index()
    {
        $clients = Client::all();
        return response()->json($clients);
    }

    public function store(Request $request)
    {
        $client = Client::create($request->all());
        return response()->json($client, 201);
    }

    public function show($id)
    {
        $client = Client::findOrFail($id);
        return response()->json($client);
    }

    public function update(Request $request, $id)
    {
        $client = Client::findOrFail($id);
        $client->update($request->all());
        return response()->json($client);
    }

    public function destroy($id)
    {
        $client = Client::findOrFail($id);
        $client->delete();
        return response()->json(null, 204);
    }

    public function getOrders($id)
    {
        $client = Client::findOrFail($id);
        $orders = $client->orders;
        return response()->json($orders);
    }

    public function getReciepts($id)
    {
        $client = Client::findOrFail($id);
        $reciepts = $client->reciepts;
        return response()->json($reciepts);
    }

    public function getAddress($id)
    {
        $client = Client::findOrFail($id);
        $address = $client->address;
        return response()->json($address);
    }

    public function createAddress(Request $request, $id)
    {
        $client = Client::findOrFail($id);
        $address = $client->address()->create($request->all());
        return response()->json($address, 201);
    }

    public function updateAddress(Request $request, $id)
    {
        $client = Client::findOrFail($id);
        $address = $client->address;
        $address->update($request->all());
        return response()->json($address);
    }

    public function deleteAddress($id)
    {
        $client = Client::findOrFail($id);
        $address = $client->address;
        $address->delete();
        return response()->json(null, 204);
    }

    public function getStores($id)
    {
        $client = Client::findOrFail($id);
        $stores = $client->stores;
        return response()->json($stores);
    }

    public function getCards($id)
    {
        $client = Client::findOrFail($id);
        $cards = $client->cards;
        return response()->json($cards);
    }

    public function getRewards($id)
    {
        $client = Client::findOrFail($id);
        $rewards = $client->rewards;
        return response()->json($rewards);
    }
}
