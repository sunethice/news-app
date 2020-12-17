<?php

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class News extends Model
{
    use HasFactory;
    protected $table = "news_items";

    public function getPublicationDtAttribute($date)
    {
        return Carbon::parse($date)->format('d/m/yy');
    }
}
