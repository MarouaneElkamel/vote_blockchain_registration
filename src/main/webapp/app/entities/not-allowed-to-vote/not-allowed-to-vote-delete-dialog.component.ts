import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { NotAllowedToVote } from './not-allowed-to-vote.model';
import { NotAllowedToVotePopupService } from './not-allowed-to-vote-popup.service';
import { NotAllowedToVoteService } from './not-allowed-to-vote.service';

@Component({
    selector: 'jhi-not-allowed-to-vote-delete-dialog',
    templateUrl: './not-allowed-to-vote-delete-dialog.component.html'
})
export class NotAllowedToVoteDeleteDialogComponent {

    notAllowedToVote: NotAllowedToVote;

    constructor(
        private notAllowedToVoteService: NotAllowedToVoteService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.notAllowedToVoteService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'notAllowedToVoteListModification',
                content: 'Deleted an notAllowedToVote'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-not-allowed-to-vote-delete-popup',
    template: ''
})
export class NotAllowedToVoteDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private notAllowedToVotePopupService: NotAllowedToVotePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.notAllowedToVotePopupService
                .open(NotAllowedToVoteDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
