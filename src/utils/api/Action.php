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
  public static function fullCheck(): void
  {
    $package = new Package();

    $npm = new Npm($package);

    $npm->noVulnerabilities(true);
    $npm->commitlint(true);
    $npm->configLint(true);
    $npm->packageJsonLint(true);
    $npm->tsc(true);
    $npm->vueTsc(true);
    $npm->lint(true);
    $npm->stylelint(true);
    $npm->stylelintHtml(true);
    $npm->phpCsFixer(true);
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
      // Git::rebaseMasterToDevelop();
    }
  }

  /**
   * Pre-commit hook.
   */
  public static function preCommit(): void
  {
    $package = new Package();

    $package->noFileDependencies();

    Git::noMasterBranch();

    if (Git::hasTag($package->version))
    {
      // Tag already exists
    }
    else
    {
      $npm = new Npm($package);

      Git::checkVersion($package->version);
      Git::noPartialCommit();
      $npm->noDeprecated();
      $npm->regenerateLockFile();
      $npm->build();
      $npm->buildEs();
      $npm->buildDoc();
      $npm->phpCsFixer();
      Git::stageAll();
      $npm->noVulnerabilities();
      $npm->commitlint();
      $npm->configLint();
      $npm->packageJsonLint();
      $npm->tsc();
      $npm->vueTsc();
      $npm->lint();
      $npm->stylelint();
      $npm->stylelintHtml();
      $npm->test();
      $npm->publish();
    }
  }
}
