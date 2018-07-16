import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import config from '../../../content/config/metadata';

const Seo = ({ node, post:isPost }) => {
	const {
		title: t,
    slug,
    cover,
    excerpt,
		description: desc,
		tags = []
	} = node;
	const { siteMetadata } = config;
	let url = config.siteMetadata.url;
	let image;
	let title;
	let description;
	let keywords = siteMetadata.keywords.join(', ');
	if (isPost) {
		title = t;
		url = `${url}/posts/${slug}`;
		description = desc ? desc : excerpt;
		image = cover;
		keywords = tags.join(', ');
	} else {
		title = siteMetadata.title;
		description = siteMetadata.description;
		image = siteMetadata.logoUrl;
		url = `${siteMetadata.url}${config.prefixPath}`;
	}
	image = `${siteMetadata.url}${config.prefixPath === "/" ? "" : config.prefixPath}${image}`
	return (
		<Helmet>
			<title>{title}</title>
			<meta name="description" content={description} />
			<meta name="image" content={image} />
			<meta name="keywords" content={keywords} />

			{/* OpenGraph Tags*/}
			<meta property="og:url" content={url} />
			{ isPost ? <meta property="og:type" content="article" /> : null }
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />

			{/* Twitter Cards */}
			<meta name="twitter:card" value="summary" />
			<meta name="twitter:site" content={siteMetadata.url} />
			<meta name="twitter:title" content={title} />
			<meta name="twitter:creator" content="@anandrikka" />
			<meta name="twitter:description" content={description} />
			<meta name="twitter:image" content={image} />

		</Helmet>
	)
}

Seo.propTypes = {
	node: PropTypes.object
};

export default Seo;
