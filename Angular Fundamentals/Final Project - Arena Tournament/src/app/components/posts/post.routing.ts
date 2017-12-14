import { CategoryComponent } from './category/category.component';
import { CreateComponent } from './create/create.component';
import { DetailsComponent } from './details/details.component';
import { EditComponent } from './edit/edit.component';
import { DeleteComponent } from './delete/delete.component';
import { ForumComponent } from './forum/forum.component';

import { AuthGuard } from './../../guards/auth.guard';
import { PostGuard } from './../../guards/post.guard';

export const postRoutes = [
    { path: 'forum', component: ForumComponent },
    { path: 'category/:bracket', component: CategoryComponent },
    { path: 'create', canActivate: [AuthGuard], component: CreateComponent },
    { path: 'details/:id', component: DetailsComponent },
    { path: 'edit/:id', canActivate: [PostGuard], component: EditComponent },
    { path: 'delete/:id', canActivate: [PostGuard], component: DeleteComponent }
];