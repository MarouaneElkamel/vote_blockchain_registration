import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Address } from './address.model';
import { AddressPopupService } from './address-popup.service';
import { AddressService } from './address.service';
import { AllowedToVote, AllowedToVoteService } from '../allowed-to-vote';
import { NotAllowedToVote, NotAllowedToVoteService } from '../not-allowed-to-vote';

@Component({
    selector: 'jhi-address-dialog',
    templateUrl: './address-dialog.component.html'
})
export class AddressDialogComponent implements OnInit {

    address: Address;
    isSaving: boolean;

    allowedtovotes: AllowedToVote[];

    notallowedtovotes: NotAllowedToVote[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private addressService: AddressService,
        private allowedToVoteService: AllowedToVoteService,
        private notAllowedToVoteService: NotAllowedToVoteService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.allowedToVoteService.query()
            .subscribe((res: HttpResponse<AllowedToVote[]>) => { this.allowedtovotes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
        this.notAllowedToVoteService.query()
            .subscribe((res: HttpResponse<NotAllowedToVote[]>) => { this.notallowedtovotes = res.body; }, (res: HttpErrorResponse) => this.onError(res.message));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.address.id !== undefined) {
            this.subscribeToSaveResponse(
                this.addressService.update(this.address));
        } else {
            this.subscribeToSaveResponse(
                this.addressService.create(this.address));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<Address>>) {
        result.subscribe((res: HttpResponse<Address>) =>
            this.onSaveSuccess(res.body), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess(result: Address) {
        this.eventManager.broadcast({ name: 'addressListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackAllowedToVoteById(index: number, item: AllowedToVote) {
        return item.id;
    }

    trackNotAllowedToVoteById(index: number, item: NotAllowedToVote) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-address-popup',
    template: ''
})
export class AddressPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private addressPopupService: AddressPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.addressPopupService
                    .open(AddressDialogComponent as Component, params['id']);
            } else {
                this.addressPopupService
                    .open(AddressDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
