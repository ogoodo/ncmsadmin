function HelloMessageB(props) {
  return <div>Hello {props.name}</div>;
}
ReactDOM.render(<HelloMessageB name="Sebastian" />, mountNode);

const HelloMessage = (props) => <div>Hello {props.name}</div>;
ReactDOM.render(<HelloMessage name="Sebastian" />, mountNode);

