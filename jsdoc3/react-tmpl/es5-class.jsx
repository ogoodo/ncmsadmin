var RadioInput = React.createClass({

    // 1.添加动态属性
    propTypes: {
        name: React.PropTypes.string.isRequired,
        value: React.PropTypes.string.isRequired,
        checked: React.PropTypes.bool,
        onChanged: React.PropTypes.func.isRequired
    },

    // 2.为非必要属性定义其默认值
    getDefaultProps: function() {
        return {
            checked: false
        }
    },

    // 3.追踪状态，组件需要记录随时间而变化的数据
    getInitialState: function() {
        var name = this.props.name ? this.props.name:uniqueId('radio-');
        return {
            checked: !!this.props.checked,
            name: name
        }
    },

    // 4.追踪当前组件的状态变更，并通过this.props.onChanged通知给父组件
    handleChanged:function(e) {
        var checked = e.target.checked;
        this.setState({checked:checked});
        if(checked) {
            this.props.onChanged(this.props.value);
        }
    },

    render:function() {
        return(
            <div className="radio">
                <label htmlFor={this.props.id}>
                    <input type="radio" 
                        name={this.props.name} 
                        value={this.props.value}
                        checked={this.props.checked}
                        onChange={this.handleChanged} />
                    {this.props.value}
                </label>
            </div>
        );
    }
});

module.exports = RadioInput;

