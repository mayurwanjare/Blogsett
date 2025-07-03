import React from 'react'
import { Link } from 'react-router-dom'
import { Card, CardBody, CardText } from 'reactstrap'
import { BASE_URL, printDate } from '../services/helper'

function Post({
  postId = 0,
  title = "This is default post title",
  content = "This is default post content",
  imageName = "",
  user = { name: "Anonymous" },
  addedDate = "",
  category = { categoryTitle: "" }
}) {
  return (
    <Card className='border-0 shadow mt-4 mb-4 feed-card' style={{ borderRadius: '18px', overflow: 'hidden', background: '#fff' }}>
      <div className="feed-image-container" style={{ width: '100%', height: '220px', overflow: 'hidden', background: '#f8f9fa' }}>
        <img
          src={BASE_URL + '/post/image/' + imageName}
          alt={title}
          className='img-fluid'
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center'
          }}
        />
      </div>
      <CardBody>
        <div className="d-flex justify-content-between align-items-center mb-2">
          <span className="badge bg-primary" style={{ fontSize: '0.9rem' }}>{category.categoryTitle}</span>
          <span className="text-muted" style={{ fontSize: '0.85rem' }}>
            {addedDate ? new Date(addedDate).toLocaleDateString() : ''}
          </span>
        </div>
        <h3 className="mb-2" style={{ fontWeight: 600 }}>{title}</h3>
        <CardText className="mb-3" style={{ color: '#444', minHeight: '60px' }}>
          <span dangerouslySetInnerHTML={{ __html: content.substring(0, 120) + '...' }} />
        </CardText>
        <div className="d-flex justify-content-between align-items-center">
          <span className="text-muted" style={{ fontSize: '0.95rem' }}>
            Posted by <b>{user.name}</b>
          </span>
          <Link className='btn btn-outline-primary btn-sm' to={`posts/${postId}`}>Read More</Link>
        </div>
      </CardBody>
    </Card>
  )
}

export default Post