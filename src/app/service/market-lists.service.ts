import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Market } from 'src/models/market.model';
import jsPDF from 'jspdf';
import { formatDate } from '@angular/common';


@Injectable({
  providedIn: 'root'
})
export class MarketListsService {


  baseUrl = 'https://localhost:7012/api/marketList';


  constructor(private readonly http: HttpClient) {}

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

  exportMarketList(): Observable<ArrayBuffer> {
    const exportUrl = `${this.baseUrl}/export`;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/csv'
    });

    return this.http.post(exportUrl, null, { headers, responseType: 'arraybuffer' });
  }

  exportMarketListToPDF(marketLists: Market[]): void {
    const pdf = new jsPDF();
    const format = 'dd-MM-yyyy hh.mm.ss';
    const myDate = new Date();
    const locale = 'pt-BR';
    const formattedDate = formatDate(myDate, format, locale);

    pdf.setFontSize(18);
    pdf.text('Lista de Mercado', 20, 20);

    pdf.setFontSize(12);
    marketLists.forEach((marketList, index) => {
      const yPos = 30 + (index + 1) * 10; // Ajuste de posição
      pdf.text(`${marketList.productType}: ${marketList.productDescription}`, 20, yPos);
    });


    pdf.save('ListaDeMercado - ' + formattedDate + '.pdf');
  }

  exportMarketListToTxt(marketLists: Market[]): void {
    const title = 'Lista de Mercado';
    const listContent = marketLists.map(marketList => `${marketList.productType}: ${marketList.productDescription}`).join('\n');
    const txtContent = `${title}\n\n${listContent}`;

    const blob = new Blob([txtContent], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    const format = 'dd-MM-yyyy hh.mm.ss';
    const myDate = new Date();
    const locale = 'pt-BR';
    const formattedDate = formatDate(myDate, format, locale);
    link.download = 'Lista De Mercado - ' + formattedDate + '.txt';
    link.click();
  }


}
