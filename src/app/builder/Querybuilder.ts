import { FilterQuery, Query } from 'mongoose';

class Querybuilder<T> {
  public modelQuery: Query<T[], T>;
  public query: Record<string, unknown>;

  constructor(modelQuery: Query<T[], T>, query: Record<string, unknown>) {
    this.modelQuery = modelQuery;
    this.query = query;
  }

  search(searchableFields: string[]) {
    const searchTerm = this?.query?.searchTerm;
    if (searchTerm) {
      this.modelQuery = this.modelQuery.find({
        $or: searchableFields.map(
          (field) =>
            ({
              [field]: { $regex: searchTerm, $options: 'i' },
            }) as FilterQuery<T>,
        ),
      });
    }
    return this;
  }

  filter() {
    const queryObj = { ...this.query }; //copy

    // Filetering
    const excludeFields = ['searchTerm', 'sort', 'limit', 'page', 'fields'];
    excludeFields.forEach((elem) => delete queryObj[elem]);
    this.modelQuery = this.modelQuery.find(queryObj as FilterQuery<T>);

    return this;
  }

  sort() {
    const sort = (this?.query?.sort as string)?.split(',')?.join(' ') 
    || '-createdAt';
    this.modelQuery = this.modelQuery.sort(sort as string);
    return this;
  }

  paginate() {
    const page = parseInt(this?.query?.page as string) || 1;
    const limit = parseInt(this?.query?.limit as string) || 10;
    const skip = (page - 1) * limit;
    this.modelQuery = this.modelQuery.skip(skip).limit(limit);
    return this
  }


    fields() {
    const fields =
      (this?.query?.fields as string)?.split(',')?.join(' ') || '-__v';

    this.modelQuery = this.modelQuery.select(fields);
    return this;
  }
}



export default Querybuilder;

