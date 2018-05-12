import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { AllowedToVote } from './allowed-to-vote.model';
import { AllowedToVoteService } from './allowed-to-vote.service';

@Component({
    selector: 'jhi-allowed-to-vote-detail',
    templateUrl: './allowed-to-vote-detail.component.html'
})
export class AllowedToVoteDetailComponent implements OnInit, OnDestroy {

    allowedToVote: AllowedToVote;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private allowedToVoteService: AllowedToVoteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInAllowedToVotes();
    }

    load(id) {
        this.allowedToVoteService.find(id)
            .subscribe((allowedToVoteResponse: HttpResponse<AllowedToVote>) => {
                this.allowedToVote = allowedToVoteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAllowedToVotes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'allowedToVoteListModification',
            (response) => this.load(this.allowedToVote.id)
        );
    }
}
