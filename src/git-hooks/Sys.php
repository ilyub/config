<?php

class Sys
{
  /**
   * Clears directory.
   */
  public static function clearDir(string $dir, array $ignore = [], bool $exists = false): void
  {
    if ($exists || file_exists($dir)) {
      foreach (static::scanDir($dir, $ignore) as $basename) {
        $filename = $dir.'/'.$basename;
        if (is_dir($filename)) {
          static::clearDir($filename, [], true);
          rmdir($filename);
        } else {
          unlink($filename);
        }
      }
    }
  }

  /**
   * Executes command.
   */
  public static function execute(string $command, string $description = null): array
  {
    static::flushString($description);

    $result = exec($command, $output, $code);

    if ($code || $result === false) {
      throw new BaseException('Command failed: '.$command);
    }

    return $output;
  }

  /**
   * Executes command.
   */
  public static function executeWithKey(string $command, string $description = null): void
  {
    static::flushString($description);

    $keyPath = static::pathConcat(static::getKeysPath(), 'id_rsa');

    $process = proc_open(
      $command,
      [],
      $pipes,
      null,
      ['GIT_SSH_COMMAND' => 'ssh -i "'.$keyPath.'"'],
      ['bypass_shell' => true]
    );

    $code = proc_close($process);

    if ($code) {
      throw new BaseException('Command failed: '.$command);
    }
  }

  /**
   * No deprecated.
   */
  public static function noDeprecated(Package $package): void
  {
    if (preg_match('`^\d+\.0\.0$`isuxDX', $package->version)) {
      foreach (static::scanDirDeep('src') as $path) {
        if (is_file($path)) {
          $contents = file_get_contents($path);
          if (preg_match('`\*\s+@deprecated`isuxDX', $contents)) {
            throw new BaseException('No deprecated');
          }
        }
      }
    }
  }

  /**
   * Runs php-cs-fixer.
   */
  public static function runPhpCsFixer(): void
  {
    if (file_exists('.php-cs-fixer.php')) {
      static::execute('php-cs-fixer fix --verbose', 'Linting with php-cs-fixer');
    }
  }

  /**
   * Flushes string.
   */
  public static function flushString(string $str = null): void
  {
    if ($str !== null) {
      echo $str.PHP_EOL;

      if (ob_get_level() > 0) {
        ob_flush();
      }

      flush();
    }
  }

  /**
   * Searches for keys folder.
   */
  protected static function getKeysPath(): string
  {
    $dirBackup = null;
    $dir = realpath(__DIR__);

    while ($dir !== false && $dir !== $dirBackup) {
      $candidate = static::pathConcat($dir, '.ssh');

      if (is_dir($candidate)) {
        return $candidate;
      }

      $dirBackup = $dir;
      $dir = realpath(dirname($dir));
    }

    throw new BaseException('Missing keys folder');
  }

  /**
   * Concatenates paths.
   */
  protected static function pathConcat(...$parts): string
  {
    return preg_replace('`[/\\\\]+`isuxDX', '/', implode('/', $parts));
  }

  /**
   * Scans directory.
   */
  protected static function scanDir(string $dir, array $ignore = []): array
  {
    return array_diff(scandir($dir), ['.', '..', ...$ignore]);
  }

  /**
   * Scans directory.
   */
  protected static function scanDirDeep(string $dir, array $ignore = []): array
  {
    $result = [];

    foreach (static::scanDir($dir, $ignore) as $basename) {
      array_push($result, $dir.'/'.$basename);

      if (is_dir($dir.'/'.$basename)) {
        array_push($result, ...static::scanDirDeep($dir.'/'.$basename));
      }
    }

    return $result;
  }
}
