import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnimalService } from '../../../core/services/animals/animals.service';

@Component({
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  public animals: object[];
  public page: number;
  public hasPrevPage: boolean;
  public hasNextPage: boolean;
  public fetchedAnimals: number = 0;
  public totalAnimals: number = parseInt(sessionStorage.getItem('animals'));

  public searchTerm: string;

  constructor(private router: Router,
    private animalService: AnimalService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      if (!params.hasOwnProperty('page')) {
        this.page = 1;
        this.fetchPages();
      } else {
        this.page = parseInt(params.page);
        this.fetchPages();
      }
    })
  }

  fetchPages(): void {
    this.animalService.getList(this.page).subscribe(res => {
      if (res.length > 0) {
        this.animals = res;
        this.fetchedAnimals = this.animals.length;

        if (this.totalAnimals >= this.fetchedAnimals && this.fetchedAnimals === 10) {
          this.hasNextPage = true;

        } else {
          this.hasNextPage = false;
        }

        if (this.totalAnimals >= this.fetchedAnimals && this.page - 1 > 0) {
          this.hasPrevPage = true;
        } else {
          this.hasPrevPage = false;
        }
      } else {
        this.router.navigate(['/list']);
      }
    })
  }

  changePage(action: string) {
    if (action === 'next') {
      this.router.navigate(['/list'], { queryParams: { page: this.page + 1 } });
    } else {
      this.router.navigate(['/list'], { queryParams: { page: this.page - 1 } });
    }
  }

  search(): void {
    this.router.navigate(['/search'], { queryParams: {searchTerm: this.searchTerm, page: this.page} });
  }
}
