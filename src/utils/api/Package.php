<?php

use Skylib\Config\Assert;
use Skylib\Config\BaseException;
use Skylib\Config\Unknown;

class Package
{
  /**
   * @var array<string>
   */
  public $dependencies;

  /**
   * @var array<string>
   */
  public $devDependencies;

  /**
   * @var string
   */
  public $name;

  /**
   * @var array<string>
   */
  public $peerDependencies;

  /**
   * @var array<string>
   */
  public $scripts;

  /**
   * @var string
   */
  public $version;

  /**
   * Initializes class instance.
   */
  public function __construct()
  {
    $str = Assert::string(file_get_contents('package.json'));

    $config = Unknown\Assert::array(Util::decodeJson($str, 'package.json'));

    $this->name = Unknown\Assert::string($config['name']);
    $this->version = Unknown\Assert::string($config['version']);
    $this->dependencies = Unknown\Assert::strings($config['dependencies'] ?? []);
    $this->devDependencies = Unknown\Assert::strings($config['devDependencies'] ?? []);
    $this->peerDependencies = Unknown\Assert::strings($config['peerDependencies'] ?? []);
    $this->scripts = Unknown\Assert::strings($config['scripts'] ?? []);
  }

  /**
   * Checks if package.json has script.
   */
  public function hasScript(string $script): bool
  {
    return array_key_exists($script, $this->scripts);
  }

  /**
   * Asserts no file dependencies.
   */
  public function noFileDependencies(): void
  {
    foreach ([$this->dependencies, $this->devDependencies, $this->peerDependencies] as $deps)
    {
      foreach ($deps as $dep)
      {
        if (str_starts_with($dep, 'file:'))
        {
          throw new BaseException('No file dependencies');
        }
      }
    }
  }
}
