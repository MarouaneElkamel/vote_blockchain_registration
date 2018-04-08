import { BaseEntity, User } from './../../shared';

export class Vote implements BaseEntity {
    constructor(
        public id?: number,
        public inscriptionDate?: any,
        public inscriptionEndDate?: any,
        public voteDate?: any,
        public voteEndDate?: any,
        public resultDate?: any,
        public owner?: User,
        public voters?: User[],
    ) {
    }
}
