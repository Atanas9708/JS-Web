import { AuthService } from './auth/auth.service';
import { UserService } from './user/user.service';
import { PostService } from './posts/posts.service';
import { CommentsService } from './comments/comments.service';
import { SearchService } from './search/search.service';
import { NotificationService } from './notification/notification.service';

export const allServices = [
    AuthService,
    UserService,
    PostService,
    CommentsService,
    SearchService,
    NotificationService
];


