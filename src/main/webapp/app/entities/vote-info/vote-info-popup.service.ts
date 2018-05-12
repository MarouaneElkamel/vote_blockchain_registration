import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { VoteInfo } from './vote-info.model';
import { VoteInfoService } from './vote-info.service';

@Injectable()
export class VoteInfoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private voteInfoService: VoteInfoService

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
                this.voteInfoService.find(id)
                    .subscribe((voteInfoResponse: HttpResponse<VoteInfo>) => {
                        const voteInfo: VoteInfo = voteInfoResponse.body;
                        voteInfo.inscriptionDate = this.datePipe
                            .transform(voteInfo.inscriptionDate, 'yyyy-MM-ddTHH:mm:ss');
                        voteInfo.inscriptionEndDate = this.datePipe
                            .transform(voteInfo.inscriptionEndDate, 'yyyy-MM-ddTHH:mm:ss');
                        voteInfo.voteDate = this.datePipe
                            .transform(voteInfo.voteDate, 'yyyy-MM-ddTHH:mm:ss');
                        voteInfo.voteEndDate = this.datePipe
                            .transform(voteInfo.voteEndDate, 'yyyy-MM-ddTHH:mm:ss');
                        voteInfo.resultDate = this.datePipe
                            .transform(voteInfo.resultDate, 'yyyy-MM-ddTHH:mm:ss');
                        this.ngbModalRef = this.voteInfoModalRef(component, voteInfo);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.voteInfoModalRef(component, new VoteInfo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    voteInfoModalRef(component: Component, voteInfo: VoteInfo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.voteInfo = voteInfo;
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
