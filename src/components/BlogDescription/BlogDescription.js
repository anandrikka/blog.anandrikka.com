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
import PersonIcon from '@material-ui/icons/Person';
import HomeIcon from '@material-ui/icons/Home';
import SearchIcon from '@material-ui/icons/Search';

import profileImg from '../../assets/img/covers/profile.jpeg';
import metadata from '../../content/config/metadata';
import styles from './styles';

class Profile extends React.Component {
  render() {
    const { classes }  = this.props;
    return (
      <aside className={classes.wrapper}>
        <header>
          <div className={classes.about}>
            <div className={classes.coverAuthorImage}>
              <img src={profileImg} className={classes.img} />
            </div>
            <div className={classes.authorName}>Anand Reddy Rikka</div>
            <div className={classes.contact}>
              <ul>
                {metadata.siteMetadata.social.map((item, index) => (
                  <li key={`social_${index}`} className="icon"><a className={item.icon} target="_blank" href={item.url}></a></li>
                ))}
              </ul>
            </div>
            <small>I am a web developer focusing on full stack web development. Always hungry to keep learning.</small>
          </div>
        </header>
        <div className={classes.sidebarMenu}>
          <List component="nav">
            <ListItem button>
              <ListItemIcon>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItem>
            <ListItem button>
              <ListItemIcon>
                <SearchIcon />
              </ListItemIcon>
              <ListItemText primary="Search" />
            </ListItem>
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
        </div>
        <footer>
          {/*<section className={classes.contact}>
            <div className="contactTitle">Contact Me</div>
            <ul>
              {metadata.siteMetadata.social.map((item, index) => (
                <li key={`social_${index}`} className="icon"><a className={item.icon} target="_blank" href={item.url}></a></li>
              ))}
            </ul>
          </section>*/}
          <div className={classes.copyright}>
            2018 &copy; Anand Reddy Rikka
          </div>
        </footer>
      </aside>
    )
  }
}

export default injectSheet(styles)(Profile);
