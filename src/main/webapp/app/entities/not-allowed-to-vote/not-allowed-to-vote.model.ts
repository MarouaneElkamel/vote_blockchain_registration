import { BaseEntity } from './../../shared';

export class NotAllowedToVote implements BaseEntity {
    constructor(
        public id?: number,
        public voters?: BaseEntity[],
    ) {
    }
}
