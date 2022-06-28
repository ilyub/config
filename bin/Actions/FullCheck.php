<?php

namespace Actions;

use Api\Npm;
use Api\Package;

class FullCheck
{
  /**
   * Full check.
   */
  public static function do(): void
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
    $npm->phpstan(true);
  }
}
