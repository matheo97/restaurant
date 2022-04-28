import { ApiProperty } from '@nestjs/swagger';

export class AccessToken {
  @ApiProperty({
    description: 'Access token generated after login validation',
  })
  accessToken: string;

  @ApiProperty({
    description: 'Type of token generated, currently we only support Bearer',
  })
  tokenType: string;
}
