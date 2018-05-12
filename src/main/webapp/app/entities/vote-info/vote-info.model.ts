import { BaseEntity, User } from './../../shared';

export class VoteInfo implements BaseEntity {
    constructor(
        public id?: number,
        public inscriptionDate?: any,
        public inscriptionEndDate?: any,
        public voteDate?: any,
        public voteEndDate?: any,
        public resultDate?: any,
        public title?: string,
        public description?: string,
        public owner?: User,
        public electeds?: User[],
        public voters?: User[],
        public allowedToVote?: BaseEntity,
        public notAllowedToVote?: BaseEntity,
    ) {
    }
}
