<?php

class Package
{
  public $config;
  public $name;
  public $version;

  /**
   * Initializes class instance.
   */
  public function __construct()
  {
    $this->config = Util::decodeJson(file_get_contents('package.json'), 'package.json');
    $this->name = (string) $this->config['name'];
    $this->version = (string) $this->config['version'];
  }

  /**
   * Checks if package.json has script.
   */
  public function hasScript(string $script): bool
  {
    $scripts = $this->config['scripts'];

    return is_array($scripts) && array_key_exists($script, $scripts);
  }
}
