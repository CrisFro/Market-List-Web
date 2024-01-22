import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Market } from 'src/models/market.model';
import { MarketListsService } from './service/market-lists.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EditMarketListComponent } from './edit-market-list/edit-market-list.component';
import jsPDF from 'jspdf';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'market-list';
  marketLists: Market[] = [];
  marketForm!: FormGroup;
  productTypeOptions: string[] = [
    'Padaria',
    'Mercearia',
    'Bebidas',
    'Fiambreria',
    'Carnes',
    'Peixaria',
    'Produtos de limpeza',
    'Higiene pessoal',
    'Frutas',
    'Legumes',
    'Verduras',
    'Linha Fit',
    'Sem Glúten/Sem lactose',
    'Pet',
  ];

  constructor(
    private marketListsService: MarketListsService,
    private formBuilder: FormBuilder,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.getAllMarketLists();
  }

  initForm() {
    this.marketForm = this.formBuilder.group({
      productType: [null, Validators.required],
      productDescription: ['', Validators.required],
    });
  }

  getAllMarketLists() {
    this.marketListsService.getAllMarketLists().subscribe((response) => {
      this.marketLists = response;
    });
  }

  onSubmit() {
    if (this.marketForm.valid) {
      const marketData: Market = this.marketForm.value;

      if (!marketData.id) {
        this.marketListsService
          .addMarketList(marketData)
          .subscribe((response) => {
            this.getAllMarketLists();
            this.marketForm.reset();
          });
      } else {
        this.updateMarketList(marketData);
      }
    }
  }

  deleteMarketList(id: string) {
    this.marketListsService.deleteMarketList(id).subscribe((response) => {
      this.getAllMarketLists();
    });
  }

  populateForm(marketList: Market) {
    this.marketForm.patchValue(marketList);
  }

  updateMarketList(marketList: Market) {
    this.marketListsService
      .updateMarketList(marketList)
      .subscribe((response) => {
        this.getAllMarketLists();
        this.marketForm.reset();
      });
  }

  openEditModal(marketList: Market): void {
    const dialogRef = this.dialog.open(EditMarketListComponent, {
      width: '400px',
      data: marketList,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result && result.id) {
        this.updateMarketList(result);
      }
    });
  }

  exportMarketListToExcel(): void {
    this.marketListsService
      .exportMarketList()
      .subscribe((data: ArrayBuffer) => {
        const utf8BOM = new Uint8Array([0xef, 0xbb, 0xbf]);
        const blobParts = [utf8BOM, new Uint8Array(data)];

        const blob = new Blob(blobParts, { type: 'application/csv' });
        const fileName = 'Lista de Mercado';
        const a = document.createElement('a');
        const format = 'dd-MM-yyyy hh.mm.ss';
        const myDate = new Date();
        const locale = 'pt-BR';
        const formattedDate = formatDate(myDate, format, locale);

        a.href = window.URL.createObjectURL(blob);
        a.download = fileName + '-' + formattedDate + '.csv';
        document.body.appendChild(a);

        a.click();

      });
  }

  exportMarketListToPDF(): void {
    this.marketListsService.getAllMarketLists().subscribe((marketLists) => {
      this.marketListsService.exportMarketListToPDF(marketLists);
    });
  }

  exportToTxt(): void {
    this.marketListsService.getAllMarketLists().subscribe((marketLists) => {
      this.marketListsService.exportMarketListToTxt(marketLists);
    });
  }




}
