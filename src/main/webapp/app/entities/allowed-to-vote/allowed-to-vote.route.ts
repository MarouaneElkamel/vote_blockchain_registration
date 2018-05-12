import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { AllowedToVoteComponent } from './allowed-to-vote.component';
import { AllowedToVoteDetailComponent } from './allowed-to-vote-detail.component';
import { AllowedToVotePopupComponent } from './allowed-to-vote-dialog.component';
import { AllowedToVoteDeletePopupComponent } from './allowed-to-vote-delete-dialog.component';

export const allowedToVoteRoute: Routes = [
    {
        path: 'allowed-to-vote',
        component: AllowedToVoteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.allowedToVote.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'allowed-to-vote/:id',
        component: AllowedToVoteDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.allowedToVote.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const allowedToVotePopupRoute: Routes = [
    {
        path: 'allowed-to-vote-new',
        component: AllowedToVotePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.allowedToVote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'allowed-to-vote/:id/edit',
        component: AllowedToVotePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.allowedToVote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'allowed-to-vote/:id/delete',
        component: AllowedToVoteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.allowedToVote.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
