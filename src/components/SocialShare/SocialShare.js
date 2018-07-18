import React from 'react';
import injectSheet from 'react-jss';
import {
  FacebookShareButton,
  GooglePlusShareButton,
  LinkedinShareButton,
  TwitterShareButton,
  RedditShareButton,
  FacebookShareCount,
  GooglePlusShareCount,
  LinkedinShareCount,
  RedditShareCount,
  FacebookIcon,
  TwitterIcon,
  GooglePlusIcon,
  LinkedinIcon,
  RedditIcon,
  WhatsappShareButton,
  WhatsappIcon,
} from 'react-share';
import config from '../../../content/config/metadata';

const styles = theme => ({
  wrapper: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'flex-start',
    margin: '15px 0',
    '& div': {
      margin: '5px 5px',
      [`${theme.breakpoints.up('md')}`]: {
        margin: '5px 15px'
      }
    },
    '& .share-count': {
      textAlign: 'center'
    }
  }
});

class SocialShare extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      iconSize: 36
    };
  }

  componentDidMount() {
    this.resizeListener = window.addEventListener('resize', () => {
      let iconSize = 24;
      if (window.innerWidth > 800) {
        iconSize = 48;
      } else if (window.innerWidth > 480 && window.innerWidth <= 800) {
        iconSize = 32;
      }
      this.setState({
        iconSize
      });
    });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resizeListener);
  }

  render() {
    const { node, path, classes } = this.props;
    const { iconSize } = this.state;
    const { frontmatter: { title }, excerpt } = node;
    const url = `${config.siteMetadata.url}${config.prefixPath}/${path}`;
    const filter = count => count > 0 ? count : '';
    return (
      <div className={classes.wrapper}>
        <RedditShareButton url={url} title={title}>
          <RedditIcon round size={iconSize} />
          <RedditShareCount url={url}>
            {count => <div className="share-count">{filter(count)}</div>}
          </RedditShareCount>
        </RedditShareButton>
        <GooglePlusShareButton url={url}>
          <GooglePlusIcon round size={iconSize} />
          <GooglePlusShareCount url={url}>
            {count => <div className="share-count">{filter(count)}</div>}
          </GooglePlusShareCount>
        </GooglePlusShareButton>
        <FacebookShareButton url={url} quote={excerpt}>
          <FacebookIcon round size={iconSize} />
          <FacebookShareCount url={url}>
            {count => <div className="share-count">{filter(count)}</div>}
          </FacebookShareCount>
        </FacebookShareButton>
        <LinkedinShareButton
          url={url}
          description={excerpt}
        >
          <LinkedinIcon round size={iconSize} />
          <LinkedinShareCount url={url}>
            {count => <div className="share-count">{filter(count)}</div>}
          </LinkedinShareCount>
        </LinkedinShareButton>
        <WhatsappShareButton url={url}>
          <WhatsappIcon round size={iconSize} />
        </WhatsappShareButton>
        <TwitterShareButton url={url}>
          <TwitterIcon round size={iconSize} />
        </TwitterShareButton>
      </div>
    )
  }
}

export default injectSheet(styles)(SocialShare);
