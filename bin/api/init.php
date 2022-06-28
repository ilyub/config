<?php

use Skylib\Config\BaseException;

set_error_handler(function (int $errno, string $errstr): void
{
  throw new BaseException('Error '.$errno.': '.$errstr);
});

spl_autoload_register(function (string $className): void
{
  $className = str_replace('\\', '/', $className);

  include_once str_starts_with($className, 'Skylib/Config/')
    ? dirname(dirname(__DIR__)).'/api/'.substr($className, strlen('Skylib/Config/')).'.php'
    : __DIR__.'/'.$className.'.php';
});
