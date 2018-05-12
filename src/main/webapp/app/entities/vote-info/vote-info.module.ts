import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VoteSharedModule } from '../../shared';
import { VoteAdminModule } from '../../admin/admin.module';
import {
    VoteInfoService,
    VoteInfoPopupService,
    VoteInfoComponent,
    VoteInfoDetailComponent,
    VoteInfoDialogComponent,
    VoteInfoPopupComponent,
    VoteInfoDeletePopupComponent,
    VoteInfoDeleteDialogComponent,
    voteInfoRoute,
    voteInfoPopupRoute,
} from './';

const ENTITY_STATES = [
    ...voteInfoRoute,
    ...voteInfoPopupRoute,
];

@NgModule({
    imports: [
        VoteSharedModule,
        VoteAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VoteInfoComponent,
        VoteInfoDetailComponent,
        VoteInfoDialogComponent,
        VoteInfoDeleteDialogComponent,
        VoteInfoPopupComponent,
        VoteInfoDeletePopupComponent,
    ],
    entryComponents: [
        VoteInfoComponent,
        VoteInfoDialogComponent,
        VoteInfoPopupComponent,
        VoteInfoDeleteDialogComponent,
        VoteInfoDeletePopupComponent,
    ],
    providers: [
        VoteInfoService,
        VoteInfoPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VoteVoteInfoModule {}
