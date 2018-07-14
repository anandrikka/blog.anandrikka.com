import React from 'react';
import injectSheet from 'react-jss';

import Menu from '../Menu';

import profileImg from '../../assets/img/covers/profile.jpeg';
import metadata from '../../../content/config/metadata';
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
          <Menu />
        </div>
        <footer>
          <div className={classes.copyright}>
            2018 &copy; Anand Reddy Rikka
          </div>
        </footer>
      </aside>
    )
  }
}

export default injectSheet(styles)(Profile);
