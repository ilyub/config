<?php

include_once __DIR__.'/src/PhpCsConfig.php';

$finder = PhpCsFixer\Finder::create()->in([__DIR__.'/src']);

$config = new PhpCsFixer\Config();

return $config
  ->setFinder($finder)
  ->setIndent('  ')
  ->setLineEnding("\n")
  ->setRules(Skylib\Config\PhpCsConfig::$rules)
;
