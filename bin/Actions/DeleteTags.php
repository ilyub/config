<?php

namespace Actions;

use Api\Git;

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
      Git::pushDeleteTag($tag);
    }
  }
}
