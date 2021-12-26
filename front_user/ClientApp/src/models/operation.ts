import * as yup from "yup";

import { OperationType } from "./operationType";
import { User } from "./user";

export interface Operation {
  id?: string;
  type: OperationType;
  originId?: string;
  origin?: User | null;
  destinationId?: string | null;
  destination?: User | null;
  amountInCents: number;
  ownTitularity: boolean;
  timestamp: Date;
}

export const operationSchema = yup.object().shape({
  type: yup.number().required().positive().integer(),
  destinationId: yup.string().when("type", {
    is: (val: OperationType) => val === OperationType.TRANSFER,
    then: yup
      .string()
      .nullable()
      .required("Destination user is required when making a transfer"),
    otherwise: yup.string().nullable(),
  }),
  amountInCents: yup
    .number()
    .required()
    .positive("Amount in cents must be at least 0,01")
    .integer(),
  ownTitularity: yup.bool().required(),
});
