import { Routes } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { VoteInfoComponent } from './vote-info.component';
import { VoteInfoDetailComponent } from './vote-info-detail.component';
import { VoteInfoPopupComponent } from './vote-info-dialog.component';
import { VoteInfoDeletePopupComponent } from './vote-info-delete-dialog.component';

export const voteInfoRoute: Routes = [
    {
        path: 'vote-info',
        component: VoteInfoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.voteInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'vote-info/:id',
        component: VoteInfoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.voteInfo.home.title'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const voteInfoPopupRoute: Routes = [
    {
        path: 'vote-info-new',
        component: VoteInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.voteInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vote-info/:id/edit',
        component: VoteInfoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.voteInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'vote-info/:id/delete',
        component: VoteInfoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'voteApp.voteInfo.home.title'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
