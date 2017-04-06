import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';
import 'static/css/font-awesome.css';
import PostItem from './postItem';

const listGroupItemStyle = {
  borderRadius: 5,
  border: '1px solid #888',
  boxShadow: '0px 5px 35px rgba(0, 0, 0, .7)',
  padding: '0px 0px',
  marginLeft: '30px',
  marginRight: '30px',
  marginBottom: '30px',
  paddingBottom: '5px',
};

const newStyle = {
  border: '0px',
  padding: '0px 0px',
  width: '100%',
};

const PostList = ({ posts, parent_id, ...props }) => (
  <ListGroup style={{ width: '100%' }}>
    {
      posts.filter(post => (post.parent_post === parent_id))
        .map(post => (
          <ListGroupItem key={post.id} style={newStyle}>
            <PostItem post={post} posts={posts} {...props} />
          </ListGroupItem>
        ))
    }
  </ListGroup>
);

PostList.propTypes = {
  posts: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,
  parent_id: React.PropTypes.number,
};

PostList.defaultProps = {
  parent_id: null,
};


export default PostList;
