<?php

declare(strict_types=1);

namespace UI\Http\Rest\Controller\Settings;

use Slink\Settings\Application\Query\RetrieveSettings\RetrieveSettingsQuery;
use Slink\Shared\Application\Query\QueryTrait;
use Slink\User\Domain\Enum\UserRole;
use Symfony\Component\HttpKernel\Attribute\AsController;
use Symfony\Component\HttpKernel\Attribute\MapQueryString;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Security\Http\Attribute\IsGranted;
use UI\Http\Rest\Response\ApiResponse;

#[AsController]
#[Route('/settings', methods: ['GET'])]
#[IsGranted(UserRole::Admin->value)]
final readonly class RetrieveSettingsController {
  use QueryTrait;
  
  public function __invoke(
    #[MapQueryString] RetrieveSettingsQuery $query
  ): ApiResponse {
    $response = $this->ask($query);
    
    return ApiResponse::fromPayload($response);
  }
}