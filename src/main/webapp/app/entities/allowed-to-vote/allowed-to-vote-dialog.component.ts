import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AllowedToVote } from './allowed-to-vote.model';
import { AllowedToVotePopupService } from './allowed-to-vote-popup.service';
import { AllowedToVoteService } from './allowed-to-vote.service';

@Component({
    selector: 'jhi-allowed-to-vote-dialog',
    templateUrl: './allowed-to-vote-dialog.component.html'
})
export class AllowedToVoteDialogComponent implements OnInit {

    allowedToVote: AllowedToVote;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private allowedToVoteService: AllowedToVoteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.allowedToVote.id !== undefined) {
            this.subscribeToSaveResponse(
                this.allowedToVoteService.update(this.allowedToVote));
        } else {
            this.subscribeToSaveResponse(
                this.allowedToVoteService.create(this.allowedToVote));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<AllowedToVote>>) {
        result.subscribe((res: HttpResponse<AllowedToVote>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: AllowedToVote) {
        this.eventManager.broadcast({ name: 'allowedToVoteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-allowed-to-vote-popup',
    template: ''
})
export class AllowedToVotePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private allowedToVotePopupService: AllowedToVotePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.allowedToVotePopupService
                    .open(AllowedToVoteDialogComponent as Component, params['id']);
            } else {
                this.allowedToVotePopupService
                    .open(AllowedToVoteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
