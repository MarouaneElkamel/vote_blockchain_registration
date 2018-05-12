import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { VoteInfo } from './vote-info.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<VoteInfo>;

@Injectable()
export class VoteInfoService {

    private resourceUrl =  SERVER_API_URL + 'api/vote-infos';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(voteInfo: VoteInfo): Observable<EntityResponseType> {
        const copy = this.convert(voteInfo);
        return this.http.post<VoteInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(voteInfo: VoteInfo): Observable<EntityResponseType> {
        const copy = this.convert(voteInfo);
        return this.http.put<VoteInfo>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<VoteInfo>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<VoteInfo[]>> {
        const options = createRequestOption(req);
        return this.http.get<VoteInfo[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<VoteInfo[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: VoteInfo = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<VoteInfo[]>): HttpResponse<VoteInfo[]> {
        const jsonResponse: VoteInfo[] = res.body;
        const body: VoteInfo[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to VoteInfo.
     */
    private convertItemFromServer(voteInfo: VoteInfo): VoteInfo {
        const copy: VoteInfo = Object.assign({}, voteInfo);
        copy.inscriptionDate = this.dateUtils
            .convertDateTimeFromServer(voteInfo.inscriptionDate);
        copy.inscriptionEndDate = this.dateUtils
            .convertDateTimeFromServer(voteInfo.inscriptionEndDate);
        copy.voteDate = this.dateUtils
            .convertDateTimeFromServer(voteInfo.voteDate);
        copy.voteEndDate = this.dateUtils
            .convertDateTimeFromServer(voteInfo.voteEndDate);
        copy.resultDate = this.dateUtils
            .convertDateTimeFromServer(voteInfo.resultDate);
        return copy;
    }

    /**
     * Convert a VoteInfo to a JSON which can be sent to the server.
     */
    private convert(voteInfo: VoteInfo): VoteInfo {
        const copy: VoteInfo = Object.assign({}, voteInfo);

        copy.inscriptionDate = this.dateUtils.toDate(voteInfo.inscriptionDate);

        copy.inscriptionEndDate = this.dateUtils.toDate(voteInfo.inscriptionEndDate);

        copy.voteDate = this.dateUtils.toDate(voteInfo.voteDate);

        copy.voteEndDate = this.dateUtils.toDate(voteInfo.voteEndDate);

        copy.resultDate = this.dateUtils.toDate(voteInfo.resultDate);
        return copy;
    }
}
