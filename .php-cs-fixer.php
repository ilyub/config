<?php

include_once __DIR__.'/src/PhpCsConfig.php';

$finder = PhpCsFixer\Finder::create()->in([
  __DIR__.'/api',
  __DIR__.'/bin',
  __DIR__.'/src',
]);

$config = new PhpCsFixer\Config();

return $config
  ->setFinder($finder)
  ->setIndent('  ')
  ->setLineEnding("\n")
  ->setRules(Skylib\Config\PhpCsConfig::$rules)
;
