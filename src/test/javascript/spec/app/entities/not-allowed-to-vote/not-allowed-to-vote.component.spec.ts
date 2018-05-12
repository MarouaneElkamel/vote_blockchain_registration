/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VoteTestModule } from '../../../test.module';
import { NotAllowedToVoteComponent } from '../../../../../../main/webapp/app/entities/not-allowed-to-vote/not-allowed-to-vote.component';
import { NotAllowedToVoteService } from '../../../../../../main/webapp/app/entities/not-allowed-to-vote/not-allowed-to-vote.service';
import { NotAllowedToVote } from '../../../../../../main/webapp/app/entities/not-allowed-to-vote/not-allowed-to-vote.model';

describe('Component Tests', () => {

    describe('NotAllowedToVote Management Component', () => {
        let comp: NotAllowedToVoteComponent;
        let fixture: ComponentFixture<NotAllowedToVoteComponent>;
        let service: NotAllowedToVoteService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VoteTestModule],
                declarations: [NotAllowedToVoteComponent],
                providers: [
                    NotAllowedToVoteService
                ]
            })
            .overrideTemplate(NotAllowedToVoteComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(NotAllowedToVoteComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(NotAllowedToVoteService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new NotAllowedToVote(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.notAllowedToVotes[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
