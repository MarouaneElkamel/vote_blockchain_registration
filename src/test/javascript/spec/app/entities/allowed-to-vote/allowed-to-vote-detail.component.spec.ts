/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VoteTestModule } from '../../../test.module';
import { AllowedToVoteDetailComponent } from '../../../../../../main/webapp/app/entities/allowed-to-vote/allowed-to-vote-detail.component';
import { AllowedToVoteService } from '../../../../../../main/webapp/app/entities/allowed-to-vote/allowed-to-vote.service';
import { AllowedToVote } from '../../../../../../main/webapp/app/entities/allowed-to-vote/allowed-to-vote.model';

describe('Component Tests', () => {

    describe('AllowedToVote Management Detail Component', () => {
        let comp: AllowedToVoteDetailComponent;
        let fixture: ComponentFixture<AllowedToVoteDetailComponent>;
        let service: AllowedToVoteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VoteTestModule],
                declarations: [AllowedToVoteDetailComponent],
                providers: [
                    AllowedToVoteService
                ]
            })
            .overrideTemplate(AllowedToVoteDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AllowedToVoteDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AllowedToVoteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AllowedToVote(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.allowedToVote).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
