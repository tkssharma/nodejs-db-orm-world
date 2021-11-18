import { ObjectId } from "mongoose";
import { BaseSchema } from "./base.schema";

export class Mapper<T extends BaseSchema> {
  public mapObjectsToId(objects: T[], ids: ObjectId[]): T[] {
    const map = new Map(objects.map((obj) => [obj.id, obj]));
    return ids.map((id) => map.get(id.toString()));
  }
}
