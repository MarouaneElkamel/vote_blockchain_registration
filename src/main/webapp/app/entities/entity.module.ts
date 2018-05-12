import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { VoteVoteModule } from './vote/vote.module';
import { VoteAddressModule } from './address/address.module';
import { VoteAllowedToVoteModule } from './allowed-to-vote/allowed-to-vote.module';
import { VoteNotAllowedToVoteModule } from './not-allowed-to-vote/not-allowed-to-vote.module';
import { VoteVoteInfoModule } from './vote-info/vote-info.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        VoteVoteModule,
        VoteAddressModule,
        VoteAllowedToVoteModule,
        VoteNotAllowedToVoteModule,
        VoteVoteInfoModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class VoteEntityModule {}
