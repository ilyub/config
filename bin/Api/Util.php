<?php

namespace Api;

use Skylib\Config\BaseException;

class Util
{
  /**
   * Decodes JSON.
   */
  public static function decodeJson(string $json, string $sourceName): mixed
  {
    $result = json_decode($json, true);

    if ($result === null)
    {
      throw new BaseException('Failed to decode: '.$sourceName);
    }

    return $result;
  }
}
