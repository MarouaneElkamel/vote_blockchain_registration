import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NotAllowedToVote } from './not-allowed-to-vote.model';
import { NotAllowedToVotePopupService } from './not-allowed-to-vote-popup.service';
import { NotAllowedToVoteService } from './not-allowed-to-vote.service';

@Component({
    selector: 'jhi-not-allowed-to-vote-dialog',
    templateUrl: './not-allowed-to-vote-dialog.component.html'
})
export class NotAllowedToVoteDialogComponent implements OnInit {

    notAllowedToVote: NotAllowedToVote;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private notAllowedToVoteService: NotAllowedToVoteService,
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
        if (this.notAllowedToVote.id !== undefined) {
            this.subscribeToSaveResponse(
                this.notAllowedToVoteService.update(this.notAllowedToVote));
        } else {
            this.subscribeToSaveResponse(
                this.notAllowedToVoteService.create(this.notAllowedToVote));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<NotAllowedToVote>>) {
        result.subscribe((res: HttpResponse<NotAllowedToVote>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: NotAllowedToVote) {
        this.eventManager.broadcast({ name: 'notAllowedToVoteListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }
}

@Component({
    selector: 'jhi-not-allowed-to-vote-popup',
    template: ''
})
export class NotAllowedToVotePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notAllowedToVotePopupService: NotAllowedToVotePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.notAllowedToVotePopupService
                    .open(NotAllowedToVoteDialogComponent as Component, params['id']);
            } else {
                this.notAllowedToVotePopupService
                    .open(NotAllowedToVoteDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
