import _classCallCheck from "@babel/runtime/helpers/esm/classCallCheck";
import _createClass from "@babel/runtime/helpers/esm/createClass";
import _possibleConstructorReturn from "@babel/runtime/helpers/esm/possibleConstructorReturn";
import _getPrototypeOf from "@babel/runtime/helpers/esm/getPrototypeOf";
import _inherits from "@babel/runtime/helpers/esm/inherits";
import React, { Component } from 'react';
import cronstrue from 'cronstrue/i18n';
import Once from './once';
import Minutes from './minutes';
import Daily from './daily';
import Hourly from './hourly';
import Weekly from './weekly';
import Monthly from './monthly';
import Yearly from './yearly';
import { Card, CardBody, Nav, NavItem, NavLink, Jumbotron, Alert } from 'reactstrap';
var defaultTabs = ['Once', 'Minutes', 'Hourly', 'Daily', 'Weekly', 'Monthly']; //,'Yearly'

var date = new Date();
var defaultTabsVal = {
  'Once': [//Now
  '0', '0', (date.getHours() < 23 ? date.getHours() + 1 : 23).toString(), date.getDate().toString(), (date.getMonth() + 1).toString(), '?', date.getFullYear().toString()],
  'Minutes': ['0', '0/1', '*', '*', '*', '?', '*'],
  'Hourly': ['0', '0', '0/1', '*', '*', '?', '*'],
  'Daily': ['0', '0', '00', '1/1', '*', '?', '*'],
  'Weekly': ['0', '0', '00', '?', '*', '*', '*'],
  'Monthly': ['0', '0', '00', '1', '1/1', '?', '*']
};
var tabs = [];

