import React from 'react';
import { Button, Grid, Row, Col } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import InputForm from './inputForm';
import PostList from './postList';

const PostItem = ({
  post,
  color,
  submitLike,
  submitReply,
  submitDelete,
  ...props
}) => (
  <div
    style={{
      padding: '10px',
      backgroundColor: color,
    }}
  >
    <Grid>
      <Row className="show-grid">
        <Col xs={8} md={8}>{
          <div>
            <p>
              <FontAwesome name="user" />
                &nbsp;
              <b>{ post.user }</b>
            </p>
            <p>
                &nbsp;
                &nbsp;
              { post.text }
            </p>
            <Button
              onClick={event => (submitLike(event,post.id))}
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

            {(window.django2react.moderator_mode=='true' || window.django2react.my_uname==post.user) &&
                <Button bsStyle="danger" onClick={event => (submitDelete(event,post.id))}>
                    Delete
                    &nbsp;
                    <FontAwesome name="remove-circle" />
                </Button>
            }

          </div>}</Col>
        <Col xs={4} md={4}>{
          <p>
            <FontAwesome name="clock-o" />
                &nbsp;
              {post.datetime.substr(0,19)}
          </p>}</Col>

      </Row>
    </Grid>
    <InputForm
      onSubmit={submitReply}
      id={`replyTo${post.id}`}
      placeholder={'Enter reply'}
      submitButtonText={'Submit Reply'}
      onSubmitExtras={{ postId: post.id }}
    />

    <PostList
        submitLike={submitLike}
        submitReply={submitReply}
        submitDelete={submitDelete}
        parent_id={post.id}
        {...props}/>

  </div>
);
PostItem.propTypes = {
  post: React.PropTypes.shape({
    id: React.PropTypes.number,
    user: React.PropTypes.string,
    body: React.PropTypes.string,
  }).isRequired,
  color: React.PropTypes.string,
  submitLike: React.PropTypes.func.isRequired,
  submitReply: React.PropTypes.func.isRequired,
  submitDelete: React.PropTypes.func.isRequired,
};

PostItem.defaultProps = {
  color: '#fff',
};
export default PostItem;