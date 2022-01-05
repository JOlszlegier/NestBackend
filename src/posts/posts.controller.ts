import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostsService } from './posts.service';
import CreatePostDto from './dto/createPost.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}
  @Get()
  getPosts(): any {
    return this.postsService.getAllPosts();
  }

  @Post()
  postUser(@Body() body: CreatePostDto): any {
    return this.postsService.createPost(body);
  }
}
