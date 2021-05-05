<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Schema\Builder;

return [
    'up' => function(Builder $schema) {
        if (!$schema->hasColumn('users', 'realname')) {
            $schema->table('users', function (Blueprint $table) use ($schema) {
                $table->string('realname', 150)->after('username')->index();
            });

            if ($schema->hasColumn('users', 'nickname')) {
                $db = $schema->getConnection();
                $db->update('update users set realname = nickname');
            }
        }
    },
    'down' => function(Builder $schema) {
        $schema->table('users', function (Blueprint $table) use ($schema) {
            $table->dropColumn('realname');
        });
    }
];
