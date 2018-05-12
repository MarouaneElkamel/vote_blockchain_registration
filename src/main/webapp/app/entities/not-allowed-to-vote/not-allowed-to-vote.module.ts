import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { VoteSharedModule } from '../../shared';
import {
    NotAllowedToVoteService,
    NotAllowedToVotePopupService,
    NotAllowedToVoteComponent,
    NotAllowedToVoteDetailComponent,
    NotAllowedToVoteDialogComponent,
    NotAllowedToVotePopupComponent,
    NotAllowedToVoteDeletePopupComponent,
    NotAllowedToVoteDeleteDialogComponent,
    notAllowedToVoteRoute,
    notAllowedToVotePopupRoute,
} from './';

const ENTITY_STATES = [
    ...notAllowedToVoteRoute,
    ...notAllowedToVotePopupRoute,
];

@NgModule({
    imports: [
        VoteSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        NotAllowedToVoteComponent,
        NotAllowedToVoteDetailComponent,
        NotAllowedToVoteDialogComponent,
        NotAllowedToVoteDeleteDialogComponent,
        NotAllowedToVotePopupComponent,
        NotAllowedToVoteDeletePopupComponent,
    ],
    entryComponents: [
        NotAllowedToVoteComponent,
        NotAllowedToVoteDialogComponent,
        NotAllowedToVotePopupComponent,
        NotAllowedToVoteDeleteDialogComponent,
        NotAllowedToVoteDeletePopupComponent,
    ],
    providers: [
        NotAllowedToVoteService,
        NotAllowedToVotePopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VoteNotAllowedToVoteModule {}
