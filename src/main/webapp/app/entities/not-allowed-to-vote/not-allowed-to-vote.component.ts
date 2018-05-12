import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { NotAllowedToVote } from './not-allowed-to-vote.model';
import { NotAllowedToVoteService } from './not-allowed-to-vote.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-not-allowed-to-vote',
    templateUrl: './not-allowed-to-vote.component.html'
})
export class NotAllowedToVoteComponent implements OnInit, OnDestroy {
notAllowedToVotes: NotAllowedToVote[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private notAllowedToVoteService: NotAllowedToVoteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.notAllowedToVoteService.query().subscribe(
            (res: HttpResponse<NotAllowedToVote[]>) => {
                this.notAllowedToVotes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInNotAllowedToVotes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: NotAllowedToVote) {
        return item.id;
    }
    registerChangeInNotAllowedToVotes() {
        this.eventSubscriber = this.eventManager.subscribe('notAllowedToVoteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
