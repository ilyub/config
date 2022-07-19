<?php

namespace Actions;

use Api\Git;
use Api\Npm;
use Api\Package;
use Api\PreCommitConfig;

class PreCommit
{
  /**
   * Pre-commit hook.
   */
  public static function do(): void
  {
    $package = new Package();
    $preCommitConfig = new PreCommitConfig();

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
      Git::noPartialCommit();
      $npm->noVulnerabilities($preCommitConfig->audit);
      $npm->commitlint();
      $npm->configLint();
      $npm->packageJsonLint();
      $npm->tsc();
      $npm->vueTsc();
      $npm->lint();
      $npm->stylelint();
      $npm->stylelintHtml();
      $npm->phpstan();
      $npm->test();
      Git::noPartialCommit();
      $npm->publish();
    }
  }
}
