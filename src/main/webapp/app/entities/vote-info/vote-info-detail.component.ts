import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager } from 'ng-jhipster';

import { VoteInfo } from './vote-info.model';
import { VoteInfoService } from './vote-info.service';

@Component({
    selector: 'jhi-vote-info-detail',
    templateUrl: './vote-info-detail.component.html'
})
export class VoteInfoDetailComponent implements OnInit, OnDestroy {

    voteInfo: VoteInfo;
    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(
        private eventManager: JhiEventManager,
        private voteInfoService: VoteInfoService,
        private route: ActivatedRoute
    ) {
    }

    ngOnInit() {
        this.subscription = this.route.params.subscribe((params) => {
            this.load(params['id']);
        });
        this.registerChangeInVoteInfos();
    }

    load(id) {
        this.voteInfoService.find(id)
            .subscribe((voteInfoResponse: HttpResponse<VoteInfo>) => {
                this.voteInfo = voteInfoResponse.body;
            });
    }
    previousState() {
        window.history.back();
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInVoteInfos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'voteInfoListModification',
            (response) => this.load(this.voteInfo.id)
        );
    }
}
