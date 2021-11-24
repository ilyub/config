<?php

set_error_handler('errorHandler');

/**
 * Clears directory.
 */
function clearDir(string $dir, array $ignore = [], $exists = false): void {
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
function decodeJson(string $json, string $source) {
  $result = json_decode($json, true);

  if ($result === null) {
    throw new Exception('Failed to decode: '.$source);
  }

  return $result;
}

/**
 * Echos and flushes string.
 */
function echoFlush(string $str): void {
  echo $str.PHP_EOL;

  if (ob_get_level() > 0) {
    ob_flush();
  }

  flush();
}

/**
 * Handles error.
 */
function errorHandler(int $errno, string $errstr): void {
  throw new Exception('Error '.$errno.': '.$errstr);
}

/**
 * Executes command.
 */
function execute(string $command, string $description = null): array {
  if ($description !== null) {
    echoFlush($description);
  }

  $result = exec($command, $output, $code);

  if ($result === false || $code !== 0) {
    throw new Exception('Command failed: '.$command);
  }

  return $output;
}

/**
 * Executes command.
 */
function executeWithKey(string $command, string $description = null): void {
  if ($description !== null) {
    echoFlush($description);
  }

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

  if ($code !== 0) {
    throw new Exception('Command failed: '.$command);
  }
}

/**
 * Scans directory.
 */
function getDir(string $dir, array $ignore = []): array {
  return array_diff(scandir($dir), ['.', '..', ...$ignore]);
}

/**
 * Searches for keys folder.
 */
function getKeysPath(): string {
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
 * Splits string into lines.
 */
function lines(string $str): array {
  return preg_split('`\\r\\n|\\n`isuxDX', $str);
}

/**
 * Concatenates paths.
 */
function pathConcat(...$parts): string {
  return preg_replace(
    '`[/\\\\]+`isuxDX',
    DIRECTORY_SEPARATOR,
    join(DIRECTORY_SEPARATOR, $parts)
  );
}
