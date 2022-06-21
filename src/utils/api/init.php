<?php

set_error_handler(function (int $errno, string $errstr): void {
  throw new BaseException('Error '.$errno.': '.$errstr);
});

spl_autoload_register(function (string $className): void {
  include_once $className.'.php';
});
