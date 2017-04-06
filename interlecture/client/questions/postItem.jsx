import React from 'react';
import { Button, Tooltip, OverlayTrigger } from 'react-bootstrap';
import FontAwesome from 'react-fontawesome';
import InputForm from './inputForm';
import PostList from './postList';

function buttonStyle(color) {
  return {
    color,
    border: '0px',
    backgroundColor: 'transparent',
    float: 'right',
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

function getBorder(level) {
  if (level > 4) {
    return 'rbg(140, 0, 0)';
  }
  return `10px solid rgb(${220 - (20 * level)}, ${160 - (40 * level)}, 0)`;
}

// <div style={{ float: 'left', width: '10px', height: '100px', backgroundColor: '#a33' }} />
const PostItem = ({
  post,
  submitLike,
  submitReply,
  submitDelete,
  level,
  ...props
}) => (
  <div
    style={{
      width: '100%',
    }}
  >
    <div
      style={{
        borderLeft: getBorder(level),
        borderBottomLeftRadius: '15px',
        borderTopLeftRadius: '5px',
        paddingLeft: '8px',
        marginBottom: '5px',
        overflow: 'hidden',
      }}
    >
      <div style={{ float: 'right', width: '190px' }} >
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
        <OverlayTrigger placement="top" overlay={tooltipForReply}>
          <Button
            style={buttonStyle('#33a')}
          >
            &nbsp;
            <FontAwesome name="reply" size="2x" />
          </Button>
        </OverlayTrigger>
        <OverlayTrigger placement="top" overlay={tooltipForLike}>
          <Button
            onClick={event => (submitLike(event, post.id))}
            style={buttonStyle('#280')}
          >
            { post.supporters ?
              <b style={{ fontSize: '20px', marginRight: '10px' }}>
                {post.supporters}
              </b>
              : null
            }
            <FontAwesome name="thumbs-up" size="2x" />
            &nbsp;
          </Button>
        </OverlayTrigger>
      </div>
      <div
        style={{
          overflow: 'hidden',
          paddingLeft: '0.5rem',
        }}
      >
        <div style={{ width: '100%' }} >
          <div style={{ float: 'left' }}>
            <b>{ post.user }</b>
          </div>
          <div style={{ float: 'left', marginLeft: '40px', color: '#999' }}>
            {post.datetime.substr(0, 16)}
          </div>
          <div style={{ width: '100%', display: 'inline-block' }}>
            <div style={{ float: 'left' }}>
              { post.text }
            </div>
          </div>
        </div>
      </div>
      <PostList
        submitLike={submitLike}
        submitReply={submitReply}
        submitDelete={submitDelete}
        parent_id={post.id}
        level={level + 1}
        {...props}
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
  level: React.PropTypes.number,
};

PostItem.defaultProps = {
  level: 0,
};
export default PostItem;

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
