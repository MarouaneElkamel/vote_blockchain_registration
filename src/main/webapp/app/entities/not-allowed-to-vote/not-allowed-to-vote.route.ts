import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { NotAllowedToVoteComponent } from './not-allowed-to-vote.component';
import { NotAllowedToVoteDetailComponent } from './not-allowed-to-vote-detail.component';
import { NotAllowedToVotePopupComponent } from './not-allowed-to-vote-dialog.component';
import { NotAllowedToVoteDeletePopupComponent } from './not-allowed-to-vote-delete-dialog.component';

export const notAllowedToVoteRoute: Routes = [
    {
        path: 'not-allowed-to-vote',
        component: NotAllowedToVoteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.notAllowedToVote.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'not-allowed-to-vote/:id',
        component: NotAllowedToVoteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.notAllowedToVote.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const notAllowedToVotePopupRoute: Routes = [
    {
        path: 'not-allowed-to-vote-new',
        component: NotAllowedToVotePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.notAllowedToVote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'not-allowed-to-vote/:id/edit',
        component: NotAllowedToVotePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.notAllowedToVote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'not-allowed-to-vote/:id/delete',
        component: NotAllowedToVoteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.notAllowedToVote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
