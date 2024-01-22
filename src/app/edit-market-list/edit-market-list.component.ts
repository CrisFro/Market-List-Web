import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Market } from 'src/models/market.model';

@Component({
  selector: 'app-edit-market-list',
  templateUrl: './edit-market-list.component.html',
  styleUrls: ['./edit-market-list.component.css']
})
export class EditMarketListComponent {
  editForm: FormGroup;

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
    private dialogRef: MatDialogRef<EditMarketListComponent>,
    private formBuilder: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: Market
  ) {
    const id = data && data.id ? data.id : null;

    this.editForm = this.formBuilder.group({
      productType: [data.productType, Validators.required],
      productDescription: [data.productDescription, Validators.required],
      id: [id, Validators.required],
    });asdasdasdasd
  }

  saveChanges(): void {
    this.dialogRef.close(this.editForm.value);
  }

  close(): void {
    this.dialogRef.close();
  }
}
