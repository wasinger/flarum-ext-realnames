<?php

use Flarum\Database\Migration;
use Flarum\Group\Group;

return Migration::addPermissions([
    'user.editOwnRealname' => Group::MEMBER_ID
]);
