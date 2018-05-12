import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { NotAllowedToVote } from './not-allowed-to-vote.model';
import { NotAllowedToVoteService } from './not-allowed-to-vote.service';

@Component({
    selector: 'jhi-not-allowed-to-vote-detail',
    templateUrl: './not-allowed-to-vote-detail.component.html'
})
export class NotAllowedToVoteDetailComponent implements OnInit, OnDestroy {

    notAllowedToVote: NotAllowedToVote;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private notAllowedToVoteService: NotAllowedToVoteService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInNotAllowedToVotes();
    }

    load(id) {
        this.notAllowedToVoteService.find(id)
            .subscribe((notAllowedToVoteResponse: HttpResponse<NotAllowedToVote>) => {
                this.notAllowedToVote = notAllowedToVoteResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInNotAllowedToVotes() {
        this.eventSubscriber = this.eventManager.subscribe(
            'notAllowedToVoteListModification',
            (response) => this.load(this.notAllowedToVote.id)
        );
    }
}
