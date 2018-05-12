/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VoteTestModule } from '../../../test.module';
import { AllowedToVoteComponent } from '../../../../../../main/webapp/app/entities/allowed-to-vote/allowed-to-vote.component';
import { AllowedToVoteService } from '../../../../../../main/webapp/app/entities/allowed-to-vote/allowed-to-vote.service';
import { AllowedToVote } from '../../../../../../main/webapp/app/entities/allowed-to-vote/allowed-to-vote.model';

describe('Component Tests', () => {

    describe('AllowedToVote Management Component', () => {
        let comp: AllowedToVoteComponent;
        let fixture: ComponentFixture<AllowedToVoteComponent>;
        let service: AllowedToVoteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VoteTestModule],
                declarations: [AllowedToVoteComponent],
                providers: [
                    AllowedToVoteService
                ]
            })
            .overrideTemplate(AllowedToVoteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AllowedToVoteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AllowedToVoteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AllowedToVote(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.allowedToVotes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
