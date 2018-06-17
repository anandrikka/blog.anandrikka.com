import React from 'react';
import PropTypes from 'prop-types';
import config from '../../content/config/metadata';

const SHORT_NAME = config.disqusShortname
const WEBSITE_URL = config.siteMetadata.url

const renderDisqus = () => {
  if (!window.DISQUS) {
    const script = document.createElement('script');
    script.async = true;
    script.src = `https://${SHORT_NAME}.disqus.com/embed.js`;
    document.getElementsByTagName('head')[0].appendChild(script);
  } else {
    window.DISQUS.reset({ reload: true });
  }
}

class DisqusComments extends React.Component {
  shouldComponentUpdate(nextProps) {
    return (
      this.props.id !== nextProps.id ||
      this.props.title !== nextProps.title ||
      this.props.identifier !== nextProps.identifier ||
      this.props.url !== nextProps.url
    );
  }

  componentDidMount() {
    renderDisqus();
  }

  componentDidUpdate() {
    renderDisqus()
  }

  render() {
    const { identifier, title, url } = this.props;
    if (process.env.BROWSER) {
      window.disqus_shortname = SHORT_NAME;
      window.disqus_identifier = identifier;
      window.disqus_title = title;
      window.disqus_url = WEBSITE_URL + url;
    }
    return (
      <div id="disqus_thread" />
    )
  }

}

DisqusComments.propTypes = {
  title: PropTypes.string,
  identifier: PropTypes.string,
  url: PropTypes.string,
}

export default DisqusComments;
