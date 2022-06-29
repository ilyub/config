<?php

namespace Skylib\Config;

use Skylib\Config\Unknown\Assert as Base;

class Assert
{
  /**
   * Asserts that value is an array.
   *
   * @param null|false|mixed[] $value
   *
   * @return mixed[]
   */
  public static function array(mixed $value): array
  {
    return Base::array($value);
  }

  /**
   * Asserts that value is a resource.
   *
   * @param null|false|resource $value
   *
   * @return resource
   */
  public static function resource(mixed $value): mixed
  {
    return Base::resource($value);
  }

  /**
   * Asserts that value is a string.
   *
   * @param null|false|string $value
   */
  public static function string(mixed $value): string
  {
    return Base::string($value);
  }

  /**
   * Asserts that value is an array of strings.
   *
   * @param null|false|string[] $value
   *
   * @return string[]
   */
  public static function strings(mixed $value): array
  {
    return Base::strings($value);
  }
}