var CustomCron =
/*#__PURE__*/
function (_Component) {
  _inherits(CustomCron, _Component);

  function CustomCron(props) {
    var _this;

    _classCallCheck(this, CustomCron);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(CustomCron).call(this, props));
    _this.state = {};
    tabs = props.tabs || defaultTabs;
    return _this;
  }

  _createClass(CustomCron, [{
    key: "componentWillMount",
    value: function componentWillMount() {
      if (!this.props.value || this.props.value.split(' ').length !== 7) {
        this.state.value = defaultTabsVal[tabs[0]];
        this.state.selectedTab = tabs[0];
        this.parentChange(this.state.value);
      } else {
        this.state.value = this.props.value.replace(/,/g, '!').split(' ');
      }

      var val = this.state.value;

      if (val[6] !== '*') {
        this.state.selectedTab = defaultTabs[0];
      } else if (val[1].search('/') !== -1 && val[2] == '*' && val[3] == '1/1') {
        this.state.selectedTab = defaultTabs[1];
      } else if (val[2].search('/') !== -1) {
        this.state.selectedTab = defaultTabs[2];
      } else if (val[3].search('/') !== -1 || val[5] == 'MON-FRI') {
        this.state.selectedTab = defaultTabs[3];
      } else if (val[3] === '?') {
        this.state.selectedTab = defaultTabs[4];
      } else if (val[3].startsWith('L') || val[5] === '1/1') {
        this.state.selectedTab = defaultTabs[5];
      } else {
        this.state.selectedTab = tabs[0];
      }
    }
  }, {
    key: "defaultValue",
    value: function defaultValue(tab) {
      return defaultTabsVal[tab];
    }
  }, {
    key: "tabChanged",
    value: function tabChanged(tab) {
      this.setState({
        selectedTab: tab,
        value: this.defaultValue(tab)
      });
      this.parentChange(this.defaultValue(tab));
    }
  }, {
    key: "getHeaders",
    value: function getHeaders() {
      var _this2 = this;

      return tabs.map(function (d) {
        return React.createElement(NavItem, {
          key: "navItem-".concat(d)
        }, React.createElement(NavLink, {
          key: "navLink-".concat(d),
          onClick: _this2.tabChanged.bind(_this2, d),
          active: _this2.state.selectedTab === d
        }, d));
      });
    }
  }, {
    key: "onValueChange",
    value: function onValueChange(val) {
      if (val && val.length) {
        this.setState({
          value: val
        });
      } else {
        this.setState({
          value: ['0', '0', '00', '*', '*', '?', '*']
        });
        val = ['0', '0', '00', '*', '*', '?', '*'];
      }

      this.parentChange(val);
    }
  }, {
    key: "parentChange",
    value: function parentChange(val) {
      var newVal = '';
      newVal = val.toString().replace(/,/g, ' ');
      newVal = newVal.replace(/!/g, ',');
      console.log(newVal);
      this.props.onChange(newVal);
    }
  }, {
    key: "getVal",
    value: function getVal() {
      var val = cronstrue.toString(this.state.value.toString().replace(/,/g, ' ').replace(/!/g, ','), {
        locale: "en-US"
      });

      if (val.search('undefined') === -1) {
        return val;
      }

      return '-';
    }
  }, {
    key: "getComponent",
    value: function getComponent(tab) {
      switch (tab) {
        case defaultTabs[0]:
          return React.createElement(Once, {
            key: "nav-".concat(tab),
            value: this.state.value,
            hours: this.props.hours,
            minutes: this.props.minutes,
            onChange: this.onValueChange.bind(this)
          });

        case defaultTabs[1]:
          return React.createElement(Minutes, {
            key: "nav-".concat(tab),
            value: this.state.value,
            onChange: this.onValueChange.bind(this)
          });

        case defaultTabs[2]:
          return React.createElement(Hourly, {
            key: "nav-".concat(tab),
            value: this.state.value,
            hours: this.props.hours,
            minutes: this.props.minutes,
            onChange: this.onValueChange.bind(this)
          });

        case defaultTabs[3]:
          return React.createElement(Daily, {
            key: "nav-".concat(tab),
            value: this.state.value,
            hours: this.props.hours,
            minutes: this.props.minutes,
            onChange: this.onValueChange.bind(this)
          });

        case defaultTabs[4]:
          return React.createElement(Weekly, {
            key: "nav-".concat(tab),
            value: this.state.value,
            hours: this.props.hours,
            minutes: this.props.minutes,
            onChange: this.onValueChange.bind(this)
          });

        case defaultTabs[5]:
          return React.createElement(Monthly, {
            key: "nav-".concat(tab),
            value: this.state.value,
            hours: this.props.hours,
            minutes: this.props.minutes,
            onChange: this.onValueChange.bind(this)
          });

        case defaultTabs[6]:
          return React.createElement(Yearly, {
            key: "nav-".concat(tab),
            value: this.state.value,
            hours: this.props.hours,
            minutes: this.props.minutes,
            onChange: this.onValueChange.bind(this)
          });

        default:
          return;
      }
    }
  }, {
    key: "resultText",
    value: function resultText() {
      if (this.props.showResultText || this.props.showResultCron) {
        return React.createElement("div", null, React.createElement("hr", {
          className: "my-4"
        }), React.createElement(Alert, {
          color: "success"
        }, this.props.showResultText && React.createElement("p", null, this.getVal()), this.props.showResultCron && React.createElement("hr", null), this.props.showResultCron && React.createElement("p", {
          className: "mb-0"
        }, this.state.value.toString().replace(/,/g, ' ').replace(/!/g, ','))));
      }
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement("div", null, this.props.style && React.createElement("style", null, this.props.style), React.createElement(Nav, {
        tabs: true,
        key: "tabs"
      }, this.getHeaders()), React.createElement(Card, {
        key: "cont"
      }, React.createElement(CardBody, {
        key: "contBody"
      }, this.getComponent(this.state.selectedTab), this.resultText())));
    }
  }]);

  return CustomCron;
}(Component);

export { CustomCron as default };