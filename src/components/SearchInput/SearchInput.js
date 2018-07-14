import React from 'react';
import PropTypes from 'prop-types';
import injectSheet from 'react-jss';

const styles = theme => ({
	search: {
		width: '100%',
		'& input': {
			fontFamily: theme.typography.fontFamily,
			color: theme.typography.headline.color,
			lineHeight: '3rem',
			fontSize: '1.5rem',
			width: '100%',
			padding: '10px',
			background: '0 0',
			border: 'none',
			borderBottomColor: theme.palette.primary.main,
			outline: '0',
		},
	},
});

class SearchInput extends React.Component {
	render(){
		const { classes, placeholder } = this.props;
		return (
			<div className={classes.search}>
				<input
					type="text"
					autoFocus
					placeholder={placeholder}
				/>
			</div>
		)
	};
}

SearchInput.propTypes = {
	classes: PropTypes.object,
	placeholder: PropTypes.string,
};

export default injectSheet(styles)(SearchInput);
