/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VoteTestModule } from '../../../test.module';
import { NotAllowedToVoteDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/not-allowed-to-vote/not-allowed-to-vote-delete-dialog.component';
import { NotAllowedToVoteService } from '../../../../../../main/webapp/app/entities/not-allowed-to-vote/not-allowed-to-vote.service';

describe('Component Tests', () => {

    describe('NotAllowedToVote Management Delete Component', () => {
        let comp: NotAllowedToVoteDeleteDialogComponent;
        let fixture: ComponentFixture<NotAllowedToVoteDeleteDialogComponent>;
        let service: NotAllowedToVoteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VoteTestModule],
                declarations: [NotAllowedToVoteDeleteDialogComponent],
                providers: [
                    NotAllowedToVoteService
                ]
            })
            .overrideTemplate(NotAllowedToVoteDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotAllowedToVoteDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotAllowedToVoteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
