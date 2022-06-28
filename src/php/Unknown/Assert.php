<?php

namespace core\Unknown;

use core\BaseException;

class Assert
{
  /**
   * Asserts that value is an array.
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
   * Asserts that value is a string.
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
