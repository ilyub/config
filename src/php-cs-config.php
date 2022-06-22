<?php

class PhpCsConfig
{
  public static $rules = [
    '@PhpCsFixer' => true,
    'braces' => [
      'position_after_anonymous_constructs' => 'next',
      'position_after_control_structures' => 'next',
      'position_after_functions_and_oop_constructs' => 'next',
    ],
    'ordered_class_elements' => [
      'order' => [
        'use_trait',
        'constant_public',
        'property_public',
        'construct',
        'destruct',
        'magic',
        'phpunit',
        'method_public',
        'constant_protected',
        'property_protected',
        'method_protected',
        'constant_private',
        'property_private',
        'method_private',
      ],
      'sort_algorithm' => 'alpha',
    ],
    'phpdoc_add_missing_param_annotation' => false,
    'yoda_style' => false,
  ];
}
