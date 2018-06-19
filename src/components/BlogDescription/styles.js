export default theme => ({
  wrapper: {
    display: 'none',
    [`${theme.breakpoints.up('md')}`]: {
      background: '#ffffff',
      width: '240px',
      // height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      padding: '20px 10px',
      [`${theme.breakpoints.up('lg')}`]: {
        width: '300px',
      },
      [`${theme.breakpoints.up('xl')}`]: {
        width: '500px',
      }
    }
  },
  about: {
    textAlign: 'center',
  },
  coverAuthorImage: {
    width: '100px',
    height: '100px',
    margin: '0 auto 10px',
    borderRadius: '100%',
    overflow: 'hidden',
    backgroundColor: '#333030',
    '& img': {
      width: '100%',
      height: '100%',
      borderRadius: '50%',
      transition: 'transform 0.35s',
      '&:hover': {
        transform: 'scale3d(0.90, 0.90, 1)'
      }
    }
  },
  authorName: {
    // margin: '0 0 10px',
    fontFamily: 'Lora',
    position: 'relative',
    paddingBottom: '15px',
    fontSize: 16,
    textTransform: 'uppercase',
    color: '#333030',
    fontWeight: 600,
    // '&::after': {
    //   content: '""',
    //   position: 'absolute',
    //   left: '50%',
    //   transform: 'translateX(-50%)',
    //   bottom: 0,
    //   display: 'block',
    //   width: 7,
    //   height: 7,
    //   borderRadius: '100%',
    //   backgroundColor: '#333030'
    // }
  },
  contact: {
    '& .contactTitle': {
      position: 'relative',
      color: '#333030',
      fontWeight: 400,
      fontSize: 12,
      margin: '0 0 5px',
      textTransform: 'uppercase',
      textAlign: 'center',
      '&::before': {
        content: '""',
        display: 'block',
        height: '2px',
        width: 'calc(50% - 48px)',
        transform: 'translateY(-50%)',
        position: 'absolute',
        top: '50%',
        left: 0,
        backgroundColor: '#515151'
      },
      '&::after': {
        content: '""',
        display: 'block',
        height: 2,
        width: 'calc(50% - 48px)',
        transform: 'translateY(-50%)',
        position: 'absolute',
        top: '50%',
        right: 0,
        backgroundColor: '#515151'
      }
    },
    '& ul': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      textAlign: 'center',
      '& li': {
        display: 'inline-block',
        marginLeft: '10px',
        '&:first-child': {
          marginLeft: 0
        },
        '& a': {
          borderBottom: '0px solid transparent',
          boxShadow: 'none',
          color: '#515151',
          display: 'block',
          padding: 5,
          fontSize: 18,
          transition: 'all 350ms cubic-bezier(0.13, 0.43, 0.54, 1.82)',
          '&:hover': {
            color: '#333030',
            transform: 'scale(1.2)'
          }
        }
      }
    }
  },
  copyright: {
    fontSize: 14,
    textAlign: 'center',
    margin: 0
  },
  sidebarMenu: {
    '& ul': {
      verticalAlign: 'top',
      display: 'flex',
      flexDirection: 'column',
      marginBottom: '20px',
      padding: 16,
      listStyleType: 'none',
      '& li': {
        marginBottom: 16,

      }
    }
  }
});