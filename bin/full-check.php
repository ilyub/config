<?php

include_once __DIR__.'/api/init.php';

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
