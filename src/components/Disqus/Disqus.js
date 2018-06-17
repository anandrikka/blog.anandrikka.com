import React from 'react';
import ReactDisqus from 'react-disqus-comments';
import injectSheet from 'react-jss';
import config from '../../content/config/metadata';

const styles = theme => ({
  wrapper: {
    marginTop: 20
  }
});

const DisqusComments = ({
  classes,
  identifier,
  title,
  url,
  categoryId
}) => (
  <div className={classes.wrapper}>
    <ReactDisqus
      shortname={config.disqusShortname}
      identifier={identifier}
      title={title}
      url={url}
      category_id={categoryId}
    />
  </div>
)

export default injectSheet(styles)(DisqusComments);
