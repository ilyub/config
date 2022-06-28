<?php

include_once __DIR__.'/api/init.php';

if (Git::getLastCommit('%s') === 'next')
{
  $package = new Package();

  if (Git::hasTag($package->version))
  {
    // Tag already exists
  }
  else
  {
    Git::addTag($package->version);
    Git::pushTags();
  }

  Git::rebaseMasterToDevelop();
}
