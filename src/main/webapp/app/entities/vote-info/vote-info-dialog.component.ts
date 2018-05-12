import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { VoteInfo } from './vote-info.model';
import { VoteInfoPopupService } from './vote-info-popup.service';
import { VoteInfoService } from './vote-info.service';
import { User, UserService } from '../../shared';
import { AllowedToVote, AllowedToVoteService } from '../allowed-to-vote';
import { NotAllowedToVote, NotAllowedToVoteService } from '../not-allowed-to-vote';

@Component({
    selector: 'jhi-vote-info-dialog',
    templateUrl: './vote-info-dialog.component.html'
})
export class VoteInfoDialogComponent implements OnInit {

    voteInfo: VoteInfo;
    isSaving: boolean;

    users: User[];

    allowedtovotes: AllowedToVote[];

    notallowedtovotes: NotAllowedToVote[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private voteInfoService: VoteInfoService,
        private userService: UserService,
        private allowedToVoteService: AllowedToVoteService,
        private notAllowedToVoteService: NotAllowedToVoteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.userService.query()
            .subscribe((res: HttpResponse<User[]>) => { this.users = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.allowedToVoteService
            .query({filter: 'voteinfo-is-null'})
            .subscribe((res: HttpResponse<AllowedToVote[]>) => {
                if (!this.voteInfo.allowedToVote || !this.voteInfo.allowedToVote.id) {
                    this.allowedtovotes = res.body;
                } else {
                    this.allowedToVoteService
                        .find(this.voteInfo.allowedToVote.id)
                        .subscribe((subRes: HttpResponse<AllowedToVote>) => {
                            this.allowedtovotes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
        this.notAllowedToVoteService
            .query({filter: 'voteinfo-is-null'})
            .subscribe((res: HttpResponse<NotAllowedToVote[]>) => {
                if (!this.voteInfo.notAllowedToVote || !this.voteInfo.notAllowedToVote.id) {
                    this.notallowedtovotes = res.body;
                } else {
                    this.notAllowedToVoteService
                        .find(this.voteInfo.notAllowedToVote.id)
                        .subscribe((subRes: HttpResponse<NotAllowedToVote>) => {
                            this.notallowedtovotes = [subRes.body].concat(res.body);
                        }, (subRes: HttpErrorResponse) => this.onError(subRes.message));
                }
            }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.voteInfo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.voteInfoService.update(this.voteInfo));
        } else {
            this.subscribeToSaveResponse(
                this.voteInfoService.create(this.voteInfo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<VoteInfo>>) {
        result.subscribe((res: HttpResponse<VoteInfo>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: VoteInfo) {
        this.eventManager.broadcast({ name: 'voteInfoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackUserById(index: number, item: User) {
        return item.id;
    }

    trackAllowedToVoteById(index: number, item: AllowedToVote) {
        return item.id;
    }

    trackNotAllowedToVoteById(index: number, item: NotAllowedToVote) {
        return item.id;
    }

    getSelected(selectedVals: Array<any>, option: any) {
        if (selectedVals) {
            for (let i = 0; i < selectedVals.length; i++) {
                if (option.id === selectedVals[i].id) {
                    return selectedVals[i];
                }
            }
        }
        return option;
    }
}

@Component({
    selector: 'jhi-vote-info-popup',
    template: ''
})
export class VoteInfoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voteInfoPopupService: VoteInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.voteInfoPopupService
                    .open(VoteInfoDialogComponent as Component, params['id']);
            } else {
                this.voteInfoPopupService
                    .open(VoteInfoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
