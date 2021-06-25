<?php

include_once __DIR__.DIRECTORY_SEPARATOR.'api.php';

$tags = execute('git tag');

$commits = execute('git --no-pager log --grep="^next$" --pretty=format:%H');

foreach ($commits as $commit) {
  $changes = join("\n", execute('git show '.$commit));

  if (preg_match('`^\\+\\s{2}"version":\\s"([^"]+)"`imsuxDX', $changes, $matches) === 1) {
    $version = $matches[1];

    if (in_array($version, $tags)) {
      // Tag already exists
    } else {
      execute('git tag '.$version.' '.$commit);
    }
  } else {
    throw new Exception('Unexpected commit '.$commit);
  }
}

executeWithKey('git push --tags origin', 'Pushing tags');
