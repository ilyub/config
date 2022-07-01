<?php

namespace Actions;

use Api\Git;
use Throwable;

class DeleteTags
{
  /**
   * Deletes version tags.
   */
  public static function do(): void
  {
    $tags = Git::getTags();

    foreach (Git::getCommits('^initial\\scommit$', '%H') as $commit)
    {
      $tags = array_diff($tags, Git::getTags($commit));
    }

    foreach ($tags as $tag)
    {
      Git::deleteTag($tag);

      try
      {
        Git::pushDeleteTag($tag);
      }
      catch (Throwable)
      {
      }
    }
  }

  protected const RED = "\033[91m";
  protected const RESET = "\033[0m";
}
