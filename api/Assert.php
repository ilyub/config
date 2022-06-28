<?php

namespace Skylib\Config;

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
    if (is_array($value))
    {
      return $value;
    }

    throw new BaseException('Expecting array');
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
    if (is_resource($value))
    {
      return $value;
    }

    throw new BaseException('Expecting string');
  }

  /**
   * Asserts that value is a string.
   *
   * @param null|false|string $value
   */
  public static function string(mixed $value): string
  {
    if (is_string($value))
    {
      return $value;
    }

    throw new BaseException('Expecting string');
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
    if (is_array($value))
    {
      return $value;
    }

    throw new BaseException('Expecting array');
  }
}
