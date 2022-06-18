<?php

class Action
{
  /**
   * Adds version tags.
   */
  public static function addTags(): void
  {
    $commits = Git::getCommits('^next$', '%H');

    foreach ($commits as $commit) {
      $info = Git::getCommitInfo($commit);

      if (preg_match('`^\\+\\s{2}"version":\\s"([^"]+)"`imsuxDX', $info, $matches) === 1) {
        $version = $matches[1];

        if (Git::hasTag($version)) {
          // Tag already exists
        } else {
          Git::addTag($version, $commit);
        }
      } else {
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

    foreach (Git::getCommits('^initial\\scommit$', '%H') as $commit) {
      $tags = array_diff($tags, Git::getTags($commit));
    }

    foreach ($tags as $tag) {
      Git::deleteTag($tag);
      Git::pushDeleteTag($tag);
    }
  }

  /**
   * Post-commit hook.
   */
  public static function postCommit(): void
  {
    if (Git::getLastCommit('%s') === 'next') {
      $package = new Package();

      if (Git::hasTag($package->version)) {
        // Tag already exists
      } else {
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

    $package->noFileDependencies($package);
    Git::noMasterBranch();

    if (Git::hasTag($package->version)) {
      // Tag already exists
    } else {
      Git::checkVersion($package);
      Sys::noDeprecated($package);
      Npm::regenerateLockFile();
      Npm::runBuild($package);
      Npm::runBuildEs($package);
      Npm::runBuildDoc($package);
      Sys::runPhpCsFixer();
      Git::noPartialCommit();
      Npm::noVulnerabilities();
      Npm::runNpmPkgJsonLint($package);
      Npm::runTsc($package);
      Npm::runVueTsc($package);
      Npm::runLint($package);
      Npm::runStyleLint($package);
      Npm::runStyleLintHtml($package);
      Npm::runCommitLint($package);
      Npm::runTest($package);

      if ($package->private) {
        // Do not publish
      } else {
        if (in_array($package->version, Npm::getVersions($package))) {
          // Already published
        } else {
          Npm::publish($package);
        }
      }
    }
  }
}
