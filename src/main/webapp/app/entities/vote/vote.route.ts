import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VoteComponent } from './vote.component';
import { VoteDetailComponent } from './vote-detail.component';
import { VotePopupComponent } from './vote-dialog.component';
import { VoteDeletePopupComponent } from './vote-delete-dialog.component';

export const voteRoute: Routes = [
    {
        path: 'vote',
        component: VoteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.vote.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vote/:id',
        component: VoteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.vote.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const votePopupRoute: Routes = [
    {
        path: 'vote-new',
        component: VotePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.vote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vote/:id/edit',
        component: VotePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.vote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vote/:id/delete',
        component: VoteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.vote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
