import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-table',
  templateUrl: './search-table.component.html',
  styleUrls: ['./search-table.component.css']
})
export class SearchTableComponent {
  @Input() posts;

  constructor(private router: Router) { }

  redirectToDetails(id) {
    this.router.navigate([`/post/details/${id}`]);
    document.getElementById('search-box')['value'] = null;
    document.getElementById('post').style.display = 'none'; 
  }

  reset() {
    document.getElementById('search-box')['value'] = '';
    document.getElementById('notFound').style.display = 'none';
  }

}
