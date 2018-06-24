import React from 'react';
import { Scrollbars } from 'react-custom-scrollbars';
import { SpringSystem, MathUtil } from 'rebound';
import { forceCheck } from 'react-lazyload';
import { connect } from 'react-redux';

import { setScrollToTop } from '../../../store';

class Scrollbar extends React.Component {

  componentDidUpdate(prevProps) {
    const { scrollToTop, setScrollToTop } = this.props;
    const { scrollToTop: prevScrollToTop } = prevProps;
    if (scrollToTop && scrollToTop !== prevScrollToTop) {
      this.scrollTop(0);
      setScrollToTop(false);
    }
  }

  componentDidMount() {
    this.springSystem = new SpringSystem();
    this.spring = this.springSystem.createSpring();
    this.spring.addListener({ onSpringUpdate: this.handleSpringUpdate })
  }

  componentWillUnmount() {
    this.springSystem.deregisterSpring(this.spring);
    this.springSystem.removeAllListeners();
    this.spring.destroy();
    this.springSystem = null;
    this.spring = null;
  }

  scrollTop(top) {
    const scrollTop = this.scrollbars.getScrollTop();
    const scrollHeight = this.scrollbars.getScrollHeight();
    const val = MathUtil.mapValueInRange(
      top,
      0,
      scrollHeight,
      scrollHeight * 0.01,
      scrollHeight * 0.99
    );
    this.spring.setCurrentValue(scrollTop).setAtRest();
    this.spring.setEndValue(val);
  }

  handleSpringUpdate = (spring) => {
    window.requestAnimationFrame(() => {
      this.scrollbars.scrollTop(spring.getCurrentValue());
    });
  }

  render() {
    const { children, forceCheckOnScroll } = this.props;
    return (
      <Scrollbars
        autoHide
        universal={true}
        onScroll={forceCheckOnScroll && forceCheck }
        ref={
          c => { this.scrollbars = c }
        }
      >
        { children }
      </Scrollbars>
    )
  }
}

const mapStateToProps = state => ({
  scrollToTop: state.scrollToTop,
});

const mapDispatchToProps = dispatch => ({
  setScrollToTop: (falg) => { dispatch(setScrollToTop(falg)) }
});

export default connect(mapStateToProps, mapDispatchToProps)(Scrollbar);
