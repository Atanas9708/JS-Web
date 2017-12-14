import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PostService } from './../services/posts/posts.service';
import { UserService } from './../services/user/user.service';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, } from '@angular/router';

@Injectable()
export class PostGuard implements CanActivate {
    constructor(
        private router: Router,
        private postService: PostService,
        private userService: UserService) { }

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        let postId = next.params.id;

        this.postService.getPostById(postId).subscribe(data => {
            let creator = data['_acl']['creator'];
            let currentUserId = sessionStorage.getItem('userId');

            this.userService.getCurrentUser(currentUserId).subscribe(res => {
                let fetchedUserId = res['_id'];
                let isAdmin = res['_kmd']['roles'] !== undefined;

                if (isAdmin || creator === fetchedUserId) {
                    return true;
                } else {
                    this.router.navigate(['/home']);
                    return false;
                }
            }, err => {
                this.router.navigate(['/home']);
                return false;
            })

        }, err => {
            this.router.navigate(['/home']);
            return false;
        })

        return true;
    }


}
