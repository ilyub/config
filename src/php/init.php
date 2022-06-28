<?php

use core\BaseException;

function init(string $dir): void
{
  set_error_handler(function (int $errno, string $errstr): void
  {
    throw new BaseException('Error '.$errno.': '.$errstr);
  });

  spl_autoload_register(function (string $className) use ($dir): void
  {
    $className = str_replace('\\', '/', $className);

    include_once str_starts_with($className, 'core/')
      ? __DIR__.'/'.substr($className, 5).'.php'
      : $dir.'/'.$className.'.php';
  });
}
