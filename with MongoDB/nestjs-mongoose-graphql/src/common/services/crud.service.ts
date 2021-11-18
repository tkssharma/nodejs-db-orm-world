import {
  FilterQuery,
  Model,
  ObjectId,
  Document,
  QueryOptions,
  PaginateModel,
} from "mongoose";
import { NotFoundException } from "@nestjs/common";
import { Pagination } from "../pagination/pagination.type";
import { User } from "../../users/users.schema";
import { BaseSchema } from "../base.schema";

type TDocument<T> = T & Document;
type TPaginatedDocument<T> = PaginateModel<TDocument<T>>;

const PAGE_SIZE = 10;

export class CrudService<T extends BaseSchema, CreateDTO, UpdateDTO> {
  private paginatedModel: TPaginatedDocument<T>;

  constructor(private readonly model: Model<TDocument<T>>) {
    this.paginatedModel = model as TPaginatedDocument<T>;
  }

  async create(createDto: CreateDTO): Promise<T> {
    const createdObject = new this.model(createDto);
    return createdObject.save();
  }

  async createWithUser(
    createDto: CreateDTO,
    user: User,
    userRef: string,
  ): Promise<T> {
    const createdObject = new this.model({
      ...createDto,
      [userRef]: user.id,
    });
    return createdObject.save();
  }

  async update(id: ObjectId, updateDto: UpdateDTO): Promise<T> {
    const result = await this.model.findByIdAndUpdate(id, updateDto).exec();
    if (!result) {
      throw new NotFoundException(result);
    }
    return result;
  }

  async delete(filter: FilterQuery<TDocument<T>>): Promise<boolean> {
    const result = await this.model.deleteOne(filter).exec();
    if (!result.ok) {
      throw new NotFoundException("not found");
    }
    return true;
  }

  async findOne(
    filter: FilterQuery<TDocument<T>>,
    projection: any = null,
    options: QueryOptions = {},
  ): Promise<T> {
    const obj = await this.model.findOne(filter, projection, options).exec();
    if (!obj) {
      throw new NotFoundException("not found");
    }
    return obj;
  }

  protected async paginateQuery(
    query,
    options: QueryOptions,
    page: number,
    pageSize: number,
  ): Promise<Pagination<T>> {
    const results = await this.paginatedModel.paginate(query, {
      ...options,
      pagination: true,
      page: page,
      limit: pageSize,
      lean: true,
    });
    return {
      hasNextPage: results.hasNextPage,
      hasPreviousPage: results.hasPrevPage,
      nextPage: results.nextPage,
      prevPage: results.prevPage,
      results: results.docs,
      totalCount: results.totalDocs,
      totalPages: results.totalPages,
      page: results.page,
    };
  }

  async findAll(
    query: FilterQuery<TDocument<T>>,
    projection = null,
    options: QueryOptions,
    page: number,
    pageSize: number = PAGE_SIZE,
  ): Promise<Pagination<T>> {
    return this.paginateQuery(
      this.paginatedModel.find(query, projection, null),
      options,
      page,
      pageSize,
    );
  }

  async findByIds(ids: ObjectId[]): Promise<T[]> {
    // @ts-ignore
    return this.model.find({ _id: { $in: ids } });
  }
}
