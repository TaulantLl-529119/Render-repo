import {Getter, inject} from '@loopback/core';
import {BelongsToAccessor, DefaultCrudRepository, repository} from '@loopback/repository';
import {DbDataSource} from '../datasources/db.datasource';
import {Address, AddressRelations, Friend} from '../models';
import {FriendRepository} from './friend.repository';

export class AddressRepository extends DefaultCrudRepository<
  Address,
  typeof Address.prototype.id,
  AddressRelations
> {

  public readonly friend: BelongsToAccessor<Friend, typeof Address.prototype.id>;

  constructor(
    @inject('datasources.db') dataSource: DbDataSource, @repository.getter('FriendRepository') protected friendRepositoryGetter: Getter<FriendRepository>,
  ) {
    super(Address, dataSource);
    this.friend = this.createBelongsToAccessorFor('friend', friendRepositoryGetter,);
    this.registerInclusionResolver('friend', this.friend.inclusionResolver);
  }
}
