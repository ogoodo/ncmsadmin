

export class Counter extends React.Component {
  constructor(props) {
    super(props);
    // 3.追踪状态，组件需要记录随时间而变化的数据
    this.state = {count: props.initialCount};
  }
  tick() {
    this.setState({count: this.state.count + 1});
  }
  render() {
    return (
      <div onClick={this.tick.bind(this)}>
        Clicks: {this.state.count}
      </div>
    );
  }
}
// 参考: https://facebook.github.io/react/docs/reusable-components.html#prop-validation
// 1.添加动态属性
Counter.propTypes = { initialCount: React.PropTypes.number };
// 2.为非必要属性定义其默认值
Counter.defaultProps = { initialCount: 0 };


