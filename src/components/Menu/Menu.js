import React from 'react';
import injectSheet from 'react-jss';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import BookmarkIcon from '@material-ui/icons/Bookmark';
import FlagIcon from '@material-ui/icons/Flag';
import RssIcon from '@material-ui/icons/RssFeed';
import ArchiveIcon from '@material-ui/icons/Archive';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';
import Hidden from '@material-ui/core/Hidden';

const styles = theme => ({

});

const Menu = ({ classes, history }) => {
  console.log(history);
  return (
    <List>
      <ListItem button>
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Home" />
      </ListItem>
      <Hidden mdDown>
        <ListItem button>
          <ListItemIcon>
            <SearchIcon />
          </ListItemIcon>
          <ListItemText primary="Search" />
        </ListItem>
      </Hidden>
      <ListItem button>
        <ListItemIcon>
          <BookmarkIcon />
        </ListItemIcon>
        <ListItemText primary="Categories" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <FlagIcon />
        </ListItemIcon>
        <ListItemText primary="Tags" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <ArchiveIcon />
        </ListItemIcon>
        <ListItemText primary="Archives" />
      </ListItem>
      <ListItem button>
        <ListItemIcon>
          <RssIcon />
        </ListItemIcon>
        <ListItemText primary="Rss Feed" />
      </ListItem>
    </List>
  )
}

export default injectSheet(styles)(Menu);
