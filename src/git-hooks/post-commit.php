<?php

include_once __DIR__.DIRECTORY_SEPARATOR.'api.php';

$commits = execute('git --no-pager log --pretty=format:%s -n1');

if ($commits[0] === 'next') {
  $config = decodeJson(file_get_contents('package.json'), 'package.json');

  $version = $config['version'];

  $tags = execute('git tag');

  if (in_array($version, $tags)) {
    // Tag already exists
  } else {
    execute('git tag '.$version);
  }

  executeWithKey('git push --tags origin', 'Pushing tags');

  execute('git checkout master');
  execute('git rebase develop');
  executeWithKey('git push', 'Pushing master');
  execute('git checkout develop');
}
