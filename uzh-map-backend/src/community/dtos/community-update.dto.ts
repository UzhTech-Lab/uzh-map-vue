import { PartialType } from '@nestjs/mapped-types';
import { CommunityCreateDTO } from './community-create.dto';

export class CommunityUpdateDTO extends PartialType(CommunityCreateDTO) {}
