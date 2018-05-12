/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { VoteTestModule } from '../../../test.module';
import { VoteInfoDialogComponent } from '../../../../../../main/webapp/app/entities/vote-info/vote-info-dialog.component';
import { VoteInfoService } from '../../../../../../main/webapp/app/entities/vote-info/vote-info.service';
import { VoteInfo } from '../../../../../../main/webapp/app/entities/vote-info/vote-info.model';
import { UserService } from '../../../../../../main/webapp/app/shared';
import { AllowedToVoteService } from '../../../../../../main/webapp/app/entities/allowed-to-vote';
import { NotAllowedToVoteService } from '../../../../../../main/webapp/app/entities/not-allowed-to-vote';

describe('Component Tests', () => {

    describe('VoteInfo Management Dialog Component', () => {
        let comp: VoteInfoDialogComponent;
        let fixture: ComponentFixture<VoteInfoDialogComponent>;
        let service: VoteInfoService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VoteTestModule],
                declarations: [VoteInfoDialogComponent],
                providers: [
                    UserService,
                    AllowedToVoteService,
                    NotAllowedToVoteService,
                    VoteInfoService
                ]
            })
            .overrideTemplate(VoteInfoDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VoteInfoDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VoteInfoService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VoteInfo(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.voteInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'voteInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new VoteInfo();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.voteInfo = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'voteInfoListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
