import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _assertThisInitialized from "@babel/runtime/helpers/esm/assertThisInitialized";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import { Card, CardBody, Label, FormGroup, Input, Form, CustomInput } from 'reactstrap';

var CustomCron =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomCron, _Component);

  function CustomCron(props) {
    var _this;

    _classCallCheck(this, CustomCron);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomCron).call(this, props));
    _this.state = {};
    _this.onHourChange = _this.onHourChange.bind(_assertThisInitialized(_this));
    _this.onAtHourChange = _this.onAtHourChange.bind(_assertThisInitialized(_this));
    _this.onAtMinuteChange = _this.onAtMinuteChange.bind(_assertThisInitialized(_this));
    return _this;
  }

  _createClass(CustomCron, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      this.state.value = this.props.value;

      if (this.state.value[2].search('0/') === 0 || this.state.value[2] === '*') {
        this.state.every = true;
      }
    }
  }, {
    key: "onHourChange",
    value: function onHourChange(e) {
      if (this.state.every && (e.target.value > 0 && e.target.value < 24 || e.target.value == '')) {
        var val = ['0', '0', '*', '*', '*', '?', '*'];

        if (e.target.value == '') {
          val[2] = '';
        } else {
          val[2] = "0/".concat(e.target.value);
        }

        this.props.onChange(val);
      }
    }
  }, {
    key: "onAtHourChange",
    value: function onAtHourChange(e) {
      var val = ['0', this.state.value[1], '*', '*', '*', '?', '*'];
      val[2] = "".concat(e.target.value, "/1");
      this.props.onChange(val);
    }
  }, {
    key: "onAtMinuteChange",
    value: function onAtMinuteChange(e) {
      var val = ['0', '*', this.state.value[2], '*', '*', '?', '*'];
      val[1] = "".concat(e.target.value);
      this.props.onChange(val);
    }
  }, {
    key: "render",
    value: function render() {
      var _this2 = this;

      this.state.value = this.props.value;
      return React.createElement(Card, null, React.createElement(CardBody, null, React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, {
        check: true
      }, React.createElement(Label, {
        check: true
      }, React.createElement(CustomInput, {
        id: "c/h",
        type: "radio",
        value: "1",
        onClick: function onClick(e) {
          _this2.setState({
            every: true
          });

          _this2.props.onChange(['0', '0', '0/1', '*', '*', '?', '*']);
        },
        checked: this.state.every ? true : false,
        name: "HourlyRadio"
      }), ' ', "Each \xA0", React.createElement("input", {
        className: "form-control",
        disabled: this.state.every ? false : true,
        type: "Number",
        onChange: this.onHourChange,
        value: this.state.value[2].split('/')[1] ? this.state.value[2].split('/')[1] : ''
      }), "\xA0 Hour(s)"))), React.createElement("hr", null), React.createElement(Form, {
        inline: true
      }, React.createElement(FormGroup, {
        className: "mr-sm-4 ",
        check: true
      }, React.createElement(Label, {
        check: true,
        className: "mr-sm-2"
      }, React.createElement(CustomInput, {
        id: "hours",
        type: "radio",
        onClick: function onClick(e) {
          _this2.setState({
            every: false
          });

          _this2.props.onChange();
        },
        checked: this.state.every ? false : true,
        name: "HourlyRadio"
      }), ' ', "Start time"), React.createElement(Input, {
        type: "select",
        name: "hours",
        disabled: this.state.every ? true : false,
        onChange: this.onAtHourChange,
        value: this.state.value[2].split('/')[0] ? this.state.value[2].split('/')[0] : '00'
      }, this.getHours())), React.createElement(FormGroup, {
        className: "mr-sm-4 "
      }, React.createElement(Input, {
        type: "select",
        name: "minutes",
        disabled: this.state.every ? true : false,
        onChange: this.onAtMinuteChange,
        value: this.state.value[1]
      }, this.getMinutes())))));
    }
  }, {
    key: "getHours",
    value: function getHours() {
      var hours = [];
      var leap = parseInt(this.props.hours) || 1;

      for (var i = 0; i < 24; i = i + leap) {
        hours.push(React.createElement("option", {
          value: i < 10 ? "0".concat(i) : i
        }, i < 10 ? "0".concat(i) : i));
      }

      return hours;
    }
  }, {
    key: "getMinutes",
    value: function getMinutes() {
      var minutes = [];
      var leap = parseInt(this.props.minutes) || 1;

      for (var i = 0; i < 60; i = i + leap) {
        minutes.push(React.createElement("option", {
          value: i < 10 ? "0".concat(i) : i
        }, i < 10 ? "0".concat(i) : i));
      }

      return minutes;
    }
  }]);

  return CustomCron;
}(Component);

export { CustomCron as default };