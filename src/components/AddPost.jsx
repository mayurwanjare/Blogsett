import { Button, Card, CardBody, Container, Form, Input, Label } from "reactstrap"
import { loadAllCategories } from "../services/category-service"
import { useEffect, useRef, useState } from "react"
import JoditEditor from "jodit-react"
import { createPost as doCreatePost, uploadPostImage } from "../services/post-services"
import { getCurrentUserDetail } from "../auth"
import { toast } from "react-toastify"

const AddPost=()=>{

    const editor=useRef(null)
    // const [content,setContent]=useState('')
    const [categories, setCategories]=useState([])
    const [user,setUser]=useState(undefined)

    const [post, setPost]=useState({
        title:'',
        content:'',
        categoryId:''
    })

    const [image, setImage]=useState(null)

    // const config={
    //     placeholder:"Start typing..."
    // }

    useEffect(
        ()=>{
            
            setUser(getCurrentUserDetail())
            loadAllCategories().then((data)=>{
                console.log(data);
                setCategories(data)
            }).catch(error=>{
                console.log(error);
                
            })

        },[]
    )
   
    //field changed function
    const fieldChanged=(event)=>{
        // console.log(event);
        
        setPost({...post,[event.target.name]:event.target.value})
        
    }

    const contentFeildChanged=(data)=>{
        setPost({...post,'content':data})
    }

    //create post function
    const createPost=(event)=>{

        event.preventDefault();

        // console.log(post);
        if(post.title.trim()===''){
            toast.error("post is required !!")
            return;
        }

        if(post.content.trim()===''){
            toast.error("post content is required !!")
            return;
        }

        if(post.categoryId ===''){
            toast.error("select some category !!")
            return;
        }

        //submit the form on server 
        post['userId']=user.id
        doCreatePost(post).then(data=>{

            uploadPostImage(image, data.postId).then((data)=>{
                toast.success("Image uploaded !!")
            }).catch((error)=>{
                toast.error("Error in uploading image !!")
                console.log(error);
            })


            toast.success("Post Created !!")
            // console.log(post);
            setPost({
                title:'',
                content:'',
                categoryId:''
            })
        }).catch((error)=>{
            toast.error("Post not created due to some error !!")
            // console.log(error);
            
        })
        
        
    }

    //handling file change event 
    const handleFileChange=(event)=>{
        console.log(event.target.files[0]);
        setImage(event.target.files[0])
    }

    return (
        <div className="wrapper">

            <Card className="shadow mt-4" >
                <CardBody>
                    {/* {JSON.stringify(post)} */}
                    <h3>Whats going in your mind ?</h3>
                    <Form onSubmit={createPost}>
                        <div className="my-3">
                            <Label for="title" >Post title</Label>
                            <Input type="text" id="title"
                            placeholder="Enter here"
                            className="rounded-0"
                            name="title"
                            onChange={fieldChanged}
                            />
                        </div>

                        <div className="my-3">
                            <Label for="content" >Post Content</Label>
                            {/* <Input type="textarea" id="content"
                            placeholder="Enter here"
                            className="rounded-0" 
                            style={{height:'300px'}}
                            /> */}

                            <JoditEditor
                            ref={editor}
                            value={post.content}
                            onChange={contentFeildChanged}
                            />
                        </div>

                        {/* file feild */}

                        <div className="mt-3">
                            <Label for="image">Select Post banner</Label>
                            <Input type="file" id="image" onChange={handleFileChange} />
                        </div>

                        <div className="my-3">
                            <Label for="category" >Post Category</Label>
                            <Input type="select" id="category"
                            placeholder="Enter here"
                            className="rounded-0" 
                            name="categoryId"
                            onChange={fieldChanged}
                            defaultValue={0}
                            
                            >

                                <option disabled >--Select category--</option>

                                {
                                    categories.map((category)=>(
                                        <option value={category.categoryId} key={category.categoryId}>
                                            {category.categoryTitle} 
                                        </option>
                                    ))
                                }
                                

                            </Input>
                        </div>

                        <Container className="text-center">
                            <Button type="submit" className="rounded-0" color="primary">Create Post</Button>
                            <Button className="rounded-0 ms-2" color="danger">Reset Content</Button>
                        </Container>

                    </Form>
                    
                </CardBody>
            </Card>
        </div>
    )
}

export default AddPost