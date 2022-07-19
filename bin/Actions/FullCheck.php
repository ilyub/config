<?php

namespace Actions;

use Api\Npm;
use Api\Package;
use Api\PreCommitConfig;

class FullCheck
{
  /**
   * Full check.
   */
  public static function do(): void
  {
    $package = new Package();
    $preCommitConfig = new PreCommitConfig();
    $npm = new Npm($package);

    $npm->noVulnerabilities($preCommitConfig->audit, true);
    $npm->commitlint(true);
    $npm->configLint(true);
    $npm->packageJsonLint(true);
    $npm->tsc(true);
    $npm->vueTsc(true);
    $npm->lint(true);
    $npm->stylelint(true);
    $npm->stylelintHtml(true);
    $npm->phpCsFixer(true);
    $npm->phpstan(true);
  }
}
