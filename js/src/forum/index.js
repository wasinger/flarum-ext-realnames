import { extend } from 'flarum/common/extend';
import Button from 'flarum/common/components/Button';
import EditUserModal from 'flarum/forum/components/EditUserModal';
import SettingsPage from 'flarum/forum/components/SettingsPage';
import Model from 'flarum/common/Model';
import User from 'flarum/common/models/User';
import extractText from 'flarum/common/utils/extractText';
import Stream from 'flarum/common/utils/Stream';
import RealNameModal from './components/RealnameModal';
import SignUpModal from 'flarum/forum/components/SignUpModal';

app.initializers.add('tue-realnames', () => {
  User.prototype.canEditOwnRealname = Model.attribute('canEditOwnRealname');

  extend(SettingsPage.prototype, 'accountItems', function (items) {
    if (app.forum.attribute('displayNameDriver') !== 'realname') return;

    if (this.user.canEditOwnRealname()) {
      items.add('changeRealname',
        <Button className="Button" onclick={() => app.modal.show(RealNameModal)}>
          {app.translator.trans('tue-realnames.forum.settings.change_realname_button')}
        </Button>
      );
    }
  });

  extend(EditUserModal.prototype, 'oninit', function () {
    if (app.forum.attribute('displayNameDriver') !== 'realname') return;

    this.realname = Stream(this.attrs.user.displayName());
  });

  extend(EditUserModal.prototype, 'fields', function (items) {
    if (app.forum.attribute('displayNameDriver') !== 'realname') return;

    items.add('realname',
      <div className="Form-group">
        <label>{app.translator.trans('tue-realnames.forum.edit_user.realnames_heading')}</label>
        <input className="FormControl"
               placeholder={extractText(app.translator.trans('tue-realnames.forum.edit_user.realnames_text'))}
               bidi={this.realname} />
      </div>, 100);
  });

  extend(EditUserModal.prototype, 'data', function (data) {
    if (app.forum.attribute('displayNameDriver') !== 'realname') return;

    const user = this.attrs.user;
    if (this.realname() !== this.attrs.user.displayName()) {
      data.realname = this.realname();
    }
  });

  extend(SignUpModal.prototype, 'oninit', function() {
    this.realname = Stream(this.attrs.realname || '');
  });

  extend(SignUpModal.prototype, 'fields', function(items) {
    if (app.forum.attribute('usernameHelp')) {
      items.get('username').children.push(m('.Form-hint', [
        app.forum.attribute('usernameHelp')
      ]));
    }

    let control = m('input.FormControl', {
        name: 'realname',
        type: 'text',
        placeholder: app.translator.trans('tue-realnames.forum.signup.realname_placeholder'),
        bidi: this.realname,
        disabled: this.loading,
      });

    items.add(
      'realname',
      m('.Form-group', [control]),
      29
    );

    if (app.forum.attribute('realnameHelp')) {
      items.get('realname').children.push(m('.Form-hint', [
        app.forum.attribute('realnameHelp')
      ]));
    }

  });

  extend(SignUpModal.prototype, 'submitData', function(data) {
    data.realname = this.realname();
  });


});
