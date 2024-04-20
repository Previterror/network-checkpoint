import { AppState } from "../AppState.js"
import { Post } from "../models/Post.js"
import { logger } from "../utils/Logger.js"
import { api } from "./AxiosService.js"

class PostsService {


    async createPost(newPostData) {
        const response = await api.post('/api/posts', newPostData)
        logger.log('create response', response.data)
        const newPost = new Post(response.data)
        AppState.posts.unshift(newPost)
    }


    async deletePost(postId) {
        const posts = AppState.posts
        const response = await api.delete(`/api/posts/${postId}`)
        logger.log('deleting', response.data)
        const postIndex = posts.findIndex(post => post.id == postId)
        if (postIndex == -1) throw new Error('Could not delete post')
        posts.splice(postIndex, 1)
    }

    async search(searchQuery) {
        AppState.posts = []
        const response = await api.get(`/api/posts?query=${searchQuery}`)
        logger.log('search posts', response.data)
        const foundPosts = response.data.posts.map(post => new Post(post))
        AppState.posts = foundPosts
        AppState.currentpage = response.data.page
        AppState.maxPages = response.data.totalPages
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