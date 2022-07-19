<?php

namespace Api;

use Skylib\Config\Assert;
use Skylib\Config\Unknown;

class PreCommitConfig
{
  /**
   * @var string
   */
  public $audit;

  /**
   * Initializes class instance.
   */
  public function __construct()
  {
    if (file_exists('.pre-commit.json'))
    {
      $str = Assert::string(file_get_contents('.pre-commit.json'));

      $config = Unknown\Assert::array(Util::decodeJson($str, '.pre-commit.json'));
    }
    else
    {
      $config = [];
    }

    $this->audit = Unknown\Assert::string($config['audit'] ?? 'npm audit');
  }
}
