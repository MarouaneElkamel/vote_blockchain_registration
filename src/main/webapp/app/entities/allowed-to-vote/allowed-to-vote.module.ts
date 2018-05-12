import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VoteSharedModule } from '../../shared';
import {
    AllowedToVoteService,
    AllowedToVotePopupService,
    AllowedToVoteComponent,
    AllowedToVoteDetailComponent,
    AllowedToVoteDialogComponent,
    AllowedToVotePopupComponent,
    AllowedToVoteDeletePopupComponent,
    AllowedToVoteDeleteDialogComponent,
    allowedToVoteRoute,
    allowedToVotePopupRoute,
} from './';

const ENTITY_STATES = [
    ...allowedToVoteRoute,
    ...allowedToVotePopupRoute,
];

@NgModule({
    imports: [
        VoteSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AllowedToVoteComponent,
        AllowedToVoteDetailComponent,
        AllowedToVoteDialogComponent,
        AllowedToVoteDeleteDialogComponent,
        AllowedToVotePopupComponent,
        AllowedToVoteDeletePopupComponent,
    ],
    entryComponents: [
        AllowedToVoteComponent,
        AllowedToVoteDialogComponent,
        AllowedToVotePopupComponent,
        AllowedToVoteDeleteDialogComponent,
        AllowedToVoteDeletePopupComponent,
    ],
    providers: [
        AllowedToVoteService,
        AllowedToVotePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VoteAllowedToVoteModule {}
