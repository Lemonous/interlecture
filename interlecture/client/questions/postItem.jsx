import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import InputForm from './inputForm';
import PostList from './postList';

const PostItem = ({
  post,
  submitLike,
  submitReply,
  submitDelete,
  ...props
}) => (
  <div
    style={{
      width: '100%',
    }}
  >
    <div style={{ float: 'right' }}>
      <div style={{ width: '100%' }}>
        <div style={{ float: 'left' }}>
          <FontAwesome name="user" />
          &nbsp;
          <b>{ post.user }</b>
        </div>
        <div style={{ float: 'right' }}>
          <p>
            <FontAwesome name="clock-o" />
            &nbsp;
            {post.datetime.substr(0, 19)}
          </p>
        </div>
        <div style={{ width: '100%' }}>
          <div style={{ float: 'left' }}>
            { post.text }
          </div>
          <div style={{ float: 'right' }} />
          <Button
            onClick={event => (submitLike(event, post.id))}
          >
            Like
            &nbsp;
            <FontAwesome name="thumbs-up" />
            {post.supporters}
          </Button>
          <Button>
            Reply
            &nbsp;
            <FontAwesome name="reply" />
          </Button>

          {(window.django2react.moderator_mode === 'true' || window.django2react.my_uname === post.user) &&
            <Button bsStyle="danger" onClick={event => (submitDelete(event, post.id))}>
              Delete
              &nbsp;
              <FontAwesome name="remove-circle" />
            </Button>
          }
        </div>
        <div style={{ width: '100%' }}>
          <InputForm
            onSubmit={submitReply}
            id={`replyTo${post.id}`}
            placeholder={'Enter reply'}
            submitButtonText={'Submit Reply'}
            onSubmitExtras={{ postId: post.id }}
          />
        </div>
      </div>
      <PostList
        submitLike={submitLike}
        submitReply={submitReply}
        submitDelete={submitDelete}
        parent_id={post.id}
        {...props}
      />
    </div>
    <div
      style={{
        overflow: 'hidden',
        paddingRight: '0.5rem',
      }}
    >
      <div
        style={{
          backgroundColor: '#a53',
          width: '50px',
        }}
      />
    </div>
  </div>
);
PostItem.propTypes = {
  post: React.PropTypes.shape({
    id: React.PropTypes.number,
    user: React.PropTypes.string,
    body: React.PropTypes.string,
  }).isRequired,
  submitLike: React.PropTypes.func.isRequired,
  submitReply: React.PropTypes.func.isRequired,
  submitDelete: React.PropTypes.func.isRequired,
};

PostItem.defaultProps = {
};
export default PostItem;
