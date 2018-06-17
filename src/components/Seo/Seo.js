import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import config from '../../content/config/metadata';

const Seo = ({ node, post:isPost }) => {
	const {
		title: t,
    slug,
    cover,
    excerpt,
		description: desc
	} = node;
	let url = config.siteMetadata.url;
	let image;
	let title;
	let description;
	if (isPost) {
		title = t;
		url = `${url}/posts/${slug}`;
		description = desc ? desc : excerpt;
		image = cover;
	} else {
		title = config.siteMetadata.title;
		description = config.siteMetadata.description;
		image = config.siteMetadata.logoUrl;
		url = `${config.siteMetadata.url}${config.prefixPath}`;
	}
	image = `${config.siteMetadata.url}${config.prefixPath === "/" ? "" : config.prefixPath}${image}`
	return (
		<Helmet>
			<meta name="description" content={description} />
			<meta name="image" content={image} />
			{/* OpenGraph Tags*/}
			<meta property="og:url" content={url} />
			{ isPost ? <meta property="og:type" content="article" /> : null }
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			{/* Twitter Cards */}
			<meta name="twitter:card" content={'summary_large_image'} />
			<meta name="twitter:creator" content={''} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />
		</Helmet>
	)
}

Seo.propTypes = {
	node: PropTypes.object
};

export default Seo;
