<?php

namespace Api;

use Skylib\Config\Assert;
use Skylib\Config\BaseException;

class Sys
{
  /**
   * Executes command.
   *
   * @return array<string>
   */
  public static function execute(
    string $command,
    string $description = null,
    bool $interactive = false
  ): array {
    if ($interactive)
    {
      static::flushString($description.' ...');

      $result = exec($command.' >nul 2>nul', $output, $code);

      $status = $code || $result === false ? 'Failed' : 'OK';

      static::flushString("\x1B[0G\x1B[1A".$description.' - '.$status);

      return [];
    }

    static::flushString($description);

    $result = exec($command, $output, $code);

    if ($code || $result === false)
    {
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

    $process = Assert::resource(
      proc_open(
        $command,
        [],
        $pipes,
        null,
        ['GIT_SSH_COMMAND' => 'ssh -i "'.$keyPath.'"'],
        ['bypass_shell' => true]
      )
    );

    $code = proc_close($process);

    if ($code)
    {
      throw new BaseException('Command failed: '.$command);
    }
  }

  /**
   * Flushes string.
   */
  public static function flushString(string $str = null): void
  {
    if ($str !== null)
    {
      echo $str.PHP_EOL;

      if (ob_get_level() > 0)
      {
        ob_flush();
      }

      flush();
    }
  }

  /**
   * Scans directory.
   *
   * @param array<string> $ignore
   *
   * @return array<string>
   */
  public static function scanDirDeep(string $dir, array $ignore = []): array
  {
    $result = [];

    foreach (static::scanDir($dir, $ignore) as $basename)
    {
      array_push($result, $dir.'/'.$basename);

      if (is_dir($dir.'/'.$basename))
      {
        array_push($result, ...static::scanDirDeep($dir.'/'.$basename));
      }
    }

    return $result;
  }

  /**
   * Searches for keys folder.
   */
  protected static function getKeysPath(): string
  {
    $dirBackup = null;
    $dir = realpath(__DIR__);

    while ($dir !== false && $dir !== $dirBackup)
    {
      $candidate = static::pathConcat($dir, '.ssh');

      if (is_dir($candidate))
      {
        return $candidate;
      }

      $dirBackup = $dir;
      $dir = realpath(dirname($dir));
    }

    throw new BaseException('Missing keys folder');
  }

  /**
   * Concatenates paths.
   *
   * @param string $parts
   */
  protected static function pathConcat(...$parts): string
  {
    return Assert::string(preg_replace('`[/\\\\]+`isuxDX', '/', implode('/', $parts)));
  }

  /**
   * Scans directory.
   *
   * @param array<string> $ignore
   *
   * @return array<string>
   */
  protected static function scanDir(string $dir, array $ignore = []): array
  {
    return array_diff(Assert::strings(scandir($dir)), ['.', '..', ...$ignore]);
  }
}
