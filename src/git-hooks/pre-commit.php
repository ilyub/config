<?php

include_once __DIR__.DIRECTORY_SEPARATOR.'api.php';

$config = decodeJson(file_get_contents('package.json'), 'package.json');

$name = $config['name'];
$private = $config['private'];
$version = $config['version'];

$build = hasScript($config, 'build');
$buildEs = hasScript($config, 'build-es');
$buildDoc = hasScript($config, 'build-doc');
$tsc = hasScript($config, 'tsc');
$vueTsc = hasScript($config, 'vue-tsc');
$lint = hasScript($config, 'lint-no-fix');
$stylelint = hasScript($config, 'stylelint-no-fix');
$stylelintHtml = hasScript($config, 'stylelint-html-no-fix');
$test = hasScript($config, 'test');

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
  throw new Exception('Committing master branch is not allowed');
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

  if (file_exists('.php-cs-fixer.php')) {
    execute('php-cs-fixer fix --verbose', 'Linting with php-cs-fixer');
  }

  $files = execute('git ls-files --exclude-standard -m -o');
  if (count($files)) {
    throw new Exception('New version must include all changes');
  }

  if ($tsc) {
    execute('npm run tsc', 'Linting with tsc');
  }

  if ($vueTsc) {
    execute('npm run vue-tsc', 'Linting with vue-tsc');
  }

  if ($lint) {
    execute('npm run lint-no-fix', 'Linting with eslint');
  }

  if ($stylelint) {
    execute('npm run stylelint-no-fix', 'Linting with stylelint');
  }

  if ($stylelintHtml) {
    execute('npm run stylelint-html-no-fix', 'Linting with stylelint (html)');
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

  if ($private === false) {
    $versions = execute('npm view '.$name.' versions --json', 'Retrieving npm package versions');
    $versions = join("\n", $versions);
    $versions = decodeJson($versions, 'versions');
    $versions = is_array($versions) ? $versions : [$versions];

    if (in_array($version, $versions)) {
      // Already published
    } else {
      execute('npm publish --access=public', 'Publishing npm package');
    }
  }
}
