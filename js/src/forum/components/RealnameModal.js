import Modal from 'flarum/common/components/Modal';
import Button from 'flarum/common/components/Button';
import Stream from 'flarum/common/utils/Stream';

export default class RealnameModal extends Modal {
  oninit(vnode) {
    super.oninit(vnode);
    this.realname = Stream(app.session.user.displayName());
  }

  className() {
    return 'RealnameModal Modal--small';
  }

  title() {
    return app.translator.trans('tue-realnames.forum.change_realname.title');
  }

  content() {
    return (
      <div className="Modal-body">
        <div className="Form Form--centered">
          <div className="Form-group">
            <input
              type="text"
              autocomplete="off"
              name="realname"
              className="FormControl"
              bidi={this.realname}
              disabled={this.loading} />
          </div>
          <div className="Form-group">
            {Button.component({
              className: 'Button Button--primary Button--block',
              type: 'submit',
              loading: this.loading,
            }, app.translator.trans('tue-realnames.forum.change_realname.submit_button'))}
          </div>
        </div>
      </div>
    );
  }

  onsubmit(e) {
    e.preventDefault();

    if (this.realname() === app.session.user.displayName()) {
      this.hide();
      return;
    }

    this.loading = true;

    app.session.user.save({ realname: this.realname() }, {
      errorHandler: this.onerror.bind(this),
    })
      .then(this.hide.bind(this))
      .catch(() => {
        this.loading = false;
        m.redraw();
      });
  }
}
