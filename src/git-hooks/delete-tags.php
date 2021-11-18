<?php

include_once __DIR__.DIRECTORY_SEPARATOR.'api.php';

$tags = execute('git tag');

$commits = execute('git --no-pager log --grep="^initial\\scommit$" --pretty=format:%H');

foreach ($commits as $commit) {
  $tags = array_diff($tags, execute('git tag --points-at '.$commit));
}

foreach ($tags as $tag) {
  execute('git tag -d '.$tag);
  executeWithKey('git push --delete origin '.$tag, 'Deleting tag '.$tag);
}
