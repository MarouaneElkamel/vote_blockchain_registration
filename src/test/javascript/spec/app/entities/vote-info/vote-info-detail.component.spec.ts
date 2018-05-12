/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { VoteTestModule } from '../../../test.module';
import { VoteInfoDetailComponent } from '../../../../../../main/webapp/app/entities/vote-info/vote-info-detail.component';
import { VoteInfoService } from '../../../../../../main/webapp/app/entities/vote-info/vote-info.service';
import { VoteInfo } from '../../../../../../main/webapp/app/entities/vote-info/vote-info.model';

describe('Component Tests', () => {

    describe('VoteInfo Management Detail Component', () => {
        let comp: VoteInfoDetailComponent;
        let fixture: ComponentFixture<VoteInfoDetailComponent>;
        let service: VoteInfoService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [VoteTestModule],
                declarations: [VoteInfoDetailComponent],
                providers: [
                    VoteInfoService
                ]
            })
            .overrideTemplate(VoteInfoDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(VoteInfoDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(VoteInfoService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new VoteInfo(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.voteInfo).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
