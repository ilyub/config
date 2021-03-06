<?php

namespace Actions;

use Api\Git;
use Skylib\Config\BaseException;

class AddTags
{
  /**
   * Adds version tags.
   */
  public static function do(): void
  {
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
  }
}
