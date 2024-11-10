import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  @Input() modal!: IonModal;
  @Output() breedSelected = new EventEmitter<string>();
  private data = [
    'Labrador Retriever',
    'Pastor Alemán',
    'Golden Retriever',
    'Bulldog Francés',
    'Beagle',
    'Poodle',
    'Rottweiler',
    'Yorkshire Terrier',
    'Boxer',
    'Dálmata',
    'Husky Siberiano',
    'Border Collie',
    'Chihuahua',
    'Pug',
    'Shih Tzu',
    'Bulldog Inglés',
    'Akita',
    'Samoyedo',
    'Cocker Spaniel',
    'Doberman',
    'Persa',
    'Siamés',
    'Maine Coon',
    'Bengalí',
    'Ragdoll',
    'Sphynx',
    'British Shorthair',
    'Scottish Fold',
    'Devon Rex',
    'Birmano',
    'Siberiano',
    'Cornish Rex',
    'Abisinio',
    'Bombay',
    'Tonkinés',
    'Azul Ruso',
    'Savannah',
    'Angora Turco',
    'Chartreux',
    'Ocicat',
  ];

  protected results = [...this.data];

  ngOnInit(): void {
    this.results = this.data.sort((a, b) => a.localeCompare(b));
  }

  protected handleInput(event: any) {
    const query = event.target.value.toLowerCase();
    this.results = this.data
      .filter((d) => d.toLowerCase().includes(query))
      .sort((a, b) => a.localeCompare(b));
  }

  protected handleItemClick(item: string) {
    this.breedSelected.emit(item); 
    if (this.modal) {
      this.modal.dismiss();
    }
  }
}

