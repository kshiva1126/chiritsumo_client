import * as React from 'react';
import { PluginComponent } from 'react-markdown-editor-lite';
import Icon from './Icon'

export default class ModeToggleCust extends PluginComponent {
  static pluginName = 'mode-toggle-cust';
  static align = 'right';

  get isDisplay() {
    if (this.editorConfig.canView) {
      return this.editorConfig.canView.html && this.editorConfig.canView.md;
    }
    return false;
  }

  get next() {
    const { view } = this.state;
    if (view.html && view.md) {
      return 2;
    } else if (!this.state.view.html) {
      return 1;
    }
  }

  constructor(props) {
    super(props);

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      view: this.editor.getView(),
    };
  }

  handleClick() {
    switch (this.next) {
      case 1:
        this.editor.setView({
          html: true,
          md: false,
        });
        break;
      default:
        this.editor.setView({
          html: false,
          md: true,
        });
        break;
    }
  }

  handleChange(view) {
    this.setState({ view });
  }

  componentDidMount() {
    this.editor.on('viewchange', this.handleChange);
  }

  componentWillUnmount() {
    this.editor.off('viewchange', this.handleChange);
  }

  getDisplayInfo() {
    const next = this.next;
    switch (next) {
      case 1:
        return {
          icon: 'visibility',
          title: 'Preview',
        };
      default:
        return {
          icon: 'keyboard',
          title: 'Editor',
        };
    }
  }

  render() {
    if (this.isDisplay) {
      const display = this.getDisplayInfo();
      return (
        <span
          className="button button-type-mode"
          title="ModeToggleCust"
          onClick={this.handleClick}
        >
          <Icon type={display.icon} />
        </span>
      );
    } else {
      return null;
    }
  }
}
