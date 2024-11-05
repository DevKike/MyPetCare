import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss'],
})
export class SearchBarComponent implements OnInit {
  private data = [];

  protected results = [...this.data];

  ngOnInit(): void {
    // this.results = this.data.sort((a, b) => a.localeCompare(b));
  }

  protected handleInput(event: any) {
    /* const query = event.target.value.toLowerCase();
    this.results = this.data
      .filter((d) => d.toLowerCase().includes(query))
      .sort((a, b) => a.localeCompare(b)); */
  }

  protected handleItemClick(item: string) {
    console.log(item);
  }
}
