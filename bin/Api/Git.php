<?php

namespace Api;

use Skylib\Config\Assert;
use Skylib\Config\BaseException;

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
      list('level' => $level, 'commit' => $commit) = static::findPreviousVersionCommit();

      $next = [(int) $matches[1], (int) $matches[2], (int) $matches[3]];

      foreach (static::getTags($commit) as $tag)
      {
        if (preg_match('`^(\\d+)\\.(\\d+)\\.(\\d+)$`', $tag, $matches))
        {
          $prev = [(int) $matches[1], (int) $matches[2], (int) $matches[3]];

          static::checkNextVersion($next, $prev, $level);
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
    static::executeWithKey('git push --delete origin '.$tag, 'Deleting tag '.$tag);
  }

  /**
   * Pushes tags to remote origin.
   */
  public static function pushTags(): void
  {
    static::executeWithKey('git push --tags origin', 'Pushing tags');
  }

  /**
   * Rebases master to develop.
   */
  public static function rebaseMasterToDevelop(): void
  {
    Sys::execute('git checkout master');
    Sys::execute('git rebase develop');
    static::executeWithKey('git push', 'Pushing master');
    Sys::execute('git checkout develop');
  }

  /**
   * Checks version.
   *
   * @param array<int> $next
   * @param array<int> $prev
   * @param 0|1|2      $level
   */
  protected static function checkNextVersion(array $next, array $prev, int $level): void
  {
    list($got1, $got2, $got3) = $next;

    list($expected1, $expected2, $expected3) = $prev;

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

          break;

        default:
          throw new BaseException('Invalid level: '.$level);
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

    if ($got1 === $expected1 && $got2 === $expected2 && $got3 === $expected3)
    {
      // Valid
    }
    else
    {
      throw new BaseException('Expecting version to be '.$expected1.'.'.$expected2.'.'.$expected3);
    }
  }

  /**
   * Executes command.
   */
  protected static function executeWithKey(string $command, string $description = null): void
  {
    Sys::flushString($description);

    $keyPath = Sys::pathConcat(static::getKeysPath(), 'id_rsa');

    $process = Assert::resource(
      proc_open(
        $command,
        [],
        $pipes,
        null,
        ['GIT_SSH_COMMAND' => 'ssh -i "'.$keyPath.'"'],
        ['bypass_shell' => true]
      )
    );

    $code = proc_close($process);

    if ($code)
    {
      throw new BaseException('Command failed: '.$command);
    }
  }

  /**
   * Checks version.
   *
   * @return array{commit:string,level:0|1|2}
   */
  protected static function findPreviousVersionCommit(): array
  {
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
        return ['level' => $level, 'commit' => $commit[0]];
      }
    }

    throw new BaseException('Could not find previous version commit');
  }

  /**
   * Searches for keys folder.
   */
  protected static function getKeysPath(): string
  {
    $dirBackup = null;
    $dir = realpath(__DIR__);

    while ($dir !== false && $dir !== $dirBackup)
    {
      $candidate = Sys::pathConcat($dir, '.ssh');

      if (is_dir($candidate))
      {
        return $candidate;
      }

      $dirBackup = $dir;
      $dir = realpath(dirname($dir));
    }

    throw new BaseException('Missing keys folder');
  }
}
