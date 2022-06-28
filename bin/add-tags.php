<?php

use Skylib\Config\BaseException;

include_once __DIR__.'/api/init.php';

$commits = Git::getCommits('^next$', '%H');

foreach ($commits as $commit)
{
  $info = Git::getCommitInfo($commit);

  if (preg_match('`^\\+\\s{2}"version":\\s"([^"]+)"`imsuxDX', $info, $matches) === 1)
  {
    $version = $matches[1];

    if (Git::hasTag($version))
    {
      // Tag already exists
    }
    else
    {
      Git::addTag($version, $commit);
    }
  }
  else
  {
    throw new BaseException('Unexpected commit '.$commit);
  }
}

Git::pushTags();
