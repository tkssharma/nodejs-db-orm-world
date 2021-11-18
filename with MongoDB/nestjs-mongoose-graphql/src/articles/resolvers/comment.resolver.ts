import {
  Args,
  Mutation,
  Parent,
  ResolveField,
  Resolver,
  Subscription,
} from "@nestjs/graphql";
import { Comment } from "../schemas/comment.schema";
import { CreateCommentInput } from "../dto/comment/create-comment.input";
import { CommentService } from "../services/comment.service";
import { CurrentUser } from "../../auth/decorators";
import { DeleteCommentInput } from "../dto/comment/delete-comment.input";
import { User } from "../../users/users.schema";
import { ArticleLoader } from "../loaders/article.loader";
import { COMMENT_ADDED_EVENT } from "../subscription-constants";
import { Inject } from "@nestjs/common";
import { PUB_SUB } from "../../common/constants";
import { PubSub } from "graphql-subscriptions";

@Resolver(() => Comment)
export class CommentResolver {
  constructor(
    private readonly commentService: CommentService,
    private readonly articleLoader: ArticleLoader,
    @Inject(PUB_SUB) private readonly pubSub: PubSub,
  ) {}

  @Mutation(() => Comment, { description: "add a comment to existing article" })
  async addComment(
    @Args("input") createCommentInput: CreateCommentInput,
    @CurrentUser() user,
  ): Promise<Comment> {
    return this.commentService.addComment(
      createCommentInput.articleId,
      createCommentInput.body,
      user,
    );
  }

  @Mutation(() => Comment, { description: "delete a comment " })
  async deleteComment(
    @Args("input") deleteCommentInput: DeleteCommentInput,
    @CurrentUser() user,
  ): Promise<boolean> {
    return this.commentService.deleteComment(
      deleteCommentInput.commentId,
      user,
      deleteCommentInput.articleId,
    );
  }

  @ResolveField(() => User)
  async author(@Parent() comment: Comment): Promise<User> {
    return this.articleLoader.batchCommentAuthors.load(comment.author._id);
  }

  @Subscription(() => Comment)
  async commentAdded() {
    return this.pubSub.asyncIterator(COMMENT_ADDED_EVENT);
  }
}
