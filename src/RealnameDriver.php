<?php

namespace Tue\Realnames;

use Flarum\User\DisplayName\DriverInterface;
use Flarum\User\User;

class RealnameDriver implements DriverInterface {

    public function displayName(User $user): string
    {
        return $user->realname ?: $user->username;
    }
}
