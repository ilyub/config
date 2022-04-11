<?php

/**
 * Clears directory.
 */
function clearDir(string $dir, array $ignore = [], bool $exists = false): void
{
  if ($exists || file_exists($dir)) {
    foreach (getDir($dir, $ignore) as $basename) {
      $filename = $dir.DIRECTORY_SEPARATOR.$basename;
      if (is_dir($filename)) {
        clearDir($filename, [], true);
        rmdir($filename);
      } else {
        unlink($dir.DIRECTORY_SEPARATOR.$basename);
      }
    }
  }
}

/**
 * Decodes JSON.
 */
function decodeJson(string $json, string $source): mixed
{
  $result = json_decode($json, true);

  if ($result === null) {
    throw new Exception('Failed to decode: '.$source);
  }

  return $result;
}

/**
 * Handles error.
 */
function errorHandler(int $errno, string $errstr): void
{
  throw new Exception('Error '.$errno.': '.$errstr);
}

/**
 * Executes command.
 */
function execute(string $command, string $description = null): array
{
  flushString($description);

  $result = exec($command, $output, $code);

  if ($code || $result === false) {
    throw new Exception('Command failed: '.$command);
  }

  return $output;
}

/**
 * Executes command.
 */
function executeWithKey(string $command, string $description = null): void
{
  flushString($description);

  $keyPath = pathConcat(getKeysPath(), 'id_rsa');

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
    throw new Exception('Command failed: '.$command);
  }
}

/**
 * Flushes string.
 */
function flushString(string $str = null): void
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
 * Scans directory.
 */
function getDir(string $dir, array $ignore = []): array
{
  return array_diff(scandir($dir), ['.', '..', ...$ignore]);
}

/**
 * Searches for keys folder.
 */
function getKeysPath(): string
{
  $dirBackup = null;
  $dir = realpath(__DIR__);

  while ($dir !== false && $dir !== $dirBackup) {
    $candidate = pathConcat($dir, '.ssh');

    if (is_dir($candidate)) {
      return $candidate;
    }

    $dirBackup = $dir;
    $dir = realpath(dirname($dir));
  }

  throw new Exception('Missing keys folder');
}

/**
 * Checks that package.json has script.
 */
function hasScript(array $config, string $script): bool
{
  return is_array($config['scripts']) && array_key_exists($script, $config['scripts']);
}

/**
 * Concatenates paths.
 */
function pathConcat(...$parts): string
{
  return preg_replace(
    '`[/\\\\]+`isuxDX',
    DIRECTORY_SEPARATOR,
    implode(DIRECTORY_SEPARATOR, $parts)
  );
}
