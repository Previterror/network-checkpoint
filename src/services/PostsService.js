import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {


    async getAllPosts() {
        const response = await api.get('api/posts')
        // logger.log('posts', response.data)
        const posts = response.data.posts.map(post => new Post(post))
        // logger.log('classed posts', posts)
        AppState.posts = posts

    }


}

export const postsService = new PostsService