import Alert from 'flarum/common/components/Alert';
import Link from 'flarum/common/components/Link';

app.initializers.add('tue-realnames', () => {
  app.extensionData
    .for('tue-realnames')
    .registerSetting(function () {
      if (app.data.settings.display_name_driver === 'realname') return;

      return (
        <div className="Form-group">
          <Alert dismissible={false}>
            {app.translator.trans('tue-realnames.admin.wrong_driver', {a: <Link href={app.route('basics')}></Link>})}
          </Alert>
        </div>
      );
    })
    .registerSetting({
      setting: 'tue-realnames.unique',
      type: 'boolean',
      label: app.translator.trans('tue-realnames.admin.settings.unique_label')
    })
    .registerSetting({
      setting: 'tue-realnames.required',
      type: 'boolean',
      label: app.translator.trans('tue-realnames.admin.settings.required_label')
    })
    .registerSetting({
      setting: 'tue-realnames.regex',
      type: 'text',
      label: app.translator.trans('tue-realnames.admin.settings.regex_label')
    })
    .registerSetting({
      setting: 'tue-realnames.min',
      type: 'number',
      label: app.translator.trans('tue-realnames.admin.settings.min_label')
    })
    .registerSetting({
      setting: 'tue-realnames.max',
      type: 'number',
      label: app.translator.trans('tue-realnames.admin.settings.max_label')
    })
    .registerSetting({
      setting: 'tue-realnames.realname_help',
      type: 'text',
      label: app.translator.trans('tue-realnames.admin.settings.realname_help_label')
    })
    .registerSetting({
      setting: 'tue-realnames.username_help',
      type: 'text',
      label: app.translator.trans('tue-realnames.admin.settings.username_help_label')
    })
    .registerPermission({
      icon: 'fas fa-user-tag',
      label: app.translator.trans('tue-realnames.admin.permissions.edit_own_realname_label'),
      permission: 'user.editOwnRealname'
    }, 'start')
});
