import { privateAxios } from "./helper"
import { myAxios } from "./helper"

//create post function
export const createPost=(postData)=>{
    // console.log(postData);
    
    return privateAxios.post(`/user/${postData.userId}/category/${postData.categoryId}/posts`,postData).then(response=>response.data)

}

// get all posts function

export const loadAllPosts = (pageNumber, pageSize) => {
    return myAxios.get(`/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
        .then(response => response.data);
}

// load single post of given id 
export const loadPost = (postId) => {
    return myAxios.get(`/posts/${postId}`)
        .then(response => response.data);
}

// create comment on post
export const createComment = (comment, postId) => {
    return privateAxios.post(`/comments/post/${postId}/comments`, comment)
        .then(response => response.data);
}

// upload post banner image
export const uploadPostImage = (image, postId) => {
    let formData = new FormData();
    formData.append('image', image);

    return privateAxios.post(`/post/image/upload/${postId}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    }).then(response => response.data);
}

// load all post by category
export const loadAllPostsByCategory = (categoryId, pageNumber = 0, pageSize = 5) => {
    return myAxios.get(`/category/${categoryId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
        .then(response => response.data);
}           

// load all posts by user
export const loadAllPostsByUser = (userId, pageNumber = 0, pageSize = 5) => {
    return myAxios.get(`/user/${userId}/posts?pageNumber=${pageNumber}&pageSize=${pageSize}&sortBy=addedDate&sortDir=desc`)
        .then(response => response.data);
}

// delete post by id
export const deletePost = (postId) => {
    return privateAxios.delete(`/posts/${postId}`)
        .then(response => response.data);
}

// update post
export const updatePost = (postId, postData) => {
    return privateAxios.put(`/posts/${postId}`, postData)
        .then(response => response.data);
}