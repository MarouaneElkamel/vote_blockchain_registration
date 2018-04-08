import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Vote } from './vote.model';
import { VoteService } from './vote.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-vote',
    templateUrl: './vote.component.html'
})
export class VoteComponent implements OnInit, OnDestroy {
votes: Vote[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private voteService: VoteService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.voteService.query().subscribe(
            (res: HttpResponse<Vote[]>) => {
                this.votes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInVotes();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Vote) {
        return item.id;
    }
    registerChangeInVotes() {
        this.eventSubscriber = this.eventManager.subscribe('voteListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
