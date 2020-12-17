<?php

namespace App\Http\Controllers;

use App\Models\News;
use Carbon\Carbon;
use Exception;
use Facade\FlareClient\Http\Response;
use Illuminate\Database\QueryException;
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
            return response(
                [
                    'message' => "Search string required.",
                    'errors' => $validation->failed()
                ],
                422
            );
        }

        try {
            $respGuardian = $this->cpGetGardianNews($request['searchStr'], $request['page']);
            $respDailyMail = [];
            $resp = array_merge($respGuardian, $respDailyMail);
            return response()->json($resp, 200);
        } catch (Exception $ex) {
            return response(["message" => $ex->getMessage()], 500);
        }
    }

    private function cpGetGardianNews(string $pSerachString, int $pPage)
    {
        $newsResponse = Http::withHeaders(['api-key' => "88823fb5-405c-47b0-a5c8-abd0b1cd81e2"])
            ->get('https://content.guardianapis.com/search', [
                'q' => $pSerachString,
                'page' => $pPage ?: 1
            ]);

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
            $news->publicationDt = Carbon::parse($newsItem['webPublicationDate'])->format('d/m/yy');
            if (isset($results[$newsItem['sectionName']])) {
                array_push($results[$newsItem['sectionName']], $news);
            } else {
                $results[$newsItem['sectionName']] = [$news];
            }
        }
        $resp["resultList"] = $results;
        return $resp;
    }

    public function cpListPinnedItem(Request $request)
    {
        try {
            //$pinnedNews = News::where('userId', '==', '')->get(); need implementation to filter by user
            $pinnedNews = News::get();
            if ($pinnedNews) {
                return response()->json($pinnedNews, 200);
            } else {
                return response(["message" => "No pinned items found"], 404);
            }
        } catch (QueryException $ex) {
            return response(["message" => $ex->getMessage()], 500);
        }
    }

    public function cpSaveNewsItem(Request $request)
    {
        // return response(["mese" => $request['key']], 200);
        $validation = Validator::make($request->all(), [
            'key' => 'required'
        ]);
        if ($validation->fails()) {
            return response(
                [
                    'message' => "key required.",
                    'errors' => $validation->failed()
                ],
                422
            );
        }
        try {
            $newsResponse = Http::withHeaders(['api-key' => "88823fb5-405c-47b0-a5c8-abd0b1cd81e2"])
                ->get("https://content.guardianapis.com/" . $request['key']);

            if ($newsResponse['response']['status'] == 'error') {
                return response(["message" => $newsResponse['response']['message']], 404);
            }
            $newsContent = $newsResponse['response']['content'];

            $news = new News();
            $news->title = $newsContent['webTitle'];
            $news->section = $newsContent['sectionName'];
            $news->link = $newsContent['webUrl'];
            $news->publicationDt = $newsContent['webPublicationDate'];
            $bSaved = $news->save();

            if ($bSaved) {
                return response(["message" => "News artical successfully pinned"], 200);
            } else {
                return response(["message" => "News artical could not be pinned"], 400);
            }
        } catch (Exception $ex) {
            return response(["message" => $ex->getMessage()], 500);
        }
    }
}
