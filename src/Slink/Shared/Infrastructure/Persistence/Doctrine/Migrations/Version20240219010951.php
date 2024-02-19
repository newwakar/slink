<?php

declare(strict_types=1);

namespace Slink\Shared\Infrastructure\Persistence\Doctrine\Migrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240219010951 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE image ADD COLUMN user_id CHAR(36) DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TEMPORARY TABLE __temp__image AS SELECT uuid, file_name, description, is_public, created_at, updated_at, views, size, mime_type, width, height FROM "image"');
        $this->addSql('DROP TABLE "image"');
        $this->addSql('CREATE TABLE "image" (uuid CHAR(36) NOT NULL --(DC2Type:uuid)
        , file_name VARCHAR(255) NOT NULL, description VARCHAR(255) NOT NULL, is_public BOOLEAN NOT NULL, created_at DATETIME NOT NULL --(DC2Type:datetime_immutable)
        , updated_at DATETIME DEFAULT NULL --(DC2Type:datetime_immutable)
        , views INTEGER NOT NULL, size INTEGER NOT NULL, mime_type VARCHAR(255) NOT NULL, width INTEGER NOT NULL, height INTEGER NOT NULL, PRIMARY KEY(uuid))');
        $this->addSql('INSERT INTO "image" (uuid, file_name, description, is_public, created_at, updated_at, views, size, mime_type, width, height) SELECT uuid, file_name, description, is_public, created_at, updated_at, views, size, mime_type, width, height FROM __temp__image');
        $this->addSql('DROP TABLE __temp__image');
    }
}
