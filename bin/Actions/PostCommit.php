<?php

namespace Actions;

use Api\Git;
use Api\Package;

class PostCommit
{
  /**
   * Post-commit hook.
   */
  public static function do(): void
  {
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
  }
}
