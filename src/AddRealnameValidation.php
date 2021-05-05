<?php

namespace Tue\Realnames;

use Flarum\Settings\SettingsRepositoryInterface;
use Illuminate\Validation\Validator;

class AddRealnameValidation
{
    /**
     * @var SettingsRepositoryInterface
     */
    protected $settings;


    public function __construct(SettingsRepositoryInterface $settings)
    {
        $this->settings = $settings;
    }

    public function __invoke($flarumValidator, Validator $validator)
    {
        $idSuffix = $flarumValidator->getUser() ? ','.$flarumValidator->getUser()->id : '';
        $rules = $validator->getRules();

        $rules['realname'] = [
            function ($attribute, $value, $fail) {
                $regex = $this->settings->get('tue-realnames.regex');
                if ($regex && !preg_match_all("/$regex/", $value)) {
                    $fail(app('translator')->trans('tue-realnames.api.invalid_realname_message'));
                }
            },
            'min:' . $this->settings->get('tue-realnames.min'),
            'max:' . $this->settings->get('tue-realnames.max'),
            ($this->settings->get('tue-realnames.required') ? 'required' : 'nullable')
        ];

        if ($this->settings->get('tue-realnames.unique')) {
            $rules['realname'][] = 'unique:users,username'.$idSuffix;
            $rules['realname'][] = 'unique:users,realname'.$idSuffix;
            $rules['username'][] = 'unique:users,realname'.$idSuffix;
        }

        $validator->setRules($rules);
    }
}
