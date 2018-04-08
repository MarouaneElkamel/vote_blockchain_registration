import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VoteSharedModule } from '../../shared';
import { VoteAdminModule } from '../../admin/admin.module';
import {
    VoteService,
    VotePopupService,
    VoteComponent,
    VoteDetailComponent,
    VoteDialogComponent,
    VotePopupComponent,
    VoteDeletePopupComponent,
    VoteDeleteDialogComponent,
    voteRoute,
    votePopupRoute,
} from './';

const ENTITY_STATES = [
    ...voteRoute,
    ...votePopupRoute,
];

@NgModule({
    imports: [
        VoteSharedModule,
        VoteAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        VoteComponent,
        VoteDetailComponent,
        VoteDialogComponent,
        VoteDeleteDialogComponent,
        VotePopupComponent,
        VoteDeletePopupComponent,
    ],
    entryComponents: [
        VoteComponent,
        VoteDialogComponent,
        VotePopupComponent,
        VoteDeleteDialogComponent,
        VoteDeletePopupComponent,
    ],
    providers: [
        VoteService,
        VotePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VoteVoteModule {}
