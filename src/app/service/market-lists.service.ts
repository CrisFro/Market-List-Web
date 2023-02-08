import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Market } from 'src/models/market.model';

@Injectable({
  providedIn: 'root'
})
export class MarketListsService {


  baseUrl = 'https://localhost:7012/api/marketList';


  constructor(private readonly http: HttpClient) {}

  //Get all List
  getAllMarketLists(): Observable<Market[]>{
    return this.http.get<Market[]>(this.baseUrl);
  }

  addMarketList(marketList: Market): Observable<Market>{
    marketList.id = '00000000-0000-0000-0000-000000000000'
    return this.http.post<Market>(this.baseUrl, marketList);
  }

  deleteMarketList(id: string): Observable<Market>{
    return this.http.delete<Market>(this.baseUrl + '/' + id);
  }

  updateMarketList(marketList: Market): Observable<Market>{
    return this.http.put<Market>(this.baseUrl + '/' + marketList.id, marketList)
  }

  // exportCsv(marketList: Market): Observable<Market> {
  //   return this.http.get<Market>(this.baseUrl + 'export' + marketList);
  // }

  exportCsv() {
    return this.http.post(this.baseUrl + 'export', {responseType:'blob', observe:'response'});
}

}
