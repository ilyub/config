<?php

class Npm
{
  /**
   * Initializes class instance.
   */
  public function __construct(Package $package)
  {
    $this->package = $package;
  }

  /**
   * Runs "build" script.
   */
  public function build(bool $interactive = false): void
  {
    static::run('build', 'Building', $interactive);
  }

  /**
   * Runs "build-doc" script.
   */
  public function buildDoc(bool $interactive = false): void
  {
    static::run('build-doc', 'Building documentation', $interactive);
  }

  /**
   * Runs "build-es" script.
   */
  public function buildEs(bool $interactive = false): void
  {
    static::run('build-es', 'Building es version', $interactive);
  }

  /**
   * Runs "commitlint" script.
   */
  public function commitlint(bool $interactive = false): void
  {
    static::run('commitlint-all', 'Linting with commitlint', $interactive);
  }

  /**
   * Runs "config-lint" script.
   */
  public function configLint(bool $interactive = false): void
  {
    static::run('config-lint', 'Linting with config-lint', $interactive);
  }

  /**
   * Retrieves npm package versions.
   */
  public function getVersions(bool $interactive = false): array
  {
    $name = $this->package->name;

    $versions = Sys::execute('npm view '.$name.' versions --json', 'Retrieving npm versions', $interactive);
    $versions = implode("\n", $versions);
    $versions = Util::decodeJson($versions, 'versions');

    return is_array($versions) ? $versions : [$versions];
  }

  /**
   * Runs "lint" script.
   */
  public function lint(bool $interactive = false): void
  {
    static::run('lint-no-fix', 'Linting with eslint', $interactive);
  }

  /**
   * No deprecated.
   */
  public function noDeprecated(): void
  {
    if (preg_match('`^\d+\.0\.0$`isuxDX', $this->package->version))
    {
      foreach (Sys::scanDirDeep('src') as $path)
      {
        if (is_file($path))
        {
          $contents = file_get_contents($path);
          if (preg_match('`\*\s+@deprecated`isuxDX', $contents))
          {
            throw new BaseException('No deprecated');
          }
        }
      }
    }
  }

  /**
   * No vulnerabilities.
   */
  public function noVulnerabilities(bool $interactive = false): void
  {
    static::run('npm:audit', 'Checking for vulnerablilties', $interactive);
  }

  /**
   * Runs "package-json-lint" script.
   */
  public function packageJsonLint(bool $interactive = false): void
  {
    static::run('package-json-lint', 'Linting with package-json-lint', $interactive);
  }

  /**
   * Runs php-cs-fixer.
   */
  public function phpCsFixer(bool $interactive = false): void
  {
    static::run('php-cs-fixer', 'Formatting with php-cs-fixer', $interactive);
  }

  /**
   * Publishes package.
   */
  public function publish(bool $interactive = false): void
  {
    static::run('npm:publish', 'Publishing npm package', $interactive);
  }

  /**
   * Regenerates lock file.
   */
  public function regenerateLockFile(bool $interactive = false): void
  {
    static::run('npm:regenerate-lock-file', 'Regenerating lock file', $interactive);
  }

  /**
   * Runs "stylelint" script.
   */
  public function stylelint(bool $interactive = false): void
  {
    static::run('stylelint-no-fix', 'Linting with stylelint', $interactive);
  }

  /**
   * Runs "stylelint-html" script.
   */
  public function stylelintHtml(bool $interactive = false): void
  {
    static::run('stylelint-html-no-fix', 'Linting with stylelint (html)', $interactive);
  }

  /**
   * Runs "test" script.
   */
  public function test(): void
  {
    if ($this->package->hasScript('test'))
    {
      Sys::execute('npm run test', 'Testing');

      if (file_exists('lcov-report/index.html'))
      {
        $coverage = file_get_contents('lcov-report/index.html');

        preg_match_all('`(\\d+)/(\\d+)`isuxDX', $coverage, $matches, PREG_SET_ORDER);

        foreach ($matches as $match)
        {
          if ($match[1] !== $match[2])
          {
            throw new BaseException('Incomplete coverage');
          }
        }
      }
    }
  }

  /**
   * Runs "tsc" script.
   */
  public function tsc(bool $interactive = false): void
  {
    static::run('tsc', 'Linting with tsc', $interactive);
  }

  /**
   * Runs "vue-tsc" script.
   */
  public function vueTsc(bool $interactive = false): void
  {
    static::run('vue-tsc', 'Linting with vue-tsc', $interactive);
  }
  protected $package;

  /**
   * Runs script.
   */
  protected function run(
    string $name,
    string $message,
    bool $interactive = false
  ): void {
    if ($this->package->hasScript($name))
    {
      Sys::execute('npm run '.$name, $message, $interactive);
    }
  }
}
