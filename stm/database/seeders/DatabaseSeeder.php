<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;

use App\Models\Admin;
use App\Models\Client;
use App\Models\File;
use App\Models\Store;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $content = Storage::get('public/default-profile-picture.jpeg');
        $extension = 'jpeg';
        $name = "profile picture";


        $store = Store::create([
            'name' => 'test_store',
        ]);
        $user = User::create([
            'email' => 'test_store@stm.com',
            'password' => Hash::make('stm2023'),
            'role' => 'store',
        ]);
        $user->profile_picture()->save(new File([
            'name' => $name,
            'content' => base64_encode($content),
            'extension' => $extension,
        ]));
        $user->store()->save($store);

        $client = Client::create();
        $user = User::create([
            'email' => 'test_client@stm.com',
            'password' => Hash::make('stm2023'),
            'role' => 'client',
        ]);
        $user->profile_picture()->save(new File([
            'name' => $name,
            'content' => base64_encode($content),
            'extension' => $extension,
        ]));
        $user->client()->save($client);

        $admin = Admin::create();
        $user = User::create([
            'email' => 'test_admin@stm.com',
            'password' => Hash::make('stm2023'),
            'role' => 'admin',
        ]);
        $user->profile_picture()->save(new File([
            'name' => $name,
            'content' => base64_encode($content),
            'extension' => $extension,
        ]));
        $user->admin()->save($admin);
    }
}
