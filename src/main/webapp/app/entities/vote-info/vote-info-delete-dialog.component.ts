import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { VoteInfo } from './vote-info.model';
import { VoteInfoPopupService } from './vote-info-popup.service';
import { VoteInfoService } from './vote-info.service';

@Component({
    selector: 'jhi-vote-info-delete-dialog',
    templateUrl: './vote-info-delete-dialog.component.html'
})
export class VoteInfoDeleteDialogComponent {

    voteInfo: VoteInfo;

    constructor(
        private voteInfoService: VoteInfoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.voteInfoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'voteInfoListModification',
                content: 'Deleted an voteInfo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-vote-info-delete-popup',
    template: ''
})
export class VoteInfoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private voteInfoPopupService: VoteInfoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.voteInfoPopupService
                .open(VoteInfoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
