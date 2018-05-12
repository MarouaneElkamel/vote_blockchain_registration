import { BaseEntity } from './../../shared';

export class Address implements BaseEntity {
    constructor(
        public id?: number,
        public publicAddress?: string,
        public votesAllowedIn?: BaseEntity,
        public votesNotAllowedIn?: BaseEntity,
    ) {
    }
}
