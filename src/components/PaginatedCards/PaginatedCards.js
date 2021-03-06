import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';
import {withRouter} from 'react-router-dom';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';

import NavButton from '../NavButton';
import PostCard from '../PostCard';

const styles = (theme) => ({
  navButtons: {
    margin: theme.spacing.unit,
    ['&.next']: {
      alignSelf: 'flex-end',
    },
  },
  navButtonsContainer: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
});

const PagiantedCards = ({
  data,
  classes,
  history,
}) => {
  const {group: nodes, index, pageCount, pathPrefix} = data;
  const hasPrev = index > 1;
  const hasNext = index < pageCount;
  let prev = '';

  if ((index - 1) !== 1) {
    prev = `${pathPrefix}/${index-1}`;
  }

  const next = `${pathPrefix}/${index+1}`;

  const gotoPost = (url) => {
    history.push(`/posts/${url}`);
  };

  const loadPage = (url) => {
    const prefix = url.substring(0, 1);
    if (prefix === '/') {
      history.push(url);
    } else {
      history.push(`/${url}`);
    }
  };

  return (
    <React.Fragment>
      {
        nodes.map((item, index) => (
          <PostCard
            postData={item.node || item}
            key={`post_card_${index}`}
            gotoPost={gotoPost}
          />
        ))
      }
      <div className={classes.navButtonsContainer}>
        { hasPrev &&
          <NavButton
            path={prev}
            Icon={NavigateBefore}
            label={'Prev'}
            onClick={loadPage}
          />
        }
        { hasNext &&
          <NavButton
            path={next}
            Icon={NavigateNext}
            label={'Next'}
            onClick={loadPage}
          />
        }
      </div>
    </React.Fragment>
  );
};

PagiantedCards.propTypes = {
  classes: PropTypes.object,
  history: PropTypes.object,
  data: PropTypes.object,
};

export default withRouter(injectSheet(styles)(PagiantedCards));
