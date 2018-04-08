import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { Vote } from './vote.model';
import { VoteService } from './vote.service';

@Injectable()
export class VotePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private voteService: VoteService

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
                this.voteService.find(id)
                    .subscribe((voteResponse: HttpResponse<Vote>) => {
                        const vote: Vote = voteResponse.body;
                        vote.inscriptionDate = this.datePipe
                            .transform(vote.inscriptionDate, 'yyyy-MM-ddTHH:mm:ss');
                        vote.inscriptionEndDate = this.datePipe
                            .transform(vote.inscriptionEndDate, 'yyyy-MM-ddTHH:mm:ss');
                        vote.voteDate = this.datePipe
                            .transform(vote.voteDate, 'yyyy-MM-ddTHH:mm:ss');
                        vote.voteEndDate = this.datePipe
                            .transform(vote.voteEndDate, 'yyyy-MM-ddTHH:mm:ss');
                        vote.resultDate = this.datePipe
                            .transform(vote.resultDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.voteModalRef(component, vote);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.voteModalRef(component, new Vote());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    voteModalRef(component: Component, vote: Vote): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.vote = vote;
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
