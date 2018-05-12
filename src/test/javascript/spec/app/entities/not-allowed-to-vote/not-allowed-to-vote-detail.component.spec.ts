/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VoteTestModule } from '../../../test.module';
import { NotAllowedToVoteDetailComponent } from '../../../../../../main/webapp/app/entities/not-allowed-to-vote/not-allowed-to-vote-detail.component';
import { NotAllowedToVoteService } from '../../../../../../main/webapp/app/entities/not-allowed-to-vote/not-allowed-to-vote.service';
import { NotAllowedToVote } from '../../../../../../main/webapp/app/entities/not-allowed-to-vote/not-allowed-to-vote.model';

describe('Component Tests', () => {

    describe('NotAllowedToVote Management Detail Component', () => {
        let comp: NotAllowedToVoteDetailComponent;
        let fixture: ComponentFixture<NotAllowedToVoteDetailComponent>;
        let service: NotAllowedToVoteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VoteTestModule],
                declarations: [NotAllowedToVoteDetailComponent],
                providers: [
                    NotAllowedToVoteService
                ]
            })
            .overrideTemplate(NotAllowedToVoteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotAllowedToVoteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotAllowedToVoteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new NotAllowedToVote(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.notAllowedToVote).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
