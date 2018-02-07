import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AnimalService } from '../../../services/animals/animals.service';


@Component({
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public animals: object[];
  public notFound: boolean;

  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private animalService: AnimalService) { }


  ngOnInit() {
    this.activatedRoute.queryParams.subscribe(params => {
      let searchTerm = params['searchTerm'];
      let page = params['page'];

      let payload = {
        searchTerm,
        page
      };

      this.animalService.searchByTerm(payload).subscribe(res => {
        if (res.length > 0) {
          this.animals = res;
        } else {
          this.notFound = true;
        }
      });

    })
  }

}
