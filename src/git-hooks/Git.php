<?php

class Git
{
  /**
   * Adds tag.
   */
  public static function addTag(string $tag, string $commit = null): void
  {
    Sys::execute(
      $commit === null
        ? 'git tag '.$tag
        : 'git tag '.$tag.' '.$commit
    );
  }

  /**
   * Deletes tag.
   */
  public static function deleteTag(string $tag): void
  {
    Sys::execute('git tag -d '.$tag);
  }

  /**
   * Retrieves commit info.
   */
  public static function getCommitInfo(string $commit): string
  {
    return implode("\n", Sys::execute('git show '.$commit));
  }

  /**
   * Retrieves commits.
   */
  public static function getCommits(string $pattern, string $format): array
  {
    return Sys::execute('git --no-pager log --grep="'.$pattern.'" --pretty=format:'.$format);
  }

  /**
   * Retrieves last commit.
   */
  public static function getLastCommit(string $format): string
  {
    return Sys::execute('git --no-pager log -n1 --pretty=format:'.$format)[0];
  }

  /**
   * Retrieves tags.
   */
  public static function getTags(string $commit = null): array
  {
    return Sys::execute(
      $commit === null
        ? 'git tag'
        : 'git tag --points-at '.$commit
    );
  }

  /**
   * Checks if tag exists.
   */
  public static function hasTag($tag): bool
  {
    return in_array($tag, static::getTags());
  }

  /**
   * Asserts no master branch.
   */
  public static function noMasterBranch(): void
  {
    if (in_array('* master', Sys::execute('git branch'))) {
      throw new BaseException('No master branch');
    }
  }

  /**
   * Asserts no partial commit.
   */
  public static function noPartialCommit(): void
  {
    if (Sys::execute('git ls-files --exclude-standard -m -o')) {
      throw new BaseException('No partial commit');
    }
  }

  /**
   * Deletes tag from remote origin.
   */
  public static function pushDeleteTag(string $tag): void
  {
    Sys::executeWithKey('git push --delete origin '.$tag, 'Deleting tag '.$tag);
  }

  /**
   * Pushes tags to remote origin.
   */
  public static function pushTags(): void
  {
    Sys::executeWithKey('git push --tags origin', 'Pushing tags');
  }

  /**
   * Rebases master to develop.
   */
  public static function rebaseMasterToDevelop(): void
  {
    Sys::execute('git checkout master');
    Sys::execute('git rebase develop');
    Sys::executeWithKey('git push', 'Pushing master');
    Sys::execute('git checkout develop');
  }
}
