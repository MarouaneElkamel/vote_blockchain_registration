import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AllowedToVote } from './allowed-to-vote.model';
import { AllowedToVoteService } from './allowed-to-vote.service';

@Injectable()
export class AllowedToVotePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private allowedToVoteService: AllowedToVoteService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.allowedToVoteService.find(id)
                    .subscribe((allowedToVoteResponse: HttpResponse<AllowedToVote>) => {
                        const allowedToVote: AllowedToVote = allowedToVoteResponse.body;
                        this.ngbModalRef = this.allowedToVoteModalRef(component, allowedToVote);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.allowedToVoteModalRef(component, new AllowedToVote());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    allowedToVoteModalRef(component: Component, allowedToVote: AllowedToVote): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.allowedToVote = allowedToVote;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
