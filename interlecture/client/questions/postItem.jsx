import React from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import InputForm from './inputForm';
import PostList from './postList';

function buttonStyle(color) {
  return {
    border: '0px',
    backgroundColor: 'transparent',
    color,
  };
}

const tooltipForLike = (
  <Tooltip id="tooltipForLike">Like this post</Tooltip>
);
const tooltipForReply = (
  <Tooltip id="tooltipForReply">Reply to this post</Tooltip>
);
const tooltipForDelete = (
  <Tooltip id="tooltipForDelete">Delete this post</Tooltip>
);

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
    <div style={{ float: 'left', width: '20px', height: '50px', backgroundColor: '#a33' }} />
    <div style={{ float: 'right', width: '170px', marginRight: '10px' }} >
      <OverlayTrigger placement="top" overlay={tooltipForLike}>
        <Button
          onClick={event => (submitLike(event, post.id))}
          style={buttonStyle('#280')}
        >
          &nbsp;
          <FontAwesome name="thumbs-up" size="2x" />
          &nbsp;
          {
            post.supporters ?
            post.supporters :
            null
          }
        </Button>
      </OverlayTrigger>
      <OverlayTrigger placement="top" overlay={tooltipForReply}>
        <Button
          style={buttonStyle('#33a')}
        >
          &nbsp;
          <FontAwesome name="reply" size="2x" />
        </Button>
      </OverlayTrigger>
      {(window.django2react.moderator_mode === 'true' || window.django2react.my_uname === post.user) &&
        <OverlayTrigger placement="top" overlay={tooltipForDelete}>
          <Button
            onClick={event => (submitDelete(event, post.id))}
            style={buttonStyle('#a33')}
          >
            <FontAwesome name="remove" size="2x" />
          </Button>
        </OverlayTrigger>
      }
    </div>
    <div
      style={{
        overflow: 'hidden',
        paddingLeft: '0.5rem',
      }}
    >
      <div style={{ width: '100%', backgroundColor: '#a99' }} >
        <div style={{ float: 'left' }}>
          <FontAwesome name="user" />
          &nbsp;
          <b>{ post.user }</b>
        </div>
        <div style={{ float: 'left', marginLeft: '40px' }}>
          <FontAwesome name="clock-o" />
          &nbsp;
          {post.datetime.substr(0, 19)}
        </div>
        <div style={{ width: '100%', display: 'inline-block' }}>
          <div style={{ float: 'left' }}>
            { post.text }
          </div>
        </div>
      </div>
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
//
// <div style={{ float: 'right' }}>
//   <div style={{ width: '100%' }}>
//     <div style={{ width: '100%' }}>
//       <InputForm
//         onSubmit={submitReply}
//         id={`replyTo${post.id}`}
//         placeholder={'Enter reply'}
//         submitButtonText={'Submit Reply'}
//         onSubmitExtras={{ postId: post.id }}
//         />
//     </div>
//   </div>
//   <PostList
//     submitLike={submitLike}
//     submitReply={submitReply}
//     submitDelete={submitDelete}
//     parent_id={post.id}
//     {...props}
//     />
// </div>
// <div
//   style={{
//     overflow: 'hidden',
//     paddingRight: '0.5rem',
//   }}
//   >
//   <div
//     style={{
//       backgroundColor: '#a53',
//       width: '50px',
//     }}
//     />
// </div>
