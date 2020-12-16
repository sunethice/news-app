<?php

namespace App\Http\Controllers;

use App\Models\News;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Validator;
use PhpParser\Node\Expr\Cast\Array_;

class NewsController extends Controller
{
    //
    public function cpIndex(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'searchStr' => 'required'
        ]);

        if ($validation->fails()) {
            return response(['message' => "Search string required."], 422);
        }

        $newsResponse = Http::withHeaders(['api-key' => "88823fb5-405c-47b0-a5c8-abd0b1cd81e2"])
            ->get('https://content.guardianapis.com/search', ['q' => $request['searchStr']]);

        $newsResults = $newsResponse['response']['results'];
        if (empty($newsResults)) {
            return response(['message' => "Results not found"], 200);
        }

        $resp = [];
        $resp["total"] = $newsResponse['response']['total'];
        $resp["startIndex"] = $newsResponse['response']['startIndex'];
        $resp["pageSize"] = $newsResponse['response']['pageSize'];
        $resp["currentPage"] = $newsResponse['response']['currentPage'];
        $resp["pages"] = $newsResponse['response']['pages'];
        $results = [];
        foreach ($newsResults as $newsItem) {
            $news = new News();
            $news->key = $newsItem['id'];
            $news->title = $newsItem['webTitle'];
            $news->link = $newsItem['webUrl'];
            $news->section = $newsItem['sectionName'];
            $news->publication_dt = Carbon::parse($newsItem['webPublicationDate'])->format('d/m/yy');
            if (isset($results[$newsItem['sectionName']])) {
                array_push($results[$newsItem['sectionName']], $news);
            } else {
                $results[$newsItem['sectionName']] = [$news];
            }
        }
        $resp["resultList"] = $results;
        return response()->json($resp, 200);
    }

    public function cpGetNewsItem(Request $request, $id)
    {
    }
}
