<?php

use core\BaseException;

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
   * Checks version.
   */
  public static function checkVersion(string $version): void
  {
    if (preg_match('`^(\\d+)\\.(\\d+)\\.(\\d+)$`', $version, $matches))
    {
      $got1 = (int) $matches[1];
      $got2 = (int) $matches[2];
      $got3 = (int) $matches[3];

      $level = 0;

      foreach (static::getCommits('.*', '%H:%s') as $commit)
      {
        $commit = explode(':', $commit, 2);

        if (preg_match('`^build\\(deps-major-update\\)|^feat|^revert`isuxDX', $commit[1]))
        {
          $level = max($level, 1);
        }

        if (preg_match('`^\\w+!:|^\\w+\\([^()]+\\)!:`isuxDX', $commit[1]))
        {
          $level = max($level, 2);
        }

        if ($commit[1] === 'next' || $commit[1] === 'initial commit')
        {
          foreach (static::getTags($commit[0]) as $tag)
          {
            if (preg_match('`^(\\d+)\\.(\\d+)\\.(\\d+)$`', $tag, $matches))
            {
              $expected1 = (int) $matches[1];
              $expected2 = (int) $matches[2];
              $expected3 = (int) $matches[3];

              if ($got1 !== 0 && $expected1 !== 0)
              {
                switch ($level) {
                  case 0:
                    ++$expected3;

                    break;

                  case 1:
                    ++$expected2;
                    $expected3 = 0;

                    break;

                  case 2:
                    ++$expected1;
                    $expected2 = 0;
                    $expected3 = 0;
                }
              }
              elseif ($got1 === 0 && $expected1 === 0)
              {
                ++$expected3;
              }
              else
              {
                $expected1 = $got1;
                $expected2 = $got2;
                $expected3 = $got3;
              }

              if ($expected1 === $got1 && $expected2 === $got2 && $expected3 === $got3)
              {
                // Valid
              }
              else
              {
                throw new BaseException('Expecting version to be '.$expected1.'.'.$expected2.'.'.$expected3);
              }
            }
          }

          break;
        }
      }
    }
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
   *
   * @return array<string>
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
   *
   * @return array<string>
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
  public static function hasTag(string $tag): bool
  {
    return in_array($tag, static::getTags());
  }

  /**
   * No master branch.
   */
  public static function noMasterBranch(): void
  {
    if (in_array('* master', Sys::execute('git branch')))
    {
      throw new BaseException('No master branch');
    }
  }

  /**
   * No partial commit.
   */
  public static function noPartialCommit(): void
  {
    if (Sys::execute('git ls-files --exclude-standard -mo'))
    {
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
