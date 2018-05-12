import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { AllowedToVote } from './allowed-to-vote.model';
import { AllowedToVoteService } from './allowed-to-vote.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-allowed-to-vote',
    templateUrl: './allowed-to-vote.component.html'
})
export class AllowedToVoteComponent implements OnInit, OnDestroy {
allowedToVotes: AllowedToVote[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private allowedToVoteService: AllowedToVoteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.allowedToVoteService.query().subscribe(
            (res: HttpResponse<AllowedToVote[]>) => {
                this.allowedToVotes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAllowedToVotes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: AllowedToVote) {
        return item.id;
    }
    registerChangeInAllowedToVotes() {
        this.eventSubscriber = this.eventManager.subscribe('allowedToVoteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
