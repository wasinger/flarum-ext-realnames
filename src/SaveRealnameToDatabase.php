<?php

namespace Tue\Realnames;

use Flarum\User\Event\Saving;
use Illuminate\Support\Arr;

class SaveRealnameToDatabase {
    public function handle(Saving $event)
    {
        $user = $event->user;
        $data = $event->data;
        $actor = $event->actor;

        $isSelf = $actor->id === $user->id;
        $attributes = Arr::get($data, 'attributes', []);

        if (isset($attributes['realname'])) {
            if ($isSelf) {
                $actor->assertCan('editOwnRealname', $user);
            } else if ($user->exists) {
                $actor->assertCan('edit', $user);
            }

            $realname = $attributes['realname'];

            // If the user sets their realname back to the username
            // set the realname to null so that it just falls back to the username
            if ($user->username === $realname) {
                $user->realname = null;
            } else {
                $user->realname = $realname;
            }
        }
    }
}
