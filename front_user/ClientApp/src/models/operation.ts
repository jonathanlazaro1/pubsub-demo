import { OperationType } from "./operationType";

export interface Operation {
  id?: string;
  type?: OperationType;
  originId?: string;
  destinationId?: string | null;
  amountInCents: number;
  ownTitularity: boolean;
  timestamp?: Date;
}
