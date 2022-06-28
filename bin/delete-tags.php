<?php

include_once __DIR__.'/api/init.php';

$tags = Git::getTags();

foreach (Git::getCommits('^initial\\scommit$', '%H') as $commit)
{
  $tags = array_diff($tags, Git::getTags($commit));
}

foreach ($tags as $tag)
{
  Git::deleteTag($tag);
  Git::pushDeleteTag($tag);
}
