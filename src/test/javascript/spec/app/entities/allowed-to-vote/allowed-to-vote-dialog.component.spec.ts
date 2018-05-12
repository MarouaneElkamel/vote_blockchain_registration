/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VoteTestModule } from '../../../test.module';
import { AllowedToVoteDialogComponent } from '../../../../../../main/webapp/app/entities/allowed-to-vote/allowed-to-vote-dialog.component';
import { AllowedToVoteService } from '../../../../../../main/webapp/app/entities/allowed-to-vote/allowed-to-vote.service';
import { AllowedToVote } from '../../../../../../main/webapp/app/entities/allowed-to-vote/allowed-to-vote.model';

describe('Component Tests', () => {

    describe('AllowedToVote Management Dialog Component', () => {
        let comp: AllowedToVoteDialogComponent;
        let fixture: ComponentFixture<AllowedToVoteDialogComponent>;
        let service: AllowedToVoteService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VoteTestModule],
                declarations: [AllowedToVoteDialogComponent],
                providers: [
                    AllowedToVoteService
                ]
            })
            .overrideTemplate(AllowedToVoteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AllowedToVoteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AllowedToVoteService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AllowedToVote(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.allowedToVote = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'allowedToVoteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AllowedToVote();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.allowedToVote = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'allowedToVoteListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
