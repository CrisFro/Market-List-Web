import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Market } from 'src/models/market.model';
import { MarketListsService } from './service/market-lists.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'market-list';
  marketLists: Market[] = [];
  marketList: Market = {
    id: '',
    productType: '',
    productDescription: '',
  };

  constructor(private marketListsService: MarketListsService) {}
  ngOnInit(): void {
    this.getAllMarketLists();
  }

  getAllMarketLists() {
    this.marketListsService.getAllMarketLists().subscribe((response) => {
      this.marketLists = response;
      // console.log(response);
    });
  }

  onSubmit() {
    if (this.marketList.id === '') {
      this.marketListsService
        .addMarketList(this.marketList)
        .subscribe((response) => {
          this.getAllMarketLists();
          this.marketList = {
            id: '',
            productType: '',
            productDescription: '',
          };
        });
    } else {
      this.updateMarketList(this.marketList);
    }
  }

  deleteMarketList(id: string) {
    this.marketListsService.deleteMarketList(id).subscribe((response) => {
      this.getAllMarketLists();
    });
  }

  populateForm(marketList: Market) {
    this.marketList = marketList;
  }

  updateMarketList(marketList: Market) {
    this.marketListsService
      .updateMarketList(marketList)
      .subscribe((response) => {
        this.getAllMarketLists();
      });
  }



  //   exportCsv() {
  //     this.marketListsService.exportCsv(this.marketList).subscribe((response) => {
  //       const name = document.createElement('a');
  //         const format = 'dd-MM-yyyy hhmmss';
  //         const myDate = new Date();
  //         const locale = 'pt-BR';
  //         const formattedDate = formatDate(myDate, format, locale);
  //         name.download = ('Teste' + formattedDate + '.csv');
  //         name.click();
  //     });
  // }

  exportCsv() {
    this.marketListsService.exportCsv().subscribe((response) => {
      const a = document.createElement('a');
      a.href = 'data:text/csv,' + response;
      let filename = 'sampleCSVDownload';
      a.setAttribute('download', filename + '.csv');
      document.body.appendChild(a);
      a.click();
    });
  }
}
