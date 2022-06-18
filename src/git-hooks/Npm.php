<?php

class Npm
{
  /**
   * Retrieves npm package versions.
   */
  public static function getVersions(Package $package): array
  {
    $name = $package->name;

    $versions = Sys::execute('npm view '.$name.' versions --json', 'Retrieving npm versions');
    $versions = implode("\n", $versions);
    $versions = Util::decodeJson($versions, 'versions');

    return is_array($versions) ? $versions : [$versions];
  }

  /**
   * Asserts no vulnerabilities.
   */
  public static function noVulnerabilities(): void
  {
    if (Npm::audit()['vulnerabilities']) {
      throw new BaseException('No vulnerabilities');
    }
  }

  /**
   * Publishes npm package.
   */
  public static function publish(Package $package): void
  {
    $access = $package->private ? 'restricted' : 'public';

    Sys::execute('npm publish --access='.$access, 'Publishing npm package');
  }

  /**
   * Regenerates lock file.
   */
  public static function regenerateLockFile(): void
  {
    Sys::execute('npm install --package-lock-only', 'Regenerating lock file');
  }

  /**
   * Runs "build" script.
   */
  public static function runBuild(Package $package): void
  {
    if ($package->hasScript('build')) {
      Sys::clearDir('dist');
      Sys::execute('npm run build', 'Building');
    }
  }

  /**
   * Runs "build-doc" script.
   */
  public static function runBuildDoc(Package $package): void
  {
    if ($package->hasScript('build-doc')) {
      Sys::clearDir('docs', ['_config.yml']);
      Sys::execute('npm run build-doc', 'Building documentation');
    }
  }

  /**
   * Runs "build-es" script.
   */
  public static function runBuildEs(Package $package): void
  {
    if ($package->hasScript('build-es')) {
      Sys::clearDir('es');
      Sys::execute('npm run build-es', 'Building es version');
    }
  }

  /**
   * Runs "commitlint" script.
   */
  public static function runCommitLint(Package $package): void
  {
    if ($package->hasScript('commitlint-all')) {
      Sys::execute('npm run commitlint-all', 'Linting with commitlint');
    }
  }

  /**
   * Runs "lint" script.
   */
  public static function runLint(Package $package): void
  {
    if ($package->hasScript('lint-no-fix')) {
      Sys::execute('npm run lint-no-fix', 'Linting with eslint');
    }
  }

  /**
   * Runs "package-json-lint" script.
   */
  public static function runNpmPkgJsonLint(Package $package): void
  {
    if ($package->hasScript('package-json-lint')) {
      Sys::execute('npm run package-json-lint', 'Linting with package-json-lint');
    }
  }

  /**
   * Runs "stylelint" script.
   */
  public static function runStyleLint(Package $package): void
  {
    if ($package->hasScript('stylelint-no-fix')) {
      Sys::execute('npm run stylelint-no-fix', 'Linting with stylelint');
    }
  }

  /**
   * Runs "stylelint-html" script.
   */
  public static function runStyleLintHtml(Package $package): void
  {
    if ($package->hasScript('stylelint-html-no-fix')) {
      Sys::execute('npm run stylelint-html-no-fix', 'Linting with stylelint (html)');
    }
  }

  /**
   * Runs "test" script.
   */
  public static function runTest(Package $package): void
  {
    if ($package->hasScript('test')) {
      Sys::execute('npm run test', 'Testing');

      if (file_exists('lcov-report/index.html')) {
        $coverage = file_get_contents('lcov-report/index.html');

        preg_match_all('`(\\d+)/(\\d+)`isuxDX', $coverage, $matches, PREG_SET_ORDER);

        foreach ($matches as $match) {
          if ($match[1] !== $match[2]) {
            throw new BaseException('Incomplete coverage');
          }
        }
      }
    }
  }

  /**
   * Runs "tsc" script.
   */
  public static function runTsc(Package $package): void
  {
    if ($package->hasScript('tsc')) {
      Sys::execute('npm run tsc', 'Linting with tsc');
    }
  }

  /**
   * Runs "vue-tsc" script.
   */
  public static function runVueTsc(Package $package): void
  {
    if ($package->hasScript('vue-tsc')) {
      Sys::execute('npm run vue-tsc', 'Linting with vue-tsc');
    }
  }

  /**
   * Retrieves npm package versions.
   */
  protected static function audit(): array
  {
    return Util::decodeJson(implode("\n", Sys::execute('npm audit --json')), 'audit');
  }
}
