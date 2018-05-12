import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AllowedToVote } from './allowed-to-vote.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AllowedToVote>;

@Injectable()
export class AllowedToVoteService {

    private resourceUrl =  SERVER_API_URL + 'api/allowed-to-votes';

    constructor(private http: HttpClient) { }

    create(allowedToVote: AllowedToVote): Observable<EntityResponseType> {
        const copy = this.convert(allowedToVote);
        return this.http.post<AllowedToVote>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(allowedToVote: AllowedToVote): Observable<EntityResponseType> {
        const copy = this.convert(allowedToVote);
        return this.http.put<AllowedToVote>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AllowedToVote>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AllowedToVote[]>> {
        const options = createRequestOption(req);
        return this.http.get<AllowedToVote[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AllowedToVote[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AllowedToVote = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AllowedToVote[]>): HttpResponse<AllowedToVote[]> {
        const jsonResponse: AllowedToVote[] = res.body;
        const body: AllowedToVote[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AllowedToVote.
     */
    private convertItemFromServer(allowedToVote: AllowedToVote): AllowedToVote {
        const copy: AllowedToVote = Object.assign({}, allowedToVote);
        return copy;
    }

    /**
     * Convert a AllowedToVote to a JSON which can be sent to the server.
     */
    private convert(allowedToVote: AllowedToVote): AllowedToVote {
        const copy: AllowedToVote = Object.assign({}, allowedToVote);
        return copy;
    }
}
