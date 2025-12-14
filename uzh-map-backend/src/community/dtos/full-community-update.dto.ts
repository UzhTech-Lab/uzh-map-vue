import { PartialType } from '@nestjs/mapped-types';
import { FullCommunityCreateDTO } from './full-community-create.dto';

export class FullCommunityUpdateDTO extends PartialType(
  FullCommunityCreateDTO,
) {}
