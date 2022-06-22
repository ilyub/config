<?php

class Action
{
  /**
   * Adds version tags.
   */
  public static function addTags(): void
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

  /**
   * Deletes version tags.
   */
  public static function deleteTags(): void
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

  /**
   * Performs full check.
   */
  public static function fullCheck(bool $interactive = false): void
  {
    $package = new Package();

    Npm::noVulnerabilities($package, $interactive);
    Npm::packageJsonLint($package, $interactive);
    Npm::configLint($package, $interactive);
    Npm::commitlint($package, $interactive);
    Npm::tsc($package, $interactive);
    Npm::vueTsc($package, $interactive);
    Npm::lint($package, $interactive);
    Npm::stylelint($package, $interactive);
    Npm::stylelintHtml($package, $interactive);
    Npm::test($package, $interactive);
  }

  /**
   * Post-commit hook.
   */
  public static function postCommit(): void
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
      }

      Git::pushTags();
      Git::rebaseMasterToDevelop();
    }
  }

  /**
   * Pre-commit hook.
   */
  public static function preCommit(): void
  {
    $package = new Package();

    Git::noMasterBranch();

    if (Git::hasTag($package->version))
    {
      // Tag already exists
    }
    else
    {
      Git::checkVersion($package);
      Git::noPartialCommit();
      Npm::noDeprecated($package);
      Npm::regenerateLockFile($package);
      Npm::build($package);
      Npm::buildEs($package);
      Npm::buildDoc($package);
      Npm::phpCsFixer($package);
      Git::stageAll();
      static::fullCheck();
      Npm::publish($package);
    }
  }
}
