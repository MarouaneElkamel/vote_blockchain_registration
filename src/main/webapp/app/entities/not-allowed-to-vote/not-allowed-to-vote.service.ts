import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { NotAllowedToVote } from './not-allowed-to-vote.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<NotAllowedToVote>;

@Injectable()
export class NotAllowedToVoteService {

    private resourceUrl =  SERVER_API_URL + 'api/not-allowed-to-votes';

    constructor(private http: HttpClient) { }

    create(notAllowedToVote: NotAllowedToVote): Observable<EntityResponseType> {
        const copy = this.convert(notAllowedToVote);
        return this.http.post<NotAllowedToVote>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(notAllowedToVote: NotAllowedToVote): Observable<EntityResponseType> {
        const copy = this.convert(notAllowedToVote);
        return this.http.put<NotAllowedToVote>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<NotAllowedToVote>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<NotAllowedToVote[]>> {
        const options = createRequestOption(req);
        return this.http.get<NotAllowedToVote[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<NotAllowedToVote[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: NotAllowedToVote = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<NotAllowedToVote[]>): HttpResponse<NotAllowedToVote[]> {
        const jsonResponse: NotAllowedToVote[] = res.body;
        const body: NotAllowedToVote[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to NotAllowedToVote.
     */
    private convertItemFromServer(notAllowedToVote: NotAllowedToVote): NotAllowedToVote {
        const copy: NotAllowedToVote = Object.assign({}, notAllowedToVote);
        return copy;
    }

    /**
     * Convert a NotAllowedToVote to a JSON which can be sent to the server.
     */
    private convert(notAllowedToVote: NotAllowedToVote): NotAllowedToVote {
        const copy: NotAllowedToVote = Object.assign({}, notAllowedToVote);
        return copy;
    }
}
