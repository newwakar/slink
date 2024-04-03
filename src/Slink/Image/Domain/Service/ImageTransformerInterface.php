<?php

namespace Slink\Image\Domain\Service;

use Slink\Shared\Domain\ValueObject\ImageOptions;

interface ImageTransformerInterface {
  /**
   * @param string $content
   * @param int|null $width
   * @param int|null $height
   * @return string
   */
  public function resize(string $content, ?int $width, ?int $height): string;
  
  /**
   * @param string $content
   * @param int|null $width
   * @param int|null $height
   * @return string
   */
  public function crop(string $content, ?int $width, ?int $height): string;
  
  /**
   * @param string $content
   * @param ImageOptions $imageOptions
   * @return string
   */
  public function transform(string $content, ImageOptions $imageOptions): string;
}