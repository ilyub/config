<?php

include_once __DIR__.'/api/init.php';

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
  Git::noPartialCommit();
  $npm->noVulnerabilities();
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
