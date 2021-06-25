<?php

include_once 'src/php-cs-rules.php';

$finder = PhpCsFixer\Finder::create()->in([__DIR__.'/src']);

return PhpCsFixer\Config::create()
  ->setFinder($finder)
  ->setIndent('  ')
  ->setLineEnding("\n")
  ->setRules($phpCsRules);
