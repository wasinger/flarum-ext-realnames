<?php
namespace Tue\Realnames;

use Flarum\Api\Serializer\UserSerializer;
use Flarum\Extend;
use Flarum\User\Event\Saving;
use Flarum\User\Search\UserSearcher;
use Flarum\User\UserValidator;

return [
    (new Extend\Frontend('forum'))
        ->js(__DIR__ . '/js/dist/forum.js')
        ->css(__DIR__.'/less/forum.less'),

    (new Extend\Frontend('admin'))
        ->js(__DIR__ . '/js/dist/admin.js'),

    new Extend\Locales(__DIR__ . '/locale'),

    (new Extend\User())
        ->displayNameDriver('realname', RealnameDriver::class),

    (new Extend\Event())
        ->listen(Saving::class, SaveRealnameToDatabase::class),

    (new Extend\ApiSerializer(UserSerializer::class))
        ->attribute('canEditOwnRealname', function ($serializer, $user) {
            $actor = $serializer->getActor();
            return $actor->id === $user->id && $serializer->getActor()->can('editOwnRealname', $user);
        }),

    (new Extend\Settings())
        ->serializeToForum('displayNameDriver', 'display_name_driver', null, 'username')
        ->serializeToForum('realnameRequired', 'tue-realnames.required', null, false)
        ->serializeToForum('usernameHelp', 'tue-realnames.username_help', null, '')
        ->serializeToForum('realnameHelp', 'tue-realnames.realname_help', null, ''),

    (new Extend\Validator(UserValidator::class))
        ->configure(AddRealnameValidation::class),

    (new Extend\SimpleFlarumSearch(UserSearcher::class))
        ->setFullTextGambit(RealnameFullTextGambit::class)
];
