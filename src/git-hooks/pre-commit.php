<?php

include_once __DIR__.DIRECTORY_SEPARATOR.'api.php';

$config = decodeJson(file_get_contents('package.json'), 'package.json');

$name = $config['name'];
$private = $config['private'];
$version = $config['version'];
$build = is_array($config['scripts']) && array_key_exists('build', $config['scripts']);
$buildEs = is_array($config['scripts']) && array_key_exists('build-es', $config['scripts']);
$buildDoc = is_array($config['scripts']) && array_key_exists('build-doc', $config['scripts']);
$tsc = is_array($config['scripts']) && array_key_exists('tsc', $config['scripts']);
$lint = is_array($config['scripts']) && array_key_exists('lint-no-fix', $config['scripts']);
$stylelint = is_array($config['scripts']) && array_key_exists('stylelint-no-fix', $config['scripts']);
$stylelintHtml = is_array($config['scripts']) && array_key_exists('stylelint-html-no-fix', $config['scripts']);
$test = is_array($config['scripts']) && array_key_exists('test', $config['scripts']);
$dependencies = $config['dependencies'] ?? [];
$devDependencies = $config['devDependencies'] ?? [];
$peerDependencies = $config['peerDependencies'] ?? [];

foreach ([$dependencies, $devDependencies, $peerDependencies] as $deps) {
  foreach ($deps as $dep) {
    if (str_starts_with($dep, 'file:')) {
      throw new Exception('File dependencies not allowed');
    }
  }
}

$branches = execute('git branch');

if (in_array('* master', $branches)) {
  throw new Exception('Trying to commit master branch');
}

$tags = execute('git tag');

if (in_array($version, $tags)) {
  // Tag already exists
} else {
  execute('npm install --package-lock-only', 'Regenerating lock file');

  if ($build) {
    clearDir('dist');
    execute('npm run build', 'Building');
  }

  if ($buildEs) {
    clearDir('es');
    execute('npm run build-es', 'Building es version');
  }

  if ($buildDoc) {
    clearDir('docs', ['_config.yml']);
    execute('npm run build-doc', 'Building documentation');
  }

  if (file_exists('.php_cs')) {
    execute('php-cs-fixer fix --verbose', 'Linting with php-cs-fixer');
  }

  $files = execute('git ls-files --exclude-standard -m -o');
  if (count($files)) {
    throw new Exception('New version must include all changes');
  }

  if ($tsc) {
    execute('npm run tsc', 'Linting with typescript');
  }

  if ($lint) {
    execute('npm run lint-no-fix', 'Linting with ESLint');
  }

  if ($stylelint) {
    execute('npm run stylelint-no-fix', 'Linting with StyleLint');
  }

  if ($stylelintHtml) {
    execute('npm run stylelint-html-no-fix', 'Linting with StyleLint (html)');
  }

  if ($test) {
    execute('npm run test', 'Testing');

    if (file_exists('lcov-report/index.html')) {
      $coverage = file_get_contents('lcov-report/index.html');

      preg_match_all('`(\\d+)/(\\d+)`isuxDX', $coverage, $matches, PREG_SET_ORDER);

      foreach ($matches as $match) {
        if ($match[1] !== $match[2]) {
          throw new Exception('Incomplete coverage');
        }
      }
    }
  }

  $versions = execute('npm view '.$name.' versions --json', 'Retrieving npm package versions');
  $versions = decodeJson(join("\n", $versions), 'versions');
  $versions = is_array($versions) ? $versions : [$versions];

  if (in_array($version, $versions)) {
    // Already published
  } elseif ($private === false) {
    execute('npm publish --access=public', 'Publishing npm package');
  }
}
