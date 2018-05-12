import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AllowedToVote } from './allowed-to-vote.model';
import { AllowedToVotePopupService } from './allowed-to-vote-popup.service';
import { AllowedToVoteService } from './allowed-to-vote.service';

@Component({
    selector: 'jhi-allowed-to-vote-delete-dialog',
    templateUrl: './allowed-to-vote-delete-dialog.component.html'
})
export class AllowedToVoteDeleteDialogComponent {

    allowedToVote: AllowedToVote;

    constructor(
        private allowedToVoteService: AllowedToVoteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.allowedToVoteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'allowedToVoteListModification',
                content: 'Deleted an allowedToVote'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-allowed-to-vote-delete-popup',
    template: ''
})
export class AllowedToVoteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private allowedToVotePopupService: AllowedToVotePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.allowedToVotePopupService
                .open(AllowedToVoteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
