import React from 'react';
import { ListGroup, ListGroupItem, Form } from 'react-bootstrap';
import 'static/css/font-awesome.css';
import QuestionItem from './questionItem';

const listGroupItemStyle = {
  borderRadius: 5,
  border: '1px solid #888',
  boxShadow: '0px 5px 35px rgba(0, 0, 0, .7)',
  padding: '0px 0px',
  marginLeft: '30px',
  marginRight: '30px',
  marginBottom: '30px',
};

const PostList = ({ posts, parent_id, submitReply }) => (
  <ListGroup>
    {
      posts.filter(post => (post.parent_post==parent_id))
        .map(post => (
          <ListGroupItem key={post.id} style={listGroupItemStyle}>
            <QuestionItem question={post} />
            <PostList posts={posts} parent_id={post.id} submitReply={submitReply}/>
            <Form
                onSubmit={event => submitReply(event, event.target[0].value, post.id)}
                id={`replyTo${post.id}`}>
              <input type="text" placeholder="Enter reply" className="form-control" />
            </Form>
          </ListGroupItem>
        ))
    }
  </ListGroup>
);

QuestionItem.propTypes = {
  posts: React.PropTypes.array.isRequired,
  parent_id: React.PropTypes.number,
  submitReply: React.PropTypes.func.isRequired,
};

QuestionItem.defaultProps = {
  parent_id: null,
};


export default PostList;
