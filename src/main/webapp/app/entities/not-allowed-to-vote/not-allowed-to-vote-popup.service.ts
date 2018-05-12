import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { NotAllowedToVote } from './not-allowed-to-vote.model';
import { NotAllowedToVoteService } from './not-allowed-to-vote.service';

@Injectable()
export class NotAllowedToVotePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private notAllowedToVoteService: NotAllowedToVoteService

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
                this.notAllowedToVoteService.find(id)
                    .subscribe((notAllowedToVoteResponse: HttpResponse<NotAllowedToVote>) => {
                        const notAllowedToVote: NotAllowedToVote = notAllowedToVoteResponse.body;
                        this.ngbModalRef = this.notAllowedToVoteModalRef(component, notAllowedToVote);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.notAllowedToVoteModalRef(component, new NotAllowedToVote());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    notAllowedToVoteModalRef(component: Component, notAllowedToVote: NotAllowedToVote): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.notAllowedToVote = notAllowedToVote;
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
