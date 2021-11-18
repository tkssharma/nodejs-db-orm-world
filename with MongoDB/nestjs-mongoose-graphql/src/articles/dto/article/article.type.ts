import { Paginated } from "../../../common/pagination/pagination.type";
import { ObjectType } from "@nestjs/graphql";
import { Article } from "../../schemas/article.schema";

@ObjectType()
export class PaginatedArticle extends Paginated(Article) {}
