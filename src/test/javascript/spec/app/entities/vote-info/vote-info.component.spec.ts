/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { VoteTestModule } from '../../../test.module';
import { VoteInfoComponent } from '../../../../../../main/webapp/app/entities/vote-info/vote-info.component';
import { VoteInfoService } from '../../../../../../main/webapp/app/entities/vote-info/vote-info.service';
import { VoteInfo } from '../../../../../../main/webapp/app/entities/vote-info/vote-info.model';

describe('Component Tests', () => {

    describe('VoteInfo Management Component', () => {
        let comp: VoteInfoComponent;
        let fixture: ComponentFixture<VoteInfoComponent>;
        let service: VoteInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VoteTestModule],
                declarations: [VoteInfoComponent],
                providers: [
                    VoteInfoService
                ]
            })
            .overrideTemplate(VoteInfoComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VoteInfoComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VoteInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new VoteInfo(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.voteInfos[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
