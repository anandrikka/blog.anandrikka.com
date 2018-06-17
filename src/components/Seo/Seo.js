import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import config from '../../content/config/metadata';

const Seo = ({ data }) => {
	const {
		title,
		description,
		cover,
		slug
	} = data
	const { siteMetadata: site } = config;
	const url = `${site.url}${slug}`
	const image = cover ? cover : site.image
	return (
		<Helmet
			htmlAttributes={{
				lang: site.lang,
				prefix: 'og: http://ogp.me/ns#'
			}}
		>
			<title>{title}</title>
			<meta name="description" content={description} />
			{/* Open Graph Tags */}
			<meta property="og:url" content={url} />
			<meta property="og:title" content={title} />
			<meta property="og:description" content={description} />
			<meta property="og:image" content={image} />
			<meta property="og:type" content="website" />
		</Helmet>
	)
}

Seo.propTypes = {
	data: PropTypes.object
};

export default Seo;
