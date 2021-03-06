import { BeforeInsert, BeforeUpdate } from 'typeorm';
import { validateOrReject } from 'class-validator';
import { sanitizeAsync } from 'class-sanitizer';

/**
 * Base entity for the database layer.
 * 
 * All entities should extend this class to automatically
 * perform validations on insertions and updates.
 */
export class BaseEntity {
  @BeforeInsert()
  async validate() {
    await sanitizeAsync(this);

    return validateOrReject(this);
  }

  @BeforeUpdate()
  async validateUpdate() {
    await sanitizeAsync(this);

    return validateOrReject(this, { skipMissingProperties: true });
  }
}
