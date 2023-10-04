<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('store_client', function (Blueprint $table) {
            $table->uuid('id')->primary()->unique();
            $table->uuid('store_id')->nullable();
            $table->foreign('store_id')->references('id')->on('stores');
            $table->uuid('client_id')->nullable();
            $table->foreign('client_id')->references('id')->on('clients');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('store_client');
    }
};
