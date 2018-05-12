import { BaseEntity } from './../../shared';

export class AllowedToVote implements BaseEntity {
    constructor(
        public id?: number,
        public voters?: BaseEntity[],
    ) {
    }
}
