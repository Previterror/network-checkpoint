import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {
    search(value) {
        throw new Error('Method not implemented.')
    }


    async changePage(inc) {
        let response = await api.get(`api/posts?page=${inc}`)
        logger.log('Page response', response.data)
        const posts = response.data.posts.map(post => new Post(post))
        AppState.posts = posts
        AppState.currentpage = response.data.page
        AppState.maxPages = response.data.totalPages
    }


    async getAllPosts() {
        const response = await api.get('api/posts')
        // logger.log('posts', response.data)
        const posts = response.data.posts.map(post => new Post(post))
        // logger.log('classed posts', posts)
        AppState.posts = posts
        AppState.currentpage = response.data.page
        AppState.maxPages = response.data.totalPages
    }


}

export const postsService = new PostsService